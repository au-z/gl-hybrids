import * as THREE from 'three'
import {html, Hybrids, property} from 'hybrids'
import {default as gl} from './gl-context.base'
import GlAssetFactory from './GlAsset.factory'

interface GlPointLight extends HTMLElement {
	[key: string]: any
}

export default {
	...gl,
	name: 'Point.001',
	position: [0, 0, 0],
	color: 0xffffff,
	intensity: 1,
	distance: 0,
	decay: 1,
	light: GlAssetFactory({
		get: ({gl, name, position, color, intensity, distance, decay, helper}) => {
			const light = new THREE.PointLight(color, intensity, distance, decay)
			light.position.fromArray(position)
			light.name = name
			light.visible = true

			return light
		},
	}),
	helper: property(false),
	lightHelper: GlAssetFactory({
		get: (host, value) => {
			console.log(host.helper)
			if(host.helper) {
				return new THREE.PointLightHelper(host.light, 0.33)
			}
		},
	}),
	render: ({light, helper}) => html`<meta data-name="${light.name}"></meta>`
} as Hybrids<GlPointLight>
