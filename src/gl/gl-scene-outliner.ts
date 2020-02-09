import style from './gl-scene-outliner.styl'
import { Hybrids, html} from 'hybrids'
import gl from 'src/gl/base/glContext'

function mapIcon(type) {
	switch(type.toUpperCase()) {
		case 'PERSPECTIVECAMERA':
		case 'ISOMETRICCAMERA': return 'fa-video-camera'
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

const assetType = (a) => a?.constructor?.name || a?.type || typeof a

const showableChildren = (a) => ![
	'HEMISPHERELIGHTHELPER',
	'DIRECTIONALLIGHTHELPER',
	'POINTLIGHTHELPER',
].includes(assetType(a).toUpperCase())

const renderChildren = (arr) => html`
	<ul class="assets">${arr.map((a) => html`
		<li class="asset" onclick="${logAsset.bind(null, a)}">
			${renderAsset(a)}
		</li>
		${a.children?.length > 0 && showableChildren(a) && renderChildren(a.children)}
	`)}</ul>`

const renderCamera = (cam) => html`
	<div class="camera-asset" onclick="${logAsset.bind(null, cam)}">
		${cam && renderAsset(cam)}
	</div>`

const renderAsset = (a) => html`
	<i class="fa ${mapIcon(assetType(a))}"></i>
	<span class="name">
		${a.name || assetType(a)}
	</span>&nbsp;
	${!!a.name && html`<span class="type">
		(${assetType(a)})
	</span>`}
`

interface GlSceneOutliner extends HTMLElement {
	[key: string]: any
}

export default {
	...gl,
	render: ({scene, camera}) => html`
		<style>${style.toString()}</style>
		<div class="scene-outliner">
			<header>
				<div onclick="toggleClose"><i class="fa fa-times"></i></div>
			</header>
			${renderCamera(camera)}
			${renderChildren(scene.children)}
		</div>
	`,
} as Hybrids<GlSceneOutliner>
