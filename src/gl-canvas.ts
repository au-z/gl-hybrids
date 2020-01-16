// import {html} from 'hybrids'
// import style from './style/hybrids.styl'

import GL from './GL'
import {html, property, Hybrids} from 'hybrids'

const GlCanvas: Hybrids<HTMLElement> | any = {
  width: '100%',
  height: '100%',
  gl: (host) => {
    if(!host.shadowRoot) host.attachShadow({mode: 'open'})
    return GL.init(host)
  },
  render: ({gl}) => {
    console.log(gl)
  },
}

export default GlCanvas
