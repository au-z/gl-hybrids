import * as THREE from 'three'
import {proxy, jsonProperty} from 'src/util/proxy'
import {Transformers} from 'src/util/Transformers'
import {define} from 'hybrids'
import {test} from './helpers'

describe('proxy tests', () => {
	let hy = null

	describe('basic properties and json properties', () => {
		define('basic-property', {
			bool: false,
			num: 0,
			str: '',
			vec: jsonProperty([0, 0, 0]),
			obj: jsonProperty({foo: 'bar'}),
		})

		hy = test(`<basic-property>`)
		it('sets the appropriate defaults', hy((el) => {
			expect(el.bool).toBe(false)
			expect(el.num).toBe(0)
			expect(el.str).toBe('')
			expect(el.vec).toMatchObject([0, 0, 0])
			expect(el.obj).toMatchObject({foo: 'bar'})
		}))

		hy = test(`<basic-property bool num="42" str="hello" vec="[1, 2, 3]" obj="{'foo': 'baz'}"/>`)
		it('sets the properties from attributes', hy((el) => {
			expect(el.bool).toBe(true)
			expect(el.num).toBe(42)
			expect(el.str).toBe('hello')
			expect(el.vec).toMatchObject([1, 2, 3])
			expect(el.obj).toMatchObject({foo: 'baz'})
		}))
	})

	describe('boolean-proxy', () => {
		define('boolean-proxy', {
			obj: () => ({bool: false}),
			bool: proxy(({obj}) => obj, 'bool'),
		})

		hy = test(`<boolean-proxy/>`)
		it('sets the property default', hy((el) => {
			expect(el.obj.bool).toBe(false)
			expect(el.bool).toBe(false)
		}))

		it('can assign the property', hy((el) => {
			el.bool = true
			expect(el.bool).toBe(true)
			expect(el.obj.bool).toBe(true)
		}))

		hy = test(`<boolean-proxy bool/>`)
		it('can assign the property by attribute', hy((el) => {
			expect(el.bool).toBe(true)
			expect(el.obj.bool).toBe(true)
		}))
	})

	describe('number-proxy', () => {
		define('number-proxy', {
			obj: () => ({num: 0}),
			num: proxy(({obj}) => obj, 'num'),
		})

		hy = test(`<number-proxy/>`)
		it('sets the property default', hy((el) => {
			expect(el.obj.num).toBe(0)
			expect(el.num).toBe(0)
		}))

		it('can assign the property', hy((el) => {
			el.num = 42
			expect(el.num).toBe(42)
			expect(el.obj.num).toBe(42)
		}))

		hy = test(`<number-proxy num="20"/>`)
		it('can assign the property by attribute', hy((el) => {
			expect(el.num).toBe(20)
			expect(el.obj.num).toBe(20)
		}))
	})

	describe('array proxy', () => {
		define('array-proxy', {
			obj: () => ({vec: [0, 0, 0]}),
			vec: proxy(({obj}) => obj, 'vec', jsonProperty),
		})

		hy = test(`<array-proxy/>`)
		it('proxies the assigned value', hy((el) => {
			expect(el.obj.vec).toMatchObject([0, 0, 0])
			expect(el.vec).toMatchObject([0, 0, 0])
		}))

		it('changes the values in sync when assigned', hy((el) => {
			el.vec = [1, 1, 1]
			expect(el.vec).toMatchObject([1, 1, 1])
			expect(el.obj.vec).toMatchObject([1, 1, 1])
		}))

		hy = test(`<array-proxy vec="[1, 1, 1]" vec-b="[1, 1, 1]"/>`)
		it('can assign an array by attribute', hy((el) => {
			expect(el.obj.vec).toMatchObject([1, 1, 1])
			expect(el.vec).toMatchObject([1, 1, 1])
		}))
	})

	describe('object proxy', () => {
		function Object() {
			return {
				bool: false,
				num: 0,
				str: '',
				vec: [0, 0, 0],
				obj: {foo: 'bar'},
			}
		}

		const selector = ({objProperty}) => objProperty

		define('object-proxy', {
			objProperty: (host, value) => value || new Object(),
			bool: proxy(selector, 'bool'),
			num: proxy(selector, 'num'),
			str: proxy(selector, 'str'),
			vec: proxy(selector, 'vec', jsonProperty),
			obj: proxy(selector, 'obj', jsonProperty),
		})

		hy = test(`<object-proxy/>`)
		it('proxies the property defaults', hy((el) => {
			expect(el.bool).toBe(false)
			expect(el.num).toBe(0)
			expect(el.str).toBe('')
			expect(el.vec).toMatchObject([0, 0, 0])
			expect(el.obj).toMatchObject({foo: 'bar'})
		}))

		hy = test(`<object-proxy bool num="42" str="hi" vec="[1, 1, 1]"/>`)
		it('assigns the value from attribute', hy((el) => {
			expect(el.bool).toBe(true)
			expect(el.num).toBe(42)
			expect(el.str).toBe('hi')
			expect(el.vec).toMatchObject([1, 1, 1])
		}))
	})

	describe('proxy transformers', () => {
		describe('boolean inversion', () => {
			define('boolean-inversion', {
				obj: () => ({on: true}),
				off: proxy(({obj}) => obj, 'on', null, Transformers.bool.invert),
			})

			hy = test('<boolean-inversion/>')
			it('sets the default', hy((el) => {
				expect(el.obj.on).toBe(true)
				expect(el.off).toBe(false)
			}))

			it('assigns the proxied value from the inverted property', hy((el) => {
				el.off = true
				expect(el.obj.on).toBe(false)
				expect(el.off).toBe(true)
			}))

			hy = test(`<boolean-inversion off/>`)
			it('inverts the proxied property', hy((el) => {
				expect(el.obj.on).toBe(false)
				expect(el.off).toBe(true)
			}))
		})

		describe('THREEJS vector3 transform', () => {
			define('vector-transform', {
				obj: () => new THREE.Object3D(),
				position: proxy(({obj}) => obj, 'position', jsonProperty, Transformers.array.vector3),
			})

			hy = test(`<vector-transform/>`)
			it('initializes with the default position', hy((el) => {
				expect(el.position).toMatchObject([0, 0, 0])
				expect(el.obj.position).toMatchObject({x: 0, y: 0, z: 0})
			}))

			hy = test(`<vector-transform position="[1, 2, 3]"/>`)
			it('assigns the position from attribute value', hy((el) => {
				expect(el.position).toMatchObject([1, 2, 3])
				expect(el.obj.position).toMatchObject({x: 1, y: 2, z: 3})
			}))
		})

		describe('THREEJS euler transform', () => {
			define('euler-transform', {
				obj: () => new THREE.Object3D(),
				rotation: proxy(({obj}) => obj, 'rotation', jsonProperty, Transformers.array.euler),
			})

			hy = test(`<euler-transform/>`)
			it('initializes with the default rotation', hy((el) => {
				expect(el.rotation).toMatchObject([0, 0, 0, 'XYZ'])
				expect(el.obj.rotation).toMatchObject({x: 0, y: 0, z: 0, order: 'XYZ'})
			}))

			hy = test(`<euler-transform rotation="[1, 1, 1]"/>`)
			it('can assign an euler rotation from attribute value', hy((el) => {
				expect(el.rotation).toMatchObject([1, 1, 1, 'XYZ'])
				expect(el.obj.rotation).toMatchObject({x: 1, y: 1, z: 1, order: 'XYZ'})
			}))
		})
	})

})