import * as THREE from 'three'
import {Hybrids, children} from 'hybrids'

import gl from './gl-context.base'
import GlAssetFactory from './GlAsset.factory'
import {GlObject3D, GlObject3DMixin} from './gl-object'

import GlGeometry from './gl-geometry'
import GlMaterial from './gl-material'

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
  ...gl,
  ...GlObject3DMixin(({mesh}) => mesh),
  ...childOrDefault('geometry', GlGeometry, new THREE.BoxGeometry(1, 1, 1)),
  ...childOrDefault('material', GlMaterial, new THREE.MeshBasicMaterial({color: 0x999999})),
  mesh: GlAssetFactory({
    get: ({geometry, material}) => new THREE.Mesh(geometry, material),
  }),
} as Hybrids<GlMesh>
