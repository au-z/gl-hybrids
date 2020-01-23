import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { Hybrids, property, html } from "hybrids"
import { mapToEnum } from "../util/Map"
import {default as gl} from "./gl-context.base"
import GlAssetFactory from './GlAsset.factory'
import * as THREE from 'three'
import { Vector3 } from 'three'

enum MODEL_TYPE {
  gltf = 'GLTF'
}

const onError = (err) => console.error(err)

const loadModel = ({gl, loader, src, position}) => new Promise((res, rej) =>
  loader.load(src, (gltf) => {
    gltf.scene.position.fromArray(position)

    gl.onUpdate(() => {
      gltf.scene.rotation.y += 0.008
    })

    console.log('Scene', gltf.scene)
    return res(gltf.scene)
  }, null, onError)
)

interface GlModel extends HTMLElement {[key: string]: any | object}

export default {
  ...gl,
  position: [0, 0, 0],
  type: property(mapToEnum.bind(null, MODEL_TYPE, MODEL_TYPE.gltf)),
  src: '',
  name: ({src}) => src.split('/')?.slice(-1)[0],
  loader: () => new GLTFLoader(),
  model: GlAssetFactory({get: loadModel as any}),
  render: ({model, name}) => html`<meta data-name="${name}">${JSON.stringify(model)}</meta>`
} as unknown as Hybrids<GlModel>
