import * as THREE from 'three'
import {html, Hybrids, children} from 'hybrids'

import gl from './gl-context.base'
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

interface GlMesh extends HTMLElement {
  [key: string]: any
}

export default {
  ...gl,
  name: 'Mesh.001',
  position: [0, 0, 0],
  ...childOrDefault('geometry', GlGeometry, new THREE.BoxGeometry(1, 1, 1)),
  ...childOrDefault('material', GlMaterial, new THREE.MeshBasicMaterial({color: 0x999999})),
  mesh: ({gl, name, position, geometry, material}) => {
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.fromArray(position)
    mesh.name = name
    gl.scene.add(mesh)

    gl.onUpdate(() => {
      mesh.rotation.x += 0.01
      mesh.rotation.y += 0.014
      mesh.rotation.z -= 0.006
    })

    return mesh
  },
  render: ({mesh}) => html`
    <meta data-name="${mesh.name}"></meta>
    <slot></slot>
  `,
} as Hybrids<GlMesh>
