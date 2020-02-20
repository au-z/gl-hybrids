import {Mesh, BoxGeometry, MeshBasicMaterial} from 'three'
import {Hybrids, dispatch} from 'hybrids'
import {GlObject3D} from 'src/gl/base/glObject'

import GlGeometry from 'src/gl/gl-geometry'
import GlMaterial from 'src/gl/gl-material'
import glObject from 'src/gl/base/glObject'
import childOrDefault from './mixins/childOrDefault'

interface GlMesh extends GlObject3D {
	[key: string]: any
}

export default {
	...glObject(({mesh}) => mesh),
	...childOrDefault(GlGeometry, 'geometry', ({mesh}) => mesh),
	...childOrDefault(GlMaterial, 'material', ({mesh}) => mesh),
	mesh: {
		get: (host, value) => value ?? new Mesh(new BoxGeometry(1, 1, 1), new MeshBasicMaterial({color: 0x999999})),
		connect: (host, key) => {
			host.addEventListener('update', (e: CustomEvent) => {
				console.log('<gl-mesh> event: update', e.detail)
				host[key].children.forEach((c) => c.update && c.update())
			})
			host[key] && dispatch(host, 'scene-add', {detail: host[key], bubbles: true, composed: true})
			return () => dispatch(host, 'scene-del', {detail: host[key].id, bubbles: true, composed: true})
		},
	},
} as Hybrids<GlMesh>
