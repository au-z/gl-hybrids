import * as THREE from 'three'

function GL() {
  let instance
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

  function init(host, {canvas}) {
    renderer = new GL.prototype.Renderer(host, {canvas})

    scene = new THREE.Scene()
    scene.background = new THREE.Color(host.clearColor)

    updater = new GL.prototype.Updater()

    window.addEventListener('resize', () => {
      renderer.setSize(canvas.clientWidth, canvas.clientHeight, false)
    })

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
    getInstance: (host, {canvas}) => instance ? instance : init(host, {canvas}),
  }
}

GL.prototype.Renderer = (host, {canvas}) => {
  const renderer = new THREE.WebGLRenderer({canvas})
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false)

  return renderer
}

GL.prototype.Updater = () => {
  let fns = []

  return {
    register: (fn) => fns.push(fn),
    run: () => fns.forEach((fn) => fn()),
  }
}

export default GL()