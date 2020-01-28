import {parent, Hybrids} from 'hybrids'
import GlCanvas from './gl-canvas'

interface GlContext extends HTMLElement {
  [key: string]: any
}

export default {
  _parent: parent(GlCanvas),
  camera: ({_parent: {camera}}) => camera,
  canvas: ({_parent: {canvas}}) => canvas,
  scene: ({_parent: {scene}}) => scene,
  outline: ({_parent: {outline}}) => outline,
} as Hybrids<GlContext>

export {
  GlContext,
}
