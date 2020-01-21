import {parent, Hybrids} from 'hybrids'
import GlCanvas from './gl-canvas'

interface UseGl extends HTMLElement {
  [key: string]: any
}

export default {
  parent: parent(GlCanvas),
  gl: ({parent: {gl}}) => gl,
  canvas: ({gl}) => gl.canvas,
} as Hybrids<UseGl>
