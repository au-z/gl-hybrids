import {Hybrids, html} from 'hybrids'
import {GlLight} from 'src/gl/lights'

interface GlThreePointLight extends HTMLElement {
	[key: string]: any
}

export default {
	color: 0xffffff,
	intensity: 1,
	helper: false,
	render: ({color, intensity, }) => html`
		<gl-directional-light color="${color}" intensity="${intensity}"
			position="[-2, 0.5, 0.5]"
		></gl-directional-light>
		<gl-directional-light color="${color}" intensity="${intensity * 1.8}"
			position="[1, 1, 1.4]"
		></gl-directional-light>
		<gl-directional-light color="${color}" intensity="${intensity * 1.5}"
			position="[0, 0, -2]"
		></gl-directional-light>
	`,
	_lights: {
		get: ({render}) => render().querySelectorAll('gl-directional-light'),
		observe: (host, lights) => {
			lights && Array.from(lights as Hybrids<GlLight>[]).forEach((el) => el.helper = host.helper)
		},
	},
} as Hybrids<GlThreePointLight>

export {
	GlThreePointLight,
}
