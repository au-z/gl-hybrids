import * as THREE from 'three'
import {Hybrids, property} from 'hybrids'
import {mapToEnum} from '../util/Map'

import gl from './gl-context.base'
import { GlObject3DMixin } from './gl-object'
import { dispatchOnCreate } from 'src/factories'
import { PerspectiveCamera } from 'three'

enum CAMERATYPE {
	perspective = 'PERSPECTIVE',
	isometric = 'ISOMETRIC',
	iso = 'ISOMETRIC',
}

function Camera({type, fov, aspect, near, far}: GlCamera) {
	switch(type) {
		case CAMERATYPE.isometric:
			return {}
		case CAMERATYPE.perspective:
		default:
			return new THREE.PerspectiveCamera(fov, aspect, near, far)
	}
}

function updateCamera(host, camera) {
	if(!camera) return
	camera.aspect = host.canvas.clientWidth / host.canvas.clientHeight
	camera.updateProjectionMatrix()
}

interface GlCamera extends HTMLElement {
	[key: string]: any
}

export default {
	...gl,
	type: property(mapToEnum.bind(null, CAMERATYPE)),
	fov: 75,
	near: 0.1,
	far: 1000,

	aspect: ({canvas}) => canvas.clientWidth / canvas.clientHeight,

	camera: dispatchOnCreate('load-camera', {
		get: Camera,
		connect: (host, key) => {
			window.addEventListener('resize', updateCamera.bind(null, host, host[key]))
		},
	}),
	// camera: () => new PerspectiveCamera(75, 1, 0.1, 1000),
	...GlObject3DMixin(({camera}) => camera),
} as Hybrids<GlCamera>
