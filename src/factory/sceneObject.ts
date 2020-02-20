import {Descriptor, dispatch} from 'hybrids'

export default function sceneObject<E extends HTMLElement>({get, set, connect, observe}: Descriptor<E>) {
	return {
		get,
		set,
		connect: (host, key, invalidate) => {
			host[key] && dispatch(host, 'scene-add', {detail: host[key], bubbles: true, composed: true})
			return connect && connect(host, key, invalidate)
		},
		observe,
	}
}
