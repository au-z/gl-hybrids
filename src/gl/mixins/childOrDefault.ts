import {Hybrids, children, dispatch} from 'hybrids'

export default function childOrDefault(hybrids: Hybrids<HTMLElement>, property: string, selector) {
	const _children = `_c_${property}`
	return {
		[_children]: children(hybrids),
		[property]: {
			get: (host) => host[_children]?.[0]?.[property],
			observe: (host, value) => {
				if(!value || !selector(host)) return
				selector(host)[property] = value
				dispatch(host, 'update', {detail: {property}})
			},
		},
	}
}