import * as THREE from 'three'
import {html, parent, Hybrids, property} from 'hybrids'

import GlCanvas from './gl-canvas'

const useGL: Hybrids<HTMLElement> | any = {
  canvas: parent(GlCanvas),
  gl: ({canvas: {gl}}) => gl,
}

const GlMesh = {
  ...useGL,
  name: property('Mesh.001'),
  mesh: ({gl, name}) => {
    var geometry = new THREE.BoxGeometry( 1, 1, 1 )
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
    var cube = new THREE.Mesh(geometry, material)
    cube.name = name
    gl.scene.add(cube)

    gl.onUpdate(() => {
      cube.rotation.x += 0.01
      cube.rotation.y += 0.014
    })

    return cube
  },
  render: ({mesh}) => html`<i data-name="${mesh.name}"/></i>`,
}

export default GlMesh