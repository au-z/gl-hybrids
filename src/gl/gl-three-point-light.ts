import {Hybrids, html} from 'hybrids'

interface GlThreePointLight extends HTMLElement {
	[key: string]: any
}

export default {
	color: 0xffffff,
	intensity: 1,
	helper: false,
	render: ({color, intensity}) => html`
		<gl-directional-light color="${color}" intensity="${intensity}"
			position="[-1, 0.5, 2]" helper/>
		<gl-directional-light color="${color}" intensity="${intensity}"
			position="[1, 1, 1.4]" helper/>
		<gl-directional-light color="${color}" intensity="${intensity * 2}"
			position="[0, 0, -2]" helper/>
	`,
	onRender: ({render, helper}) => {
		let target = render()
		Array.from(target.querySelector('gl-point-light')).forEach((el) => {
			(el as GlThreePointLight).helper = helper
		})
	},
} as Hybrids<GlThreePointLight>

export {
	GlThreePointLight,
}
