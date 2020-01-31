import * as THREE from 'three'
import { Hybrids, property} from 'hybrids'
import gl from './gl-context.base'
import GlAssetFactory from './gl-asset.factory'
import { GlObject3DMixin } from './gl-object'

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
	...GlObject3DMixin(({light}) => light),
	// color: 0xffffff,
	// intensity: 1,
	helper: false,
	// target: findInScene({id: 'camera', property: 'camera'}),
	light: GlAssetFactory({
		get: ({target, color, intensity}) => {
			return new THREE.DirectionalLight(color, intensity)
		}
	}),
	lightHelper: GlAssetFactory({
		get: ({helper, light}, value) => {
			if(helper) {
				return new THREE.DirectionalLightHelper(light, 0.33, 0xffffff)
			}
		},
	}),
} as Hybrids<GlDirectionalLight>