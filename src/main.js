// if (process.env.NODE_ENV !== "production") module.hot.accept()
import 'font-awesome/css/font-awesome.css'
import style from 'src/style/main.styl'
import {html, define} from 'hybrids'
import * as glElements from 'src/gl'

define("app-root", {
	render: () => html`
		<gl-canvas id="gl-canvas" width="100vw" height="100vh" clear-color="0x35383a">
			<gl-record selector="canvas#gl-canvas"></gl-record>
			<gl-scene-outliner></gl-scene-outliner>

			<gl-camera name="Camera" position="[1, 0.7, 2.4]" type="perspective">
				<gl-orbit-control></gl-orbit-control>
				<!-- <gl-camera-tools></gl-camera-tools> -->
			</gl-camera>

			<gl-three-point-light intensity="2" helper></gl-three-point-light>

			<gl-mesh bbox>
				<gl-material></gl-material>
			</gl-mesh>

			<!-- <gl-model name="helmet" type="gltf" src="/static/models/flight-helmet/FlightHelmet.gltf" position="[0, 0, 0]" bbox></gl-model> -->
		</gl-canvas>
	`.define({...glElements}),
})

const globalStyle = document.createElement('style')
globalStyle.innerHTML = style.toString()
document.head.appendChild(globalStyle)
