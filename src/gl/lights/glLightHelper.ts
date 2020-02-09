import { Hybrids } from 'hybrids'

export default function(Ctor) {
	return {
		helper: false,
		lightHelper: {
			get: ({helper, color, light}, value) => helper && new Ctor(light, 0.3, color),
			observe: (host, value, last) => {
				if(host.helper) host.light.attach(value)
			}
		},
	} as Hybrids<HTMLElement>
}
