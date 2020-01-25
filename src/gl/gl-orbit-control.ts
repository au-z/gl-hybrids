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
	render: ({controls}) => html`<meta data-uuid="${controls.object.uuid}"></meta>`
} as Hybrids<GlOrbitControl>
