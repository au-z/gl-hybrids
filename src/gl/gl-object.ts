import {Hybrids} from 'hybrids'
import {Object3D} from 'three'
import sceneObject from 'src/factory/sceneObject'
import glObject, { GlObject3D } from 'src/gl/base/glObject'

export default (function() {
	return {
		...glObject(({obj}) => obj),
		obj: sceneObject({get: (host, value) => value ?? new Object3D()}),
	} as Hybrids<GlObject3D>
})()
