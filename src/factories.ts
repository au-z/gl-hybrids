import { dispatch, Descriptor } from "hybrids"

/**
 * Dispatches a bubbling event when the value of the property becomes truthy
 * @param event Name of event to dispatch
 * @param descriptor A plain descriptor
 */
function dispatchOnCreate<E extends HTMLElement>(event: string, {get, set, connect, observe}: Descriptor<E>) {
	return {
		get,
		set,
		connect,
		observe: (host, value, lastValue) => {
			if (observe) observe(host, value, lastValue)
			if(value && !lastValue) {
				dispatch(host, event, {detail: value, bubbles: true})
			}
		},
	}
}

export {
	dispatchOnCreate,
}
