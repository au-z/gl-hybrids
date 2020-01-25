import { property, Hybrids, html } from 'hybrids'
import * as THREE from 'three'
import { mapToEnum } from '../util/Map'

enum PRIMITIVE {
  box = 'BOX',
  sphere = 'SPHERE',
  plane = 'PLANE',
  cone = 'CONE',
}

interface GlGeometry extends HTMLElement {
  [key: string]: any
}

export default {
  primitive: property(mapToEnum.bind(null, PRIMITIVE, PRIMITIVE.box)),
  geometry: () => new THREE.TorusGeometry(0.5, 0.2, 32, 32),
  render: ({geometry}) => html`<div>${JSON.stringify(geometry)}</div>`
} as Hybrids<GlGeometry>
