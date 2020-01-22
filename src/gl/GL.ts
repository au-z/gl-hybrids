import {WEBGL} from 'three/examples/jsm/WebGL.js'
import * as THREE from 'three'

function GL() {
  let instance = null

  let renderer, camera, scene, updater

  function animate(dt, updater) {
    requestAnimationFrame((dt) => animate(dt, updater))
    updater.run()
    renderer.render(scene, camera)
  }

  function onAttach({name, asset}) {
    camera = asset
    console.log('Registering camera: ', camera)
    animate(null, updater)
  }

  function Renderer(canvas) {
    const context = canvas.getContext('webgl2', {alpha: false})
    const renderer = new THREE.WebGLRenderer({canvas, context})

    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false)
    window.addEventListener('resize', () => {
      renderer.setSize(canvas.clientWidth, canvas.clientHeight, false)
    })

    return renderer
  }

  function Updater() {
    let fns = []

    return {
      register: (fn) => fns.push(fn),
      run: () => fns.forEach((fn) => fn()),
    }
  }

  function init({canvas, clearColor}) {
    if(!WEBGL.isWebGL2Available()) {
      document.body.appendChild(WEBGL.getWebGLErrorMessage())
    }

    renderer = Renderer(canvas)

    scene = new THREE.Scene()
    scene.background = new THREE.Color(clearColor)

    updater = Updater()

    instance = {
      camera,
      canvas,
      onAttach, // camera attach
      onUpdate: updater.register,
      renderer,
      scene,
    }

    return instance
  }

  return {
    getInstance: (host) => instance ? instance : init(host)
  }
}

export default GL()