// if (process.env.NODE_ENV !== "production") module.hot.accept()
import 'font-awesome/css/font-awesome.css'
import style from './style/main.styl'
import {html, define} from 'hybrids'
import * as glElements from './gl'

define("app-root", {
	render: () => html`
		<gl-canvas id="gl-canvas" width="100vw" height="100vh" clear-color="0x35383a">
			<gl-scene-outliner></gl-scene-outliner>
			<gl-record filename="TODO"></gl-record>

			<gl-camera name="camera.001" position="[1.5, 1.4, 5]"
				type="perspective"
				fov="75">
				<gl-orbit-control></gl-orbit-control>
				<gl-camera-tools></gl-camera-tools>
			</gl-camera>

			<gl-three-point-light intensity="3" helper></gl-three-point-light>

			<gl-mesh position="[-2, 0, 0]" castShadow bbox>
				<gl-material></gl-material>
			</gl-mesh>

			<gl-model type="gltf" src="/static/models/scifi-helmet/SciFiHelmet.gltf" position="[1, 0, 0]" bbox></gl-model>
		</gl-canvas>
	`.define({...glElements}),
})

const globalStyle = document.createElement('style')
globalStyle.innerHTML = style.toString()
document.head.appendChild(globalStyle)
