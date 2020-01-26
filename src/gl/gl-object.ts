import { Hybrids, property } from 'hybrids'
import gl from './gl-context.base'
import GlAssetFactory from './GlAsset.factory'
import {proxy, Translate} from 'src/util/Proxy'
import { Object3D, BoxHelper, Color } from 'three'

interface GlObject3D extends HTMLElement {
  castShadow: boolean
  id: string
  name: string
  position: [number, number, number]
  rotation: [number, number, number, string]
  scale: [number, number, number]
  visible: boolean
  [key: string]: any
}

interface PropertySelectorFn<T> {
  (host: GlObject3D): T
}

function GlObject3DMixin(getProperty: PropertySelectorFn<Object3D>): Hybrids<GlObject3D> {
  return {
    castShadow: proxy(getProperty, 'castShadow'),
    id: proxy(getProperty, 'id'),
    name: proxy(getProperty, 'name'),
    position: proxy(getProperty, 'position', ...Translate.vec3),
    rotation: proxy(getProperty, 'rotation', ...Translate.euler),
    scale: proxy(getProperty, 'scale', ...Translate.vec3),
    visible: proxy(getProperty, 'visible'),
    bbox: property(false),
    boxHelper: {
      ...GlAssetFactory({
        get: (host, value) => {
          const object = getProperty(host as any)
          if(host.bbox) return new BoxHelper(object, new Color(0xffffff))
        }
      }),
      observe: (host, value) => {
        value?.isObject3D && getProperty(host)?.attach(value)
      },
    }
  }
}

export default (function() {
  return {
    ...gl,
    obj: GlAssetFactory({get: () => new Object3D()}),
    ...GlObject3DMixin(({obj}) => obj),
  } as Hybrids<GlObject3D>
})()

export {
  GlObject3D,
  GlObject3DMixin,
}