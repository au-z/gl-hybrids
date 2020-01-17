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

const onAttach = ({gl}, e) => gl.onAttach(e.detail)

const GlCanvas: Hybrids<HTMLElement> | any = {
  width: '300px',
  height: '150px',
  clearColor: 0x000000,
  canvas: ({render}) => render().querySelector('canvas.gl-canvas'),
  gl: (host) => GL.getInstance(host, {canvas: host.canvas}),
  render: ({width, height}) => html`
    <canvas class="gl-canvas" style="${{width, height}}"></canvas>
    <slot ongl-attach="${onAttach}"></slot>
  `,
}

export default GlCanvas
