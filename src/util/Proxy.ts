import { Descriptor, property, Property } from 'hybrids'

const defaultTransform = (propertyName) => ({
	get: (proxy, value) => value,
	set: (proxy, value) => {
		proxy[propertyName] = value
		return value
	},
	connect: (value) => value,
})

interface ProxySelectorFn<E extends HTMLElement> {
	(host: E): any
}

/**
 * Extends an existing property's property to the api
 */
function proxy<E extends HTMLElement>(proxySelector: ProxySelectorFn<E>, propertyName: string, customProperty, transform?): Descriptor<E> {
	transform = transform ? transform(propertyName) : defaultTransform(propertyName)

	console.log(arguments)
	return {
		get: (host) => transform.get(proxySelector(host)[propertyName]),
		set: (host, value, last) => {
			value = customProperty.set(host, value, last)
			return transform.set(proxySelector(host), value)
		},
		connect: customProperty.connect,
	}
}

/**
 * Parses the property as JSON
 * @param defaultValue the default value for the property
 * @param connect connect descriptor fallback
 */
function jsonProperty<E extends HTMLElement>(defaultValue: any, connect): Property<E> {
	const parse = (value) => {
		console.log(value, typeof value)
		try {
			return (value && value !== '') ? JSON.parse(value.replace(/'/gim, '"')) : defaultValue
		} catch (ex) {
			console.error('[jsonProperty] Error parsing JSON. \n\t', ex)
			return null
		}
	}

	return property(parse, connect)
}

export {
	proxy,
	jsonProperty,
}
