import style from './gl-scene-outliner.styl'
import { Hybrids, html} from 'hybrids'
import gl from './base/glContext'

function typeToIcon(type) {
	switch(type.toUpperCase()) {
		case 'DIRECTIONALLIGHT':
		case 'HEMISPHERELIGHT':
		case 'POINTLIGHT': return 'fa-lightbulb-o'
		case 'BOXHELPER':
		case 'HEMISPHERELIGHTHELPER':
		case 'DIRECTIONALLIGHTHELPER':
		case 'POINTLIGHTHELPER': return 'fa-bullseye'
		case 'OBJECT3D':
		case 'MESH': return 'fa-cube'
		case 'SCENE': return 'fa-cubes'
		default: return 'fa-question'
	}
}

const logAsset = (a) => console.log(a)
const assetType = (a) => a.constructor?.name || a.type || typeof a

const renderChildren = (arr) => html`
	<ul class="assets">${arr.map((a) => html`
		<li onclick="${logAsset.bind(null, a)}">
			<i class="fa ${typeToIcon(assetType(a))}"></i>
			<span>${assetType(a)}</span>
		</li>
		${a.children?.length > 0 && renderChildren(a.children)}
	`)}</ul>`

interface GlSceneOutliner extends HTMLElement {
	[key: string]: any
}

export default {
	...gl,
	render: ({scene}) => html`
		<style>${style.toString()}</style>
		<div class="scene-outliner">
			${renderChildren(scene.children)}
		</div>
	`,
} as Hybrids<GlSceneOutliner>
