import {DirectionalLight, DirectionalLightHelper} from 'three'
import {Hybrids} from 'hybrids'
import sceneObject from 'src/factory/sceneObject'
import { glObject, GlObject3D } from './base/glObject'

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

interface GlDirectionalLight extends GlObject3D {
	[key: string]: any
}

export default {
	...glObject(({light}) => light),
	color: 0xffffff,
	intensity: 1,
	// target: findInScene({id: 'camera', property: 'camera'}),
	light: sceneObject({
		get: ({color, intensity}, value) => value ?? new DirectionalLight(color, intensity),
	}),
	helper: false,
	lightHelper: {
		get: ({helper, light}, value) => helper && new DirectionalLightHelper(light, 0.3, 0xffffff),
		connect: (host, key) => {
			if(host[key]) host.light.attach(host[key])
			else console.log(host[key])
		},
	},
} as Hybrids<GlDirectionalLight>