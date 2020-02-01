import {proxy, jsonProperty} from 'src/util/proxy'
import {Transformers} from 'src/util/Transformers'
import {property, define} from 'hybrids'
import {test} from './helpers'

describe('proxy tests', () => {
	let hy = null

	// describe('basic properties and json properties', () => {
	// 	define('basic-property', {
	// 		bool: false,
	// 		num: 0,
	// 		str: '',
	// 		vec: jsonProperty([0, 0, 0]),
	// 		obj: jsonProperty({foo: 'bar'}),
	// 	})

	// 	hy = test(`<basic-property>`)
	// 	it('sets the appropriate defaults', hy((el) => {
	// 		expect(el.bool).toBe(false)
	// 		expect(el.num).toBe(0)
	// 		expect(el.str).toBe('')
	// 		expect(el.vec).toMatchObject([0, 0, 0])
	// 		expect(el.obj).toMatchObject({foo: 'bar'})
	// 	}))

	// 	hy = test(`<basic-property bool num="42" str="hello" vec="[1, 2, 3]" obj="{'foo': 'baz'}"/>`)
	// 	it('sets the properties from attributes', hy((el) => {
	// 		expect(el.bool).toBe(true)
	// 		expect(el.num).toBe(42)
	// 		expect(el.str).toBe('hello')
	// 		expect(el.vec).toMatchObject([1, 2, 3])
	// 		expect(el.obj).toMatchObject({foo: 'baz'})
	// 	}))
	// })

	describe('array proxy', () => {
		define('array-proxy', {
			obj: () => ({vec: [0, 0, 0]}),
			vec: proxy(({obj}) => obj, 'vec', jsonProperty([1, 1, 1])),
		})

		hy = test(`<array-proxy/>`)
		it('sets the property default over the original value', hy((el) => {
			expect(el.obj).toMatchObject({vec: [0, 0, 0]})
			// expect(el.vec).toMatchObject([1, 1, 1])
		}))

		// it('changes the values in sync when assigned', hy((el) => {
		// 	el.vec = [1, 1, 1]
		// 	expect(el.vec).toMatchObject(el.obj.vec)
		// }))

		// hy = test(`<array-proxy vec="['A', 'A', 'A']"/>`)
		// it('can assign an array from the attribute value', hy((el) => {
		// 	expect(el.obj.vec).toMatchObject(['A', 'A', 'A'])
		// }))
	})

	// describe('object proxy', () => {
	// 	function Object() {
	// 		return {
	// 			bool: false,
	// 			num: 0,
	// 			str: '',
	// 			vec: [0, 0, 0],
	// 			obj: {foo: 'bar'},
	// 		}
	// 	}

	// 	const selector = ({objProperty}) => objProperty

	// 	define('object-proxy', {
	// 		objProperty: (host, value) => value || new Object(),
	// 		bool: proxy(selector, 'bool', property(false)),
	// 		num: proxy(selector, 'num', property(0)),
	// 		str: proxy(selector, 'str', property('')),
	// 		vec: proxy(selector, 'vec', jsonProperty([0, 0, 0])),
	// 		obj: proxy(selector, 'obj', jsonProperty({})),
	// 	})

	// 	hy = test(`<object-proxy/>`)
	// 	it('proxies the property defaults', hy((el) => {
	// 		expect(el.bool).toBe(false)
	// 		expect(el.num).toBe(0)
	// 		expect(el.str).toBe('')
	// 		expect(el.vec).toMatchObject([0, 0, 0])
	// 		expect(el.obj).toMatchObject({foo: 'bar'})
	// 	}))

	// 	hy = test(`<object-proxy bool num="42" str="hi" vec="[1, 1, 1]"/>`)
	// 	it('assigns the value from attribute', hy((el) => {
	// 		expect(el.bool).toBe(true)
	// 		expect(el.num).toBe(42)
	// 		expect(el.str).toBe('hi')
	// 		expect(el.vec).toMatchObject([1, 1, 1])
	// 	}))
	// })
})


	// describe('transformers', () => {
	// 	describe('boolean inversion', () => {
	// 		define('boolean-inversion', {
	// 			obj: () => ({on: true}),
	// 			off: proxy(({obj}) => obj, 'on', false, Transformers.bool.invert),
	// 		})

	// 		it('inverts the proxied property', () => {
	// 			test(`<boolean-inversion off/>`)((el) => {
	// 				expect(el.obj.on).toBe(false)
	// 				expect(el.off).toBe(true)
	// 			})
	// 		})
	// 	})

	// 	describe('THREEJS euler transform', () => {
	// 		define('euler-transform', {
	// 			obj: () => new THREE.Object3D(),
	// 			rotation: proxy(({obj}) => obj, 'rotation', '', Transformers.string.euler),
	// 		})

	// 		it('initializes with the default rotation', () => {
	// 			test(`<euler-transform/>`)((el) => {
	// 				expect(el.rotation).toMatchObject([0, 0, 0, 'XYZ'])
	// 				console.log(el.obj.rotation)
	// 				// expect(el.obj.rotation).toBe(2)
	// 			})
	// 		})
	// 	})
	// })