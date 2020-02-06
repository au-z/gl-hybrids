import {Hybrids} from 'hybrids'
import {HemisphereLight, HemisphereLightHelper} from 'three'
import sceneObject from '../factory/sceneObject'
import { glObject, GlObject3D } from './base/glObject'

interface GlHemisphereLight extends GlObject3D {
	[key: string]: any
}

export default {
	skyColor: 0xffffff,
	groundColor: 0xffffff,
	intensity: 1,
	...glObject(({light}) => light),
	light: sceneObject({
		get: ({skyColor, groundColor, intensity}, value) => new HemisphereLight(skyColor, groundColor, intensity),
	}),
	helper: false,
	lightHelper: {
		get: ({helper, light}, value) => helper && new HemisphereLightHelper(light, 0.3, 0xffffff),
		connect: (host, key) => host[key] && host.light.attach(host[key])
	},
} as Hybrids<GlHemisphereLight>

export {
	GlHemisphereLight,
}