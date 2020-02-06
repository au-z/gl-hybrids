import * as THREE from 'three'
import {Hybrids} from 'hybrids'
import sceneObject from 'src/factory/sceneObject'
import { glObject } from './base/glObject'

interface GlPointLight extends HTMLElement {
	[key: string]: any
}

export default {
	color: 0xffffff,
	intensity: 1,
	distance: 0,
	decay: 2,
	...glObject(({light}) => light),
	light: sceneObject({
		get: ({color, intensity, distance, decay}, value) =>
			value ?? new THREE.PointLight(color, intensity, distance, decay),
	}),
	helper: false,
	lightHelper: {
		get: ({helper, light}, value) => helper && new THREE.PointLightHelper(light, 0.33),
		connect: (host, key) => host[key] && host.light.attach(host[key])
	},
} as Hybrids<GlPointLight>
