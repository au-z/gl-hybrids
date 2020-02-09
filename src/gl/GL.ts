import * as THREE from 'three'

function HybridsScene(invalidate) {
  THREE.Scene.apply(this, arguments)
  this.invalidate = invalidate
}

HybridsScene.prototype = Object.create(THREE.Scene.prototype)
HybridsScene.prototype.addInvalidate = function(obj) {
  const result = this.add(obj)
  this.invalidate()
  return result
}
HybridsScene.prototype.constructor = THREE.Scene

function Scene({clearColor}, invalidate) {
  const scene = new HybridsScene(invalidate)
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
