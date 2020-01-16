import * as THREE from 'three'

const num = (str) => parseFloat(/\d+/.exec(str)?.[0] || '0')

export interface Context {
  init,
  scene,
}

function GL(): Context {
  let renderer, camera, scene

  function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }

  function init(host) {
    renderer = new GL.prototype.Renderer(host.width, host.height)
    host.shadowRoot.appendChild(renderer.domElement)

    camera = new GL.prototype.Camera(num(host.width), num(host.height))

    scene = new THREE.Scene()

    camera.position.z = 5

    animate()

    return {
      scene,
      renderer,
      camera,
    }
  }

  return {
    init,
  } as Context
}

GL.prototype.Camera = (width: number, height: number) =>
  new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)

GL.prototype.Renderer = (width: string, height: string) => {
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(num(width), num(height))
  renderer.domElement.style.width = width
  renderer.domElement.style.height = height
  return renderer
}

export default GL()