import {DirectionalLight, DirectionalLightHelper} from 'three'
import {Hybrids} from 'hybrids'
import sceneObject from 'src/factory/sceneObject'
import { glObject, GlObject3D } from 'src/gl/base/glObject'
import { ProxySelectorFn, proxy } from 'src/util/Proxy'
import { Transformers } from 'src/util/Transformers'
import glLightHelper from 'src/gl/lights/glLightHelper'

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
	...glLightHelper(DirectionalLightHelper),
} as Hybrids<GlDirectionalLight>