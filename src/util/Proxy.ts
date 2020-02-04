import { Descriptor, Property } from 'hybrids'
import property from './localProperty.js'

const defaultTransform = (key) => ({
	get: (proxy, value) => value,
	set: (proxy, value) => {
		proxy[key] = value
		return value
	},
	connect: (value) => value,
})

interface ProxySelectorFn<E extends HTMLElement> {
	(host: E): any
}

/**
 * Extends an existing property's property to the hybrids api
 */
function proxy<E extends HTMLElement>(selector: ProxySelectorFn<E>, key, property, transform?): Descriptor<E> {
	transform = transform ? transform(key) : defaultTransform(key)

	return {
		get: (host, value) => {
			value = value || selector(host)[key]
			// console.log('GET: ', value)
			value = transform.get(value)
			console.log('GET: ', value)
			return property.get(host, value)
		},
		set: (host, value, last) => {
			console.log('SET: ', value, last, selector(host)[key])
			transform.set(selector(host), value)
			console.log('POST-SET: ', selector(host)[key], value, last)
			return property.set(host, value, last)
		},
		connect: (host, propName, invalidate) => {
			return property.connect && property.connect(host, propName, invalidate)
		},
	}
}

/**
 * Parses the property as JSON
 * @param defaultValue the default value for the property
 * @param connect connect descriptor fallback
 */
function jsonProperty<E extends HTMLElement>(defaultValue: any, connect): Property<E> {
	const parse = (value) => {
		try {
			return (value && value !== '') ? JSON.parse(value.replace(/'/gim, '"')) : defaultValue
		} catch (ex) {
			console.error('[jsonProperty] Error parsing JSON. \n\t', ex)
			return defaultValue
		}
	}

	return property(parse, connect)
}

export {
	proxy,
	jsonProperty,
}
