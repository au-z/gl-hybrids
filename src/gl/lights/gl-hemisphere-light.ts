import {Hybrids} from 'hybrids'
import {HemisphereLight, HemisphereLightHelper} from 'three'
import sceneObject from 'src/factory/sceneObject'
import { glObject, GlObject3D } from 'src/gl/base/glObject'
import glLightHelper from 'src/gl/lights/glLightHelper'
import { proxy, ProxySelectorFn } from 'src/util/Proxy'
import { Transformers } from 'src/util/Transformers'

interface GlHemisphereLight extends GlObject3D {
	[key: string]: any
}

const selector: ProxySelectorFn<GlObject3D> = ({light}) => light

export default {
	skyColor: proxy(selector, 'skyColor', null, Transformers.hex.color),
	groundColor: proxy(selector, 'groundColor', null, Transformers.hex.color),
	intensity: proxy(selector, 'intensity'),
	...glObject(selector),
	light: sceneObject({
		get: ({skyColor, groundColor, intensity}, value) => new HemisphereLight(skyColor, groundColor, intensity),
	}),
	...glLightHelper(HemisphereLightHelper),
} as Hybrids<GlHemisphereLight>

export {
	GlHemisphereLight,
}