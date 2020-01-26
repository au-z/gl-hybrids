// if (process.env.NODE_ENV !== "production") module.hot.accept();

import style from './style/main.styl'

import {html, define} from 'hybrids'
import * as glElements from './gl'
import ProxyTest from './proxy-test'

define("app-root", {
	render: () => html`
		<gl-canvas id="gl-canvas" width="100vw" height="100vh" clear-color="0x35383a">
			<gl-record filename="TODO"></gl-record>
			<gl-camera name="camera.001" type="perspective" fov="75" position="${[2, 1, 2]}">
				<gl-camera-tools></gl-camera-tools>
				<gl-orbit-control></gl-orbit-control>
			</gl-camera>
			<gl-point-light name="point" position="${[0.5, 0, -3]}" intensity="3" distance="0" decay="1" helper></gl-point-light>
			<gl-directional-light position="${[2, 3, 5]}" intensity="5" helper></gl-directional-light>
			<!-- <gl-directional-light position="${[-2, 1, 3]}" intensity="4" helper></gl-directional-light> -->

			<gl-model type="gltf" src="/static/models/scifi-helmet/SciFiHelmet.gltf" position="${[0, 0, 0]}"></gl-model>
			<!-- <gl-model type="gltf" src="/static/models/flight-helmet/FlightHelmet.gltf"></gl-model> -->
		</gl-canvas>
	`.define({...glElements, ProxyTest}),
})

const globalStyle = document.createElement('style')
globalStyle.innerHTML = style.toString()
document.head.appendChild(globalStyle)