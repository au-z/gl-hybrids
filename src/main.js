// if (process.env.NODE_ENV !== "production") module.hot.accept();

import style from './style/main.styl'
import {html, define} from 'hybrids'
import * as glElements from './gl'
import ProxyTest from './proxy-test'

define("app-root", {
	render: () => html`
		<gl-canvas id="gl-canvas" width="100vw" height="100vh" clear-color="0x35383a">
			<!-- <gl-scene-outliner></gl-scene-outliner> -->
			<gl-record filename="TODO"></gl-record>

			<gl-camera name="camera.001" position="[1, 1, 3]"
				type="perspective"
				fov="75">
				<gl-orbit-control></gl-orbit-control>
				<gl-camera-tools></gl-camera-tools>
			</gl-camera>

			<!-- <gl-mesh></gl-mesh> -->

			<gl-hemisphere-light sky-color="0xff000f" position="[0, 3, 0]" helper></gl-hemisphere-light>
			<!-- <gl-point-light position="[1, 0.5, -3]" intensity="10" helper></gl-point-light>
			<gl-directional-light position="[2, 3, 3]" helper></gl-directional-light>
			<gl-directional-light position="[-2, 1, 3]" helper></gl-directional-light> -->

			<gl-model type="gltf" src="/static/models/scifi-helmet/SciFiHelmet.gltf" position="[1, 0, 0]" bbox></gl-model>
			<!-- <gl-model type="gltf" src="/static/models/flight-helmet/FlightHelmet.gltf"></gl-model> -->
		</gl-canvas>
	`.define({...glElements, ProxyTest}),
})

const globalStyle = document.createElement('style')
globalStyle.innerHTML = style.toString()
document.head.appendChild(globalStyle)

setTimeout(() => {
	var obj = document.querySelector('app-root').shadowRoot.querySelector('gl-canvas > gl-mesh')
	// console.log(obj.rotation, obj.position, obj.name, obj.invisible)
})