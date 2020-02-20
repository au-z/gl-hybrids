// if (process.env.NODE_ENV !== "production") module.hot.accept()
import 'font-awesome/css/font-awesome.css'
import style from 'src/style/main.styl'
import {html, define} from 'hybrids'
import * as glElements from 'src/gl'
import * as THREE from 'three'
window.THREE = THREE

define('app-root', {
	render: () => html`
		<gl-canvas id="gl-canvas" width="100vw" height="100vh" clear-color="0x653f3f">
			<gl-record selector="canvas#gl-canvas"></gl-record>
			<gl-scene-outliner></gl-scene-outliner>

			<gl-camera name="Camera" position="[1, 0.7, 2.4]" type="perspective">
				<gl-orbit-control></gl-orbit-control>
				<!-- <gl-camera-tools></gl-camera-tools> -->
			</gl-camera>

			<gl-three-point-light intensity="1"></gl-three-point-light>

			<gl-mesh bbox scale="[0.5, 0.5, 0.5]">
				<gl-geometry></gl-geometry>
				<gl-material type="matcap" color="0xffffff">
					<gl-texture type="matcap"></gl-texture>
				</gl-material>
			</gl-mesh>

			<gl-mesh bbox rotation="[4, 2, -1]" scale="[0.25, 0.25, 0.25]">
				<gl-geometry></gl-geometry>
				<gl-material type="matcap" color="0xffffff">
					<gl-texture type="matcap"></gl-texture>
				</gl-material>
			</gl-mesh>

			<gl-mesh bbox rotation="[1, 0, -1]">
				<gl-geometry></gl-geometry>
				<gl-material type="matcap" color="0xffffff">
					<gl-texture type="matcap"></gl-texture>
				</gl-material>
			</gl-mesh>

			<!-- <gl-model name="helmet" type="gltf" src="/static/models/flight-helmet/FlightHelmet.gltf" position="[0, 0, 0]" bbox></gl-model> -->
		</gl-canvas>
	`.define({...glElements}),
})

const globalStyle = document.createElement('style')
globalStyle.innerHTML = style.toString()
document.head.appendChild(globalStyle)
