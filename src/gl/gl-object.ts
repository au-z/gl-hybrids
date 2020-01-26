import { Hybrids, property } from 'hybrids'
import * as THREE from 'three'
import gl from './gl-context.base'
import GlAssetFactory from './GlAsset.factory'
import {proxy, Translate} from 'src/util/Proxy'

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

interface PropertySelectorFn {
  (host: GlObject3D): THREE.Object3D
}

function GlObject3DMixin(getProperty: PropertySelectorFn): Hybrids<GlObject3D> {
  return {
    castShadow: proxy((host) => getProperty(host), 'castShadow'),
    id: proxy((host) => getProperty(host), 'id'),
    name: proxy((host) => getProperty(host), 'name'),
    position: proxy((host) => getProperty(host), 'position', ...Translate.vec3),
    rotation: proxy((host) => getProperty(host), 'rotation', ...Translate.euler),
    scale: proxy((host) => getProperty(host), 'scale', ...Translate.vec3),
    visible: proxy((host) => getProperty(host), 'visible'),
    bbox: property(false),
    boxHelper: {
      ...GlAssetFactory({
        get: (host, value) => {
          const object = getProperty(host as any)
          if(host.bbox) return new THREE.BoxHelper(object, new THREE.Color(0xffffff))
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
    obj: GlAssetFactory({get: () => new THREE.Object3D()}),
    ...GlObject3DMixin(({obj}) => obj),
  } as Hybrids<GlObject3D>
})()

export {
  GlObject3D,
  GlObject3DMixin,
}