import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { Hybrids, property, dispatch } from "hybrids"
import { mapToEnum } from "src/util/Map"
import glObject from 'src/gl/base/glObject'

enum MODEL_TYPE {
	gltf = 'GLTF',
}

const fetchModel = (src) => new Promise((res, rej) =>
	new GLTFLoader().load(src, (gltf) => res(gltf), null, rej))

interface GlModel extends HTMLElement {
	[key: string]: any
}

export default {
	...glObject(({model}) => model),
	type: property(mapToEnum.bind(null, MODEL_TYPE, MODEL_TYPE.gltf)),
	src: {
		...property(''),
		observe: (host, value) => {
			value && fetchModel(value).then(({scene}) => host.model = scene)
		},
	},
	model: {
		get: (host, value) => value,
		set: (host, value) => value,
		observe: (host, value, last) => {
			value?.isObject3D && dispatch(host, 'scene-add', {detail: value, bubbles: true, composed: true})
		},
	},
} as Hybrids<GlModel>

