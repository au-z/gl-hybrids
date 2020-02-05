import { Descriptor, property, Property } from 'hybrids'

const defaultTransform = (key) => ({
	get: (value) => value,
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
function proxy<E extends HTMLElement>(selector: ProxySelectorFn<E>, key, propertyCtor?, transform?): Descriptor<E> {
	transform = transform ? transform(key) : defaultTransform(key)
	let p // property instance

	return {
		get: (host, value) => selector(host) && transform.get(selector(host)[key]),
		set: (host, value, last) => selector(host) && transform.set(selector(host), p.set(host, value, last)),
		connect: (host, propName, invalidate) => {
			p = propertyCtor ? propertyCtor(host[propName]) : property(host[propName])
			return p.connect && p.connect(host, propName, invalidate)
		},
	}
}

/**
 * Parses the property as JSON to an object
 * @param defaultValue the default value for the property
 * @param connect connect descriptor fallback
 */
function jsonProperty<E extends HTMLElement>(defaultValue: any, connect): Property<E> {
	const parse = (value) => {
		const type = typeof value
		if(type === 'object') return value

		try {
			return (value && value !== '') ? JSON.parse(value.replace(/'/gim, '"')) : defaultValue
		} catch (ex) {
			console.error('[jsonProperty] Error parsing JSON. \t', value, typeof value, '\n\t', ex)
			return defaultValue
		}
	}

	return property(parse, connect)
}

export {
	proxy,
	jsonProperty,
}
