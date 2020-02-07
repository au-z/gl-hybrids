import {DirectionalLight, DirectionalLightHelper} from 'three'
import {Hybrids} from 'hybrids'
import sceneObject from 'src/factory/sceneObject'
import { glObject, GlObject3D } from './base/glObject'
import { ProxySelectorFn, proxy } from 'src/util/Proxy'
import { Transformers } from 'src/util/Transformers'

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

const selector: ProxySelectorFn<GlObject3D> = ({light}) => light

export default {
	color: proxy(selector, 'color', null, Transformers.hex.color),
	intensity: proxy(selector, 'intensity'),
	...glObject(({light}) => light),
	light: sceneObject({
		get: (host, value) => value ?? new DirectionalLight(),
	}),
	helper: false,
	lightHelper: {
		get: ({helper, color, light}, value) => helper && new DirectionalLightHelper(light, 0.3, color),
		connect: (host, key) => {
			if(host[key]) host.light.attach(host[key])
			else console.log(host[key])
		},
	},
} as Hybrids<GlDirectionalLight>