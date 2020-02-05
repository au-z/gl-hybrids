import gl from 'src/gl/gl-context.base'
import {GlObject3DMixin} from 'src/gl/gl-object'
import {Hybrids} from 'hybrids'
import GlAssetFactory from './gl-asset.factory'
import {HemisphereLight, HemisphereLightHelper, Object3D, Vector3, Euler} from 'three'

interface GlHemisphereLight extends HTMLElement {
	[key: string]: any
}

export default {
	...GlObject3DMixin(({light}) => light),
	skyColor: 0xffffff,
	groundColor: 0xffffff,
	intensity: 1,
	light: {
		get: ({skyColor, groundColor, intensity}, value) => new Object3D(),
		observe: (host, value, last) => {

		}
	},
	// helper: false,
	// lightHelper: GlAssetFactory({
	// 	get: ({helper, light, skyColor}, value) => {
	// 		if(helper) {
	// 			return new HemisphereLightHelper(light, 0.33, skyColor)
	// 		}
	// 	},
	// }),
} as Hybrids<GlHemisphereLight>

export {
	GlHemisphereLight,
}
