import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { Hybrids, property, html } from "hybrids"
import { mapToEnum } from "../util/Map"
import gl from "./gl-context.base"
import GlAssetFactory from './gl-asset.factory'
import { GlObject3DMixin } from './gl-object'

enum MODEL_TYPE {
  gltf = 'GLTF'
}

const fetchModel = (src) => new Promise((res, rej) =>
  new GLTFLoader().load(src, (gltf) => res(gltf), null, rej))

interface GlModel extends HTMLElement {
  [key: string]: any
}

export default {
  ...gl,
  ...GlObject3DMixin(({model}) => model),
  type: property(mapToEnum.bind(null, MODEL_TYPE, MODEL_TYPE.gltf)),
  src: {
    ...property(''),
    observe: (host, value) => {
      value && fetchModel(value).then(({scene}) => host.model = scene)
    },
  },
  model: GlAssetFactory({}),
} as Hybrids<GlModel>

