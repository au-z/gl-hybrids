import {Hybrids} from 'hybrids'
import gl from './gl-context.base'
import GlAssetFactory from './gl-asset.factory'
import {proxy, jsonProperty} from 'src/util/Proxy'
import {Transformers} from 'src/util/Transformers'
import { Object3D, BoxHelper, Color} from 'three'

interface GlObject3D extends HTMLElement {
  castShadow: boolean
  id: string
  name: string
  position: [number, number, number]
  rotation: [number, number, number, string]
  scale: [number, number, number]
  invisible: boolean
  [key: string]: any
}

interface PropertySelectorFn<T> {
  (host: GlObject3D): T
}

function GlObject3DMixin(selectFn: PropertySelectorFn<Object3D>): Hybrids<GlObject3D> {
  return {
    castShadow: proxy(selectFn, 'castShadow'),
    id: proxy(selectFn, 'id'),
    name: proxy(selectFn, 'name'),
    position: proxy(selectFn, 'position', jsonProperty, Transformers.array.vector3),
    rotation: proxy(selectFn, 'rotation', jsonProperty, Transformers.array.euler),
    scale: proxy(selectFn, 'scale', jsonProperty, Transformers.array.vector3),
    invisible: proxy(selectFn, 'visible', Transformers.bool.invert),
    bbox: false,
    boxHelper: {
      ...GlAssetFactory({
        get: (host, value) => {
          const object = selectFn(host as any)
          if(host.bbox) return new BoxHelper(object, new Color(0xffffff))
        }
      }),
      observe: (host, value) => {
        value?.isObject3D && selectFn(host)?.attach(value)
      },
    }
  }
}

export default (function() {
  return {
    ...gl,
    ...GlObject3DMixin(({obj}) => obj),
    obj: GlAssetFactory({get: (host, value) => value ?? new Object3D()}),
  } as Hybrids<GlObject3D>
})()

export {
  GlObject3D,
  GlObject3DMixin,
}