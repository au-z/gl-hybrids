import { Descriptor, property } from 'hybrids'

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
 * @param property the sub-property to proxy
 * @param defaultValue the default value of the property
 * @param get transforms from the stored representation
 * @param set transforms to the stored representation
 */
function proxy<E extends HTMLElement>(proxySelector: ProxySelectorFn<E>, propertyName: string, defaultValue: any, transform?): Descriptor<E> {
	transform = transform ? transform(propertyName) : defaultTransform(propertyName)

	return {
		...property(defaultValue),
		get: (host) => {
			const proxy = proxySelector(host)
			return proxy && transform.get(proxy[propertyName])
		},
		set: (host, value) => {
			const proxy = proxySelector(host)
			return proxy && transform.set(proxy, value)
		},
	}
}

export {
	proxy
}
