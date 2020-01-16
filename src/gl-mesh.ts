import * as THREE from 'three'
import {parent, Hybrids} from 'hybrids'

import GlCanvas from './gl-canvas'

const useGL: Hybrids<HTMLElement> | any = {
  canvas: parent(GlCanvas),
  gl: ({canvas: {gl}}) => gl,
}

const GlMesh = {
  ...useGL,
  mesh: ({gl}) => {
    console.log('GLMESH', gl)
    var geometry = new THREE.BoxGeometry( 1, 1, 1 )
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
    var cube = new THREE.Mesh( geometry, material )
    gl.scene.add(cube)
  }
}

export default GlMesh