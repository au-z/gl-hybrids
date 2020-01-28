import { Hybrids, property, html } from "hybrids";

interface OutlinerAssets extends HTMLElement {
	[key: string]: any
}

export default {
	assets: property([]),
	render: ({assets}) => html`
		<ul class="assets">${assets.map((asset) => html`
			<li>${JSON.stringify(asset)}</li>
		`)}</ul>
	`
} as Hybrids<OutlinerAssets>
