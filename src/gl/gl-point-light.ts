import * as THREE from 'three'
import {Hybrids} from 'hybrids'
import gl from './gl-context.base'
import GlAssetFactory from './gl-asset.factory'
import { GlObject3DMixin } from './gl-object'

interface GlPointLight extends HTMLElement {
	[key: string]: any
}

export default {
	...gl,
	color: 0xffffff,
	intensity: 1,
	distance: 0,
	decay: 2,
	helper: false,
	lightHelper: GlAssetFactory({
		get: ({helper, light}, value) => {
			if(helper) {
				return new THREE.PointLightHelper(light, 0.33)
			}
		},
	}),

	light: GlAssetFactory({
		get: ({color, intensity, distance, decay}, value) => {
			console.log(color, intensity, distance, decay)
			return value ?? new THREE.PointLight(color, intensity, distance, decay)
		},
	}),
	...GlObject3DMixin(({light}) => light),
} as Hybrids<GlPointLight>
