import style from './gl-camera-tools.styl'
import { parent, Hybrids, html } from 'hybrids'
import { GlCamera } from '.'

interface GlCameraTools extends HTMLElement {
	[key: string]: any
}

export default {
	glCamera: parent(GlCamera),
	disabled: false,
	camera: ({glCamera: {camera}}) => camera,
	displayType: ({camera}) => {
		const index = (camera.type.toLowerCase()).indexOf('camera')
		return camera.type.substr(0, index).toUpperCase()
	},
	render: ({camera, displayType, disabled}) => html`
		<style>${style.toString()}</style>
		<div class="gl-camera-tools" style="${{display: (!!disabled ? 'none' : 'auto')}}">
			<div class="frustum">
				<div class="info-bar">
					<ul>
						<li>${camera.name}</li>
						<li>${displayType}</li>
					</ul>
				</div>
				<div class="corner top-left"></div>
				<div class="corner top-right"></div>
				<div class="corner bottom-left"></div>
				<div class="corner bottom-right"></div>
			</div>
		</div>
	`,
} as Hybrids<GlCameraTools>
