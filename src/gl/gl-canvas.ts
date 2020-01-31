import {Hybrids, html} from 'hybrids'
import GL from './GL'

function animate(dt, host) {
  requestAnimationFrame((dt) => animate(dt, host))
  host.updater.run()
  host.renderer.render(host.scene, host.camera)
}

function setCamera(host, e) {
  console.log(host, e)
  host.camera = e.detail
}

interface GlCanvas extends HTMLElement {
  [key: string]: any
}

export default {
  width: '300px',
  height: '150px',
  clearColor: 0x000000,
  canvas: ({render}) => render().querySelector('canvas.gl-canvas'),
  camera: {
    observe: (host, camera, previousValue) => {
      if(camera != null && previousValue == null) animate(0, host)
    },
  },
  renderer: GL.Renderer,
  updater: GL.Updater,
  scene: GL.Scene,
  outline: [],
  render: ({width, height}) => html`
    <canvas class="gl-canvas" style="${{width, height}}"></canvas>
    <slot onload-camera="${setCamera}"></slot>
  `,
} as Hybrids<GlCanvas>
