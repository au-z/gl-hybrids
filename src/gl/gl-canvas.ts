import {Hybrids, html} from 'hybrids'
import GL from 'src/gl/GL'

function updateRenderer({canvas, renderer}: GlCanvas) {
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false)
}

function animate(dt, host) {
  requestAnimationFrame((dt) => animate(dt, host))
  host.updater.run()
  host.renderer.render(host.scene, host.camera)
}

const setCamera = (host, e) => host.camera = e.detail

const addToScene = ({updater, scene}, e) => {
  scene.addInvalidate(e.detail)
  if(e.detail.type === 'Mesh') {
    console.log("WG")
    updater.register(((mesh) => {
      mesh.rotation.x += 0.04
      mesh.rotation.y -= Math.random() * 0.06
    }).bind(null, e.detail))
  }
}

interface GlCanvas extends HTMLElement {
  [key: string]: any
}

export default {
  id: '',
  width: '300px',
  height: '150px',
  clearColor: 0x000000,
  canvas: {
    get: ({render}) => render().querySelector('canvas'),
    connect: (host, key) => window.addEventListener('resize', () => updateRenderer(host))
  },
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
    <slot onload-camera="${setCamera}"
      onscene-add="${addToScene}"></slot>
  `,
} as Hybrids<GlCanvas>
