import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { Hybrids, property, Descriptor, html } from "hybrids"
import { mapToEnum } from "../util/Map"
import useGL from "./useGL"

enum MODEL_TYPE {
  gltf = 'gltf'
}

const onError = (err) => console.error(err)

const loadModel = ({gl, loader, src}) => {
  return new Promise((res, rej) => loader.load(src, (gltf) => {
    gl.scene.add(gltf.scene)

    console.log('Scene', gltf.scene)
    gl.onUpdate(() => {
      gltf.scene.rotation.y += 0.004
    })

    return res(gltf)
  }, null, onError))
}

interface GlModel extends HTMLElement {[key: string]: any | object}

export default {
  ...useGL,
  name: ({src}) => src.split('/')?.slice(-1)[0],
  position: [0, 0, 0],
  type: property(mapToEnum.bind(null, MODEL_TYPE, MODEL_TYPE.gltf)),
  src: '',
  loader: () => new GLTFLoader(),
  model: loadModel,
  render: ({model, name}) => html`<meta data-name="${name}">${JSON.stringify(model)}</meta>`
} as unknown as Hybrids<GlModel>
