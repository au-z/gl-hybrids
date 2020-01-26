import { Hybrids, html, dispatch } from 'hybrids'
import { PerspectiveCamera } from 'three'
import { GlObject3DMixin } from './gl/gl-object'
import gl from './gl/gl-context.base'

interface ProxyTest extends HTMLElement {
	[key: string]: any
}

function outputProxies(host) {
	console.log(host.name, host.camera.name, host.position, host.camera.position)
}

export default {
	...gl,
	...GlObject3DMixin(({camera}) => camera),
	camera: (host) => {
		const camera = new PerspectiveCamera(75, 1, 0.1, 1000)
		host.gl.onAttach({name: 'camera', asset: camera})
		return camera
	},
	render: ({name, position, camera}) => html`
		<button onclick="${outputProxies}">Click</button>
		<br>${name} &nbsp;&nbsp;&nbsp; ${camera.name}
		<br>${JSON.stringify(position)} &nbsp;&nbsp;&nbsp; ${JSON.stringify(camera.position)}
	`
} as Hybrids<ProxyTest>