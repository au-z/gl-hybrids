import { proxy, jsonProperty } from "src/util/Proxy"
import { Transformers } from "src/util/Transformers"
import { Object3D, BoxHelper, Color } from "three"
import { Hybrids } from "hybrids"

interface GlObject3D extends HTMLElement {
	castShadow: boolean
	id: string
	name: string
	position: [number, number, number]
	rotation: [number, number, number, string]
	scale: [number, number, number]
	invisible: boolean
	[key: string]: any
}

interface PropertySelectorFn<T> {
	(host: GlObject3D): T
}

export default function glObject(selectFn: PropertySelectorFn<Object3D>): Hybrids<GlObject3D> {
	return {
		castShadow: proxy(selectFn, 'castShadow'),
		id: proxy(selectFn, 'id'),
		name: proxy(selectFn, 'name'),
		position: proxy(selectFn, 'position', jsonProperty, Transformers.array.vector3),
		rotation: proxy(selectFn, 'rotation', jsonProperty, Transformers.array.euler),
		scale: proxy(selectFn, 'scale', jsonProperty, Transformers.array.vector3),
		invisible: proxy(selectFn, 'visible', Transformers.bool.invert),
		bbox: false,
		boxHelper: {
			get: (host, value) => {
				const object = selectFn(host as any)
				return host.bbox && new BoxHelper(object, new Color(0xffffff))
			},
			connect: (host, key, invaldate) => {
				const object = selectFn(host as any)
				host[key]?.isObject3D && object?.attach(host[key])
			},
		}
	}
}

export {
	glObject,
	GlObject3D,
}