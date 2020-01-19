import {parent} from 'hybrids'
import GlCanvas from './gl-canvas'

const useGL = {
  parent: parent(GlCanvas),
  gl: ({parent: {gl}}) => gl,
  canvas: ({gl}) => gl.canvas,
}

export default useGL
