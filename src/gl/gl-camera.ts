import * as THREE from 'three'
import {Hybrids, property} from 'hybrids'
import {mapToEnum} from '../util/Map'

import gl from './base/glContext'
import { dispatchOnCreate } from 'src/factories'
import glObject from './base/glObject'

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
	...glObject(({camera}) => camera),
	aspect: ({canvas}) => canvas.clientWidth / canvas.clientHeight,
	camera: dispatchOnCreate('load-camera', {
		get: Camera,
		connect: (host, key) => {
			window.addEventListener('resize', updateCamera.bind(null, host, host[key]))
		},
	}),
} as Hybrids<GlCamera>
