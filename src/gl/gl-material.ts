import { Hybrids, html } from 'hybrids'
import * as THREE from 'three'

interface GlMaterial extends HTMLElement {
  [key: string]: any;
}

export default {
  material: () => new THREE.MeshPhongMaterial({color: 0x222222}),
  render: ({material}) => html`<div>${JSON.stringify(material)}</div>`
} as Hybrids<GlMaterial>
