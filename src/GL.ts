import * as THREE from 'three'

const num = (str) => parseFloat(/\d+/.exec(str)?.[0] || '0')

export interface Context {
  init,
  scene,
}

function GL(): Context {
  let renderer, camera, scene, updater

  function animate(dt, updater) {
    requestAnimationFrame((dt) => animate(dt, updater))
    updater.run()
    renderer.render(scene, camera)
  }

  function init(host, {canvas}) {
    renderer = new GL.prototype.Renderer(host, {canvas})

    camera = new GL.prototype.Camera(canvas.clientWidth, canvas.clientHeight)
    camera.position.z = 5

    window.addEventListener('resize', () => {
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()

      renderer.setSize(canvas.clientWidth, canvas.clientHeight, false)
    })

    scene = new THREE.Scene()
    scene.background = new THREE.Color(host.clearColor)

    updater = new GL.prototype.Updater()
    animate(null, updater)

    return {
      scene,
      camera,
      renderer,
      onUpdate: updater.register,
    }
  }

  return {
    init,
  } as Context
}

GL.prototype.Camera = (width: number, height: number) =>
  new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)

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