import {Hybrids, property} from 'hybrids'
import {MeshPhongMaterial, MeshBasicMaterial, MeshDepthMaterial, MeshToonMaterial, MeshLambertMaterial, MeshMatcapMaterial, Texture} from 'three'
import { proxy } from 'src/util/Proxy'
import { Transformers } from 'src/util/Transformers'
import childOrDefault from './mixins/childOrDefault'
import GlTexture from 'src/gl/textures/gl-texture'
import { mapToEnum } from 'src/util/Map'

enum MAT_TYPE {
	phong = 'PHONG',
	depth = 'DEPTH',
	lambert = 'LAMBERT',
	matcap = 'MATCAP',
	normal = 'NORMAL',
	toon = 'TOON',
	basic = 'BASIC',
}

function Material({type, texture}, value) {
	const parameters = {
		color: 0xffffff,
		matcap: type === MAT_TYPE.matcap && texture ? texture : undefined,
	}

	switch(type) {
		case MAT_TYPE.depth: return new MeshDepthMaterial()
		case MAT_TYPE.matcap: return new MeshMatcapMaterial(parameters)
		case MAT_TYPE.phong: return new MeshPhongMaterial(parameters)
		case MAT_TYPE.toon: return new MeshToonMaterial(parameters)
		case MAT_TYPE.basic: return new MeshBasicMaterial(parameters)
		default:
		case MAT_TYPE.lambert: return new MeshLambertMaterial(parameters)
	}
}

interface GlMaterial extends HTMLElement {
	type: string
	texture: Texture
	color: any
	[key: string]: any
}

export default {
	type: property(mapToEnum.bind(null, MAT_TYPE, MAT_TYPE.lambert)),
	color: proxy(({material}) => material, 'color', null, Transformers.hex.color),
	...childOrDefault(GlTexture, 'texture', ({material}) => material),
	material: {
		get: (host: GlMaterial, value) => Material(host, value),
		connect: (host, key) => {
			host.addEventListener('update', (e: CustomEvent) => {
				console.log('<gl-material> event: update', e.detail)
				host[key].children?.forEach((c) => c.update && c.update())
			})
		},
	},
} as Hybrids<GlMaterial>
