import * as THREE from 'three'
import {Hybrids} from 'hybrids'
import sceneObject from 'src/factory/sceneObject'
import {glObject} from 'src/gl/base/glObject'
import { proxy, ProxySelectorFn } from 'src/util/Proxy'
import { GlObject3D } from 'src/gl/gl-object'
import { Transformers } from 'src/util/Transformers'
import glLightHelper from './glLightHelper'

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
	light: sceneObject({get: (host, value) => value ?? new THREE.PointLight()}),
	...glLightHelper(THREE.PointLightHelper),
} as Hybrids<GlPointLight>
