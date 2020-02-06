import style from './gl-scene-outliner.styl'
import { Hybrids, html } from "hybrids";
import gl from './base/glContext'

import OutlinerAssets from './outliner-assets'

interface GlSceneOutliner extends HTMLElement {
	[key: string]: any
}

export default {
	...gl,
	render: ({gl: {scene, outline}}) => html`
		<style>${style.toString()}</style>
		<div class="scene-outliner">
			${JSON.stringify(outline)}
			<outliner-assets assets="${outline}"></outliner-assets>
		</div>
	`.define({OutlinerAssets}),
} as Hybrids<GlSceneOutliner>
