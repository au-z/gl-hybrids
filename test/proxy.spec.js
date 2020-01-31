import {proxy} from 'src/util/proxy'
import {Transformers} from 'src/util/Transformers'
import {define} from 'hybrids'
import {test} from './helpers'

describe('proxy tests', () => {
	describe('boolean proxy', () => {
		define('boolean-proxy', {
			obj: () => ({bool: false}),
			bool: proxy(({obj}) => obj, 'bool', false),
		})

		it('exposes the default boolean', () => {
			test(`<boolean-proxy/>`)((el) => {
				expect(el.obj).toMatchObject({bool: false})
				expect(el.bool).toBe(false)
			})
		})

		it('assigns the value from attribute', () => {
			test(`<boolean-proxy bool/>`)((el) => {
				expect(el.obj).toMatchObject({bool: true})
				expect(el.bool).toBe(true)
			})
		})
	})

	describe('number proxy', () => {
		define('number-proxy', {
			obj: () => ({num: 0}),
			num: proxy(({obj}) => obj, 'num', 0),
		})

		it('exposes the default number', () => {
			test(`<number-proxy/>`)((el) => {
				expect(el.obj).toMatchObject({num: 0})
				expect(el.num).toBe(0)
			})
		})

		it('assigns the value from attribute', () => {
			test(`<number-proxy num="42"/>`)((ex) => {
				expect(el.obj).toMatchObject({num: 42})
				expect(el.num).toBe(42)
			})
		})
	})

	describe('string proxy', () => {
		define('string-proxy', {
			obj: () => ({str: ''}),
			str: proxy(({obj}) => obj, 'str', 'hello'),
		})

		it('exposes the default string', () => {
			test(`<string-proxy/>`)((el) => {
				expect(el.obj).toMatchObject({str: 'hello'})
				expect(el.str).toBe('hello')
			})
		})

		it('assigns the value from attribute', () => {
			test(`<string-proxy str="goodbye"/>`)((el) => {
				expect(el.obj).toMatchObject({str: 'goodbye'})
				expect(el.str).toBe('goodbye')
			})
		})
	})

	describe('array proxy', () => {
		define('array-proxy', {
			obj: () => ({arr: [1, 2, 3]}),
			arr: proxy(({obj}) => obj, 'arr', [0, 0, 0])
		})

		it('exposes the default array', () => {
			test(`<array-proxy/>`)((el) => {
				expect(el.obj).toMatchObject({arr: [0, 0, 0]})
				expect(el.arr).toMatchObject([0, 0, 0])
			})
		})

		it('allows for the attribute to be set', () => {
			test(`<array-proxy arr="[1, 1, 1]"/>`)((el) => {
				expect(el.obj).toMatchObject({arr: [1, 1, 1]})
				expect(el.arr).toMatchObject([1, 1, 1])
			})
		})
	})

	describe('transformers', () => {
		describe('boolean inversion', () => {
			define('boolean-inversion', {
				obj: () => ({on: true}),
				off: proxy(({obj}) => obj, 'on', false, Transformers.bool.invert),
			})

			it('inverts the proxied property', () => {
				test(`<boolean-inversion off/>`)((el) => {
					expect(el.obj.on).toBe(false)
					expect(el.off).toBe(true)
				})
			})
		})
	})
})