import gl from 'src/gl/gl-context.base'
import {GlObject3DMixin} from 'src/gl/gl-object'
import {Hybrids} from 'hybrids'
import GlAssetFactory from './gl-asset.factory'
import {HemisphereLight, HemisphereLightHelper} from 'three'

interface GlHemisphereLight extends HTMLElement {
	[key: string]: any
}

export default {
	...gl,
	...GlObject3DMixin(({light}) => light),
	skyColor: 0xffffff,
	groundColor: 0xffffff,
	intensity: 1,
	light: GlAssetFactory({
		get: ({skyColor, groundColor, intensity}, value) => value || new HemisphereLight(skyColor, groundColor, intensity),
	}),
	helper: false,
	lightHelper: GlAssetFactory({
		get: ({helper, light, skyColor}, value) => {
			if(helper) {
				return new HemisphereLightHelper(light, 0.33, skyColor)
			}
		},
	}),
} as Hybrids<GlHemisphereLight>

export {
	GlHemisphereLight,
}
