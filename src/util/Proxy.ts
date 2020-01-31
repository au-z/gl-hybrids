import { Descriptor, property, Property } from 'hybrids'

const defaultTransform = (propertyName) => ({
	get: (value) => value,
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
 * @param proxySelector a getter returning the property to project. The returned property must be an object
 * @param propertyName the sub-property to proxy
 * @param property the default value of the property
 * @param get transforms from the stored representation
 * @param set transforms to the stored representation
 */
function proxy<E extends HTMLElement>(proxySelector: ProxySelectorFn<E>, propertyName: string, customProperty, transform?): Descriptor<E> {
	transform = transform ? transform(propertyName) : defaultTransform(propertyName)

	return {
		get: (host) => {
			const proxy = proxySelector(host)
			return proxy && transform.get(proxy[propertyName])
		},
		set: (host, value, last) => {
			value = customProperty.set(host, value, last)
			const proxy = proxySelector(host)
			return proxy && transform.set(proxy, value)
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
