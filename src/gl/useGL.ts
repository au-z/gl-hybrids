import {parent} from 'hybrids'
import GlCanvas from './gl-canvas'

const useGL = {
  glCanvas: parent(GlCanvas),
  gl: ({glCanvas: {gl}}) => gl,
}

export default useGL
