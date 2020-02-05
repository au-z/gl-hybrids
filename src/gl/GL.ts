import * as THREE from 'three'

function Scene({clearColor}, value) {
  if(value) return value
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(clearColor)
  // scene.add(new THREE.AxesHelper(1))
  return scene
}

function Renderer({canvas, clearColor}) {
  const context = canvas.getContext('webgl2', {alpha: false})
  const renderer = new THREE.WebGLRenderer({canvas, context})
  renderer.clearColor = clearColor
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false)
  return renderer
}

function Updater() {
  const fns = []

  return {
    register: (fn) => fns.push(fn),
    run: () => fns.forEach((fn) => fn()),
  }
}

export default {
  Renderer,
  Updater,
  Scene,
}
