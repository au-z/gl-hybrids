import * as THREE from 'three'
import {dispatch, html, Hybrids, property} from 'hybrids'
import {mapToEnum} from '../util/Map'

import gl from './gl-context.base'

enum CAMERATYPE {
	perspective = 'PERSPECTIVE',
	isometric = 'ISOMETRIC',
	iso = 'ISOMETRIC',
}

function Camera({name, type, fov, aspect, near, far}) {
	let camera
	switch(type) {
		case CAMERATYPE.isometric:
			camera = {}; break;
		case CAMERATYPE.perspective:
		default:
			camera = new THREE.PerspectiveCamera(fov, aspect, near, far); break;
	}

	camera.name = name
	return camera
}

interface GlCamera extends HTMLElement {
	[key: string]: any
}

export default {
	...gl,
	name: 'camera',
	type: property(mapToEnum.bind(null, CAMERATYPE)),
	fov: 75,
	near: 0.1,
	far: 1000,
	position: [0, 0, 0],
  aspect: ({gl}) => gl.canvas.clientWidth / gl.canvas.clientHeight,
	camera: (host) => {
		const camera = Camera(host as any)
		camera.position.fromArray(host.position)
		dispatch(host, 'gl-attach', {detail: {name: 'camera', asset: camera}, bubbles: true})

		window.addEventListener('resize', () => {
			camera.aspect = host.canvas.clientWidth / host.canvas.clientHeight
			camera.updateProjectionMatrix()
		})

		return camera
	},
	render: ({camera}) => html`<meta data-name="${camera.name}"></meta>`,
} as Hybrids<GlCamera>
