// if (process.env.NODE_ENV !== "production") module.hot.accept();

import style from './style/main.styl'

import {html, define} from 'hybrids'
import * as glElements from './gl'
import ProxyTest from './proxy-test'

define("app-root", {
	render: () => html`
		<gl-canvas id="gl-canvas" width="100vw" height="100vh" clear-color="0x35383a">
			<!-- <gl-scene-outliner></gl-scene-outliner>
			<gl-record filename="TODO"></gl-record> -->
			<gl-camera name="camera.001" type="perspective" fov="75" position="${[1.02, 0.22, 2.81]}">
				<gl-camera-tools></gl-camera-tools>
				<gl-orbit-control></gl-orbit-control>
			</gl-camera>
			<!-- <gl-point-light name="point" position="${[0.5, 0, -3]}" intensity="3" decay="2" helper></gl-point-light>
			<gl-directional-light position="${[2, 3, 3]}" intensity="5" helper></gl-directional-light>
			<gl-directional-light position="${[-2, 1, 3]}" intensity="4" helper></gl-directional-light> -->

			<!-- <gl-model type="gltf" src="/static/models/scifi-helmet/SciFiHelmet.gltf" position="${[0, 0, 0]}"></gl-model> -->
			<!-- <gl-model type="gltf" src="/static/models/flight-helmet/FlightHelmet.gltf"></gl-model> -->
		</gl-canvas>
	`.define({...glElements, ProxyTest}),
})

const globalStyle = document.createElement('style')
globalStyle.innerHTML = style.toString()
document.head.appendChild(globalStyle)