import * as THREE from 'three'
import {Hybrids, property} from 'hybrids'
import {mapToEnum} from '../util/Map'

import gl from './gl-context.base'
import { GlObject3DMixin } from './gl-object'

enum CAMERATYPE {
	perspective = 'PERSPECTIVE',
	isometric = 'ISOMETRIC',
	iso = 'ISOMETRIC',
}

function Camera({type, fov, aspect, near, far}: GlCamera) {
	let camera
	switch(type) {
		case CAMERATYPE.isometric:
			camera = {}; break;
		case CAMERATYPE.perspective:
		default:
			camera = new THREE.PerspectiveCamera(fov, aspect, near, far); break;
	}
	console.log('Camera uuid: ', camera.uuid)
	return camera
}

interface GlCamera extends HTMLElement {
	[key: string]: any
}

export default {
	...gl,
	...GlObject3DMixin(({camera}) => camera),
	type: property(mapToEnum.bind(null, CAMERATYPE)),
	fov: 75,
	near: 0.1,
	far: 1000,
	camera: ({canvas, gl, fov, near, far}) => {
		const aspect = canvas.clientWidth / canvas.clientHeight
		const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
		gl.onAttach({name: 'camera', asset: camera})

		window.addEventListener('resize', () => {
			camera.aspect = canvas.clientWidth / canvas.clientHeight
			camera.updateProjectionMatrix()
		})

		return camera
	},
} as Hybrids<GlCamera>
