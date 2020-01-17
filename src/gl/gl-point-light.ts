import * as THREE from 'three'
import {html} from 'hybrids'

import useGL from './useGL'

const GlPointLight = {
	...useGL,
	name: 'Point.001',
	position: [0, 0, 0],
	color: 0xffffff,
	intensity: 1,
	distance: 0,
	decay: 1,
	light: ({gl, name, position, color, intensity, distance, decay}) => {
		const light = new THREE.PointLight(color, intensity, distance, decay)
		light.position.set(position[0], position[1], position[2])
		light.name = name

		gl.scene.add(light)
		return light
	},
	render: ({light}) => html`<meta data-name="${light.name}"></meta>`
}

export default GlPointLight