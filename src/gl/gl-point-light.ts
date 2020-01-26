import * as THREE from 'three'
import {html, Hybrids, property} from 'hybrids'
import {default as gl} from './gl-context.base'
import GlAssetFactory from './GlAsset.factory'
import { GlObject3DMixin } from './gl-object'

interface GlPointLight extends HTMLElement {
	[key: string]: any
}

export default {
	...gl,
	...GlObject3DMixin(({light}) => light),
	color: 0xffffff,
	intensity: 1,
	distance: 0,
	decay: 1,
	light: GlAssetFactory({
		get: ({color, intensity, distance, decay}) => new THREE.PointLight(color, intensity, distance, decay),
	}),
	helper: property(false),
	lightHelper: GlAssetFactory({
		get: ({helper, light}, value) => {
			if(helper) {
				return new THREE.PointLightHelper(light, 0.33)
			}
		},
	}),
} as Hybrids<GlPointLight>
