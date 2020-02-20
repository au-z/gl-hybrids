import {Hybrids, property, dispatch} from 'hybrids'
import { mapToEnum } from 'src/util/Map'
import { TextureLoader, Texture } from 'three'
const textureLoader = new TextureLoader()

enum TEX_TYPE {
	matcap = 'MATCAP',
}

enum TEX_PRESET {
	porcelain = 'PORCELAIN',
	blue = 'BLUE',
	jade = 'JADE',
	clay = 'CLAY',
	chrome = 'CHROME',
	gold = 'GOLD',
	studio = 'STUDIO',
	normal = 'NORMAL',
}

function presetToUrl(preset) {
	switch(preset) {
		default:
		case TEX_PRESET.porcelain: return '/static/textures/matcap-porcelain-white.jpg'
		case TEX_PRESET.blue: return '/static/textures/matcap-baby-blue.jpg'
		case TEX_PRESET.jade: return '/static/textures/matcap-jade.jpg'
		case TEX_PRESET.clay: return '/static/textures/matcap-clay-red.jpg'
		case TEX_PRESET.chrome: return '/static/textures/matcap-chrome.jpg'
		case TEX_PRESET.gold: return '/static/textures/matcap-gold.jpg'
		case TEX_PRESET.studio: return '/static/textures/matcap-gray-studio.jpg'
		case TEX_PRESET.normal: return '/static/textures/matcap-normal.jpg'
	}
}

interface GlTexture extends HTMLElement {
	[key: string]: any
}

export default {
	type: property(mapToEnum.bind(null, TEX_TYPE, TEX_TYPE.matcap)),
	preset: property(mapToEnum.bind(null, TEX_PRESET, TEX_PRESET.gold)),
	src: '',
	texture: ({preset, src}) => {
		if (!preset && !src) return
		console.log(presetToUrl(preset))
		return textureLoader.load(presetToUrl(preset) || src)
	},
} as Hybrids<GlTexture>

export {
	GlTexture,
}
