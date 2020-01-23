import { parent, Hybrids, html } from 'hybrids'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import GlCamera from './gl-camera'

interface GlOrbitControl extends HTMLElement {
	[key: string]: any
}

export default {
	parent: parent(GlCamera),
	camera: ({parent: {camera}}) => camera,
	renderer: ({parent: {gl: {renderer}}}) => renderer,
	controls: ({camera, renderer}) => new OrbitControls(camera, renderer.domElement),
	render: ({controls}) => html`<div>${JSON.stringify(controls)}</div>`
} as Hybrids<GlOrbitControl>
