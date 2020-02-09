import {Hybrids, html} from 'hybrids'

interface GlThreePointLight extends HTMLElement {
	[key: string]: any
}

export default {
	color: 0xffffff,
	intensity: 1,
	helper: false,
	render: ({color, intensity, helper}) => html`
		<gl-directional-light color="${color}" intensity="${intensity}"
			position="[-2, 0.5, 0.5]"
			helper="${helper}"
		></gl-directional-light>
		<gl-directional-light color="${color}" intensity="${intensity * 1.8}"
			position="[1, 1, 1.4]"
			helper="${helper}"
		></gl-directional-light>
		<gl-directional-light color="${color}" intensity="${intensity * 1.5}"
			position="[0, 0, -2]"
			helper="${helper}"
		></gl-directional-light>
	`,
} as Hybrids<GlThreePointLight>

export {
	GlThreePointLight,
}
