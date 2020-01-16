// import {html} from 'hybrids'
// import style from './style/hybrids.styl'

import GL from './GL'
import {Hybrids, html} from 'hybrids'

/**
 * Creates and removes an event listener for document resize
 * @param onResize callback function (host, event) => {...}
 * @return factory {connect} hybrid descriptor
 */
function onWindowResize(onResize) {
  return {
    connect: (host) => {
      window.addEventListener('resize', (e) => onResize(host, e))
      return () => window.removeEventListener('resize', (e) => onResize(host, e))
    },
  }
}

const GlCanvas: Hybrids<HTMLElement> | any = {
  width: '300px',
  height: '150px',
  clearColor: 0x000000,
  canvas: ({render}) => {
    const target = render()
    return target.querySelector('canvas.gl-canvas')
  },
  gl: (host) => {
    return GL.init(host, {canvas: host.canvas})
  },
  create: {connect: ({width, height}) => console.log(width, height)},
  render: ({width, height}) => html`
    <canvas class="gl-canvas" style="${{width, height}}"></canvas>
  `,
}

export default GlCanvas
