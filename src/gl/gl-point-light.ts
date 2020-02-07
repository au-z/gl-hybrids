import * as THREE from 'three'
import {Hybrids} from 'hybrids'
import sceneObject from 'src/factory/sceneObject'
import {glObject} from './base/glObject'
import { proxy, ProxySelectorFn, jsonProperty } from 'src/util/Proxy'
import { GlObject3D } from './gl-object'
import { Transformers } from 'src/util/Transformers'

interface GlPointLight extends HTMLElement {
	[key: string]: any
}

const selector: ProxySelectorFn<GlObject3D> = ({light}) => light

export default {
	color: proxy(selector, 'color', null, Transformers.hex.color),
	intensity: proxy(selector, 'intensity'),
	distance: proxy(selector, 'distance'),
	decay: proxy(selector, 'decay'),
	...glObject(selector),
	light: sceneObject({
		get: (host, value) => value ?? new THREE.PointLight(),
	}),
	helper: false,
	lightHelper: {
		get: ({helper, light}, value) => helper && new THREE.PointLightHelper(light, 0.33),
		connect: (host, key) => host[key] && host.light.attach(host[key])
	},
} as Hybrids<GlPointLight>
