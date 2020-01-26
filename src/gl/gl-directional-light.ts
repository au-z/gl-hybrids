import * as THREE from 'three'
import { Hybrids, property, html } from 'hybrids'
import gl from './gl-context.base'
import GlAssetFactory from './GlAsset.factory'


// TODO
function findInScene({id, property}): any {
	return {
		get: ({parent, gl}, value) => {
			const children = Array.from(parent.children)
			// console.log(gl.scene)
			// console.log(children[1], (children[1] as any).id)
			return children.find((el) => {
				// console.log((el as any).id)
				return (el as any).id === value
			})
		},
		set: (host, value) => value,
	}
}

interface GlDirectionalLight extends HTMLElement {
	[key: string]: any
}

export default {
	...gl,
	name: 'Directional.001',
	position: [0, 1, 0],
	color: 0xffffff,
	intensity: 1,
	helper: false,
	// target: findInScene({id: 'camera', property: 'camera'}),
	light: GlAssetFactory({
		get: ({name, position, target, color, intensity}) => {
			const light = new THREE.DirectionalLight(color, intensity)
			light.name = name
			light.position.fromArray(position)
			if(target) {
				console.log(target)
			}

			return light
		}
	}),
	lightHelper: GlAssetFactory({
		get: ({helper, light}, value) => {
			if(helper) {
				return new THREE.DirectionalLightHelper(light, 0.33, 0xffffff)
			}
		},
	}),
	render: ({light, target}) => html`<meta data-name="${light.name}">${JSON.stringify(target)}</meta>`
} as Hybrids<GlDirectionalLight>