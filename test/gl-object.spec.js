import {GlObject3DMixin} from 'src/gl/gl-object'
import { Object3D } from 'three'
import {define} from 'hybrids'
import {test} from './helpers'

describe('gl-object base class tests', () => {
	let hy

	define('gl-object-mixin', {
		foo: 0,
		bar: 0,
		obj: {
			get: ({foo, bar}) => new Object3D(),
			observe: (host, value, last) => {
				console.log(value.rotation)
			},
		},
		...GlObject3DMixin(({obj}) => obj),
	})

	hy = test(`<gl-object-mixin/>`)

	it('exposes an object from the proxied properties', hy((el) => {
		expect(el.position).toMatchObject([0, 0, 0])
		expect(el.scale).toMatchObject([1, 1, 1])
	}))
})