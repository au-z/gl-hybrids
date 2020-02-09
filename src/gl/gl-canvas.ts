import {Hybrids, html} from 'hybrids'
import GL from 'src/gl/GL'

function animate(dt, host) {
  requestAnimationFrame((dt) => animate(dt, host))
  host.updater.run()
  host.renderer.render(host.scene, host.camera)
}

const setCamera = (host, e) => host.camera = e.detail

const addToScene = ({scene}, e) => scene.addInvalidate(e.detail)

interface GlCanvas extends HTMLElement {
  [key: string]: any
}

export default {
  id: '',
  width: '300px',
  height: '150px',
  clearColor: 0x000000,
  canvas: ({render}) => render().querySelector('canvas'),
  camera: {
    observe: (host, camera, previousValue) => {
      if(camera != null && previousValue == null) animate(0, host)
    },
  },
  renderer: GL.Renderer,
  updater: GL.Updater,
  scene: {
    connect: (host, key, invalidate) => {
      host[key] = GL.Scene(host as any, invalidate)
      return () => {
        host[key].dispose()
      }
    },
  },
  render: ({id, width, height}) => html`
    <canvas id="${id}" style="${{width, height}}"></canvas>
    <slot onload-camera="${setCamera}" onscene-add="${addToScene}"></slot>
  `,
} as Hybrids<GlCanvas>
