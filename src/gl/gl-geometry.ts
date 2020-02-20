import { property, Hybrids, html } from 'hybrids'
import * as THREE from 'three'
import { mapToEnum } from 'src/util/Map'

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
  geometry: () => new THREE.TorusGeometry(0.5, 0.2, 64, 64),
} as Hybrids<GlGeometry>
