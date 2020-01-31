import {Hybrids} from 'hybrids'
import gl from './gl-context.base'
import GlAssetFactory from './gl-asset.factory'
import {proxy} from 'src/util/Proxy'
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
    castShadow: proxy(selectFn, 'castShadow', false),
    id: proxy(selectFn, 'id', 0),
    name: proxy(selectFn, 'name', ''),
    position: proxy(selectFn, 'position', '', Transformers.string.vector3),
    rotation: proxy(selectFn, 'rotation', '', Transformers.string.euler),
    scale: proxy(selectFn, 'scale', '', Transformers.string.vector3),
    invisible: proxy(selectFn, 'visible', false, Transformers.bool.invert),
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