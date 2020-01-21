import * as THREE from 'three'
import {html, Hybrids} from 'hybrids'

import useGL from './useGL'

interface GlPointLight extends HTMLElement {
	[key: string]: any
}

export default {
	...useGL,
	name: 'Point.001',
	position: [0, 0, 0],
	color: 0xffffff,
	intensity: 1,
	distance: 0,
	decay: 1,
	helper: {
		get: (host, value) => {
			if(value) return new THREE.PointLightHelper(host.light, 0.33)
		},
		observe: (host, value) => console.log(host, value),
	},
	light: ({gl, name, position, color, intensity, distance, decay}) => {
		const light = new THREE.PointLight(color, intensity, distance, decay)
		light.position.set(position[0], position[1], position[2])
		light.name = name

		gl.scene.add(light)
		return light
	},
	render: ({light, helper}) => html`<meta data-name="${light.name}"></meta>`
} as Hybrids<GlPointLight>
