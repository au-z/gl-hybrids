import {Mesh, BoxGeometry, MeshBasicMaterial, PointLight} from 'three'
import {Hybrids, children} from 'hybrids'
import {GlObject3D} from 'src/gl/gl-object'

import GlGeometry from 'src/gl/gl-geometry'
import GlMaterial from 'src/gl/gl-material'
import sceneObject from 'src/factory/sceneObject'
import glObject from 'src/gl/base/glObject'

function childOrDefault(property: string, hybrids: Hybrids<HTMLElement>, defaultVal: any) {
  const childElements = `_c_${property}`
  return {
    [childElements]: children(hybrids),
    [property]: (host) => {
      if(host[childElements]?.length > 0 && host[childElements][0][property] != null) {
        return host[childElements][0][property]
      } else {
        return defaultVal
      }
    },
  }
}

interface GlMesh extends GlObject3D {
  [key: string]: any
}

export default {
  ...glObject(({mesh}) => mesh),
  ...childOrDefault('geometry', GlGeometry, new BoxGeometry(1, 1, 1)),
  ...childOrDefault('material', GlMaterial, new MeshBasicMaterial({color: 0x999999})),
  mesh: sceneObject({
    get: ({geometry, material}, value) => value || new Mesh(geometry, material),
  }),
} as Hybrids<GlMesh>
