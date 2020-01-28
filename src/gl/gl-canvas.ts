import GL from './GL'
import {Hybrids, html, property} from 'hybrids'
import {WebGLRenderer, Scene, Color} from 'three'

/**
 * Creates and removes an event listener for document resize
 * @param onResize callback function (host, event) => {...}
 * @return factory {connect} hybrid descriptor
 */
const onWindowResize = (onResize) => ({
  connect: (host) => {
    window.addEventListener('resize', (e) => onResize(host, e))
    return () => window.removeEventListener('resize', (e) => onResize(host, e))
  },
})

function animate(dt, host) {
  requestAnimationFrame((dt) => animate(dt, host))
  host.updater.run()
  host.renderer.render(host.scene, host.camera)
}

interface GlCanvas extends HTMLElement {
  [key: string]: any
}

function setCamera(host, e) {
  console.log(host, e)
  host.camera = e.detail
}

function onAttach(host, {name, asset}) {
  host.camera = asset
  console.log('Registering camera: ', host.camera)
}

export default {
  width: '300px',
  height: '150px',
  clearColor: 0x000000,
  canvas: ({render}) => render().querySelector('canvas.gl-canvas'),
  renderer: ({canvas, clearColor}) => {
    const context = canvas.getContext('webgl2', {alpha: false})
    const renderer = new WebGLRenderer({canvas, context})
    renderer.clearColor = clearColor
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false)
    return renderer
  },
  updater: () => {
    const fns = []

    return {
      register: (fn) => fns.push(fn),
      run: () => fns.forEach((fn) => fn()),
    }
  },
  camera: {
    observe: (host, camera, previousValue) => {
      if(camera != null && previousValue == null) animate(0, host)
    },
  },
  outline: property([]),
  scene: ({clearColor}, scene = new Scene()) => {
    scene.background = new Color(clearColor)
    return scene
  },
  gl: (host) => {
    return {
      camera: host.camera,
      canvas: host.canvas,
      renderer: host.renderer,
      scene: host.scene,
      outline: host.outline,
      onAttach: onAttach.bind(null, host),
      onUpdate: host.updater.register,
    }
  },

  render: ({width, height}) => html`
    <canvas class="gl-canvas" style="${{width, height}}"></canvas>
    <slot onload-camera="${setCamera}"></slot>
  `,
} as Hybrids<GlCanvas>
