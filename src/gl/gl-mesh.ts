import * as THREE from 'three'
import {html} from 'hybrids'

import useGL from './useGL'

const GlMesh = {
  ...useGL,
  name: 'Mesh.001',
  position: [0, 0, 0],
  geometry: () => new THREE.BoxGeometry(1, 1, 1),
  material: () => new THREE.MeshBasicMaterial({color: 0x9a9e9f}),
  mesh: ({gl, name, position, geometry, material}) => {
    var cube = new THREE.Mesh(geometry, material)
    cube.position.set(position[0], position[1], position[2])
    cube.name = name
    gl.scene.add(cube)

    gl.onUpdate(() => {
      cube.rotation.x += 0.01
      cube.rotation.y += 0.014
    })

    return cube
  },
  render: ({mesh}) => html`
    <meta data-name="${mesh.name}"></meta>
    <slot></slot>
  `,
}

export default GlMesh