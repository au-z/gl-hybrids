import { Descriptor } from 'hybrids'
import { GlContext } from './gl-context.base'

export default function GlAssetFactory<H extends GlContext>({get, set, connect, observe}: Descriptor<H>): Descriptor<H> {
  return {
    get,
    set,
    connect: (host, value, invalidate) => {
      connect && connect(host, value, invalidate)
      return (host, value) => host.gl.scene.remove(value)
    },
    observe: (host, value, last) => {
      observe && observe(host, value, last)
      /* Run all async assets to completion then adds the asset to the scene */
      if(value.then && typeof value.then === 'function') {
        value.then((resolved) => {
          resolved?.isObject3D && host.gl.scene.add(resolved)
        })
      /* Adds the sync asset to the scene */
      } else {
        value?.isObject3D && host.gl.scene.add(value)
      }
    },
  }
}
