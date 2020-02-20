import GlPointLight from './gl-point-light'
import GlDirectionalLight from './gl-directional-light'
import GlHemisphereLight from './gl-hemisphere-light'
import GlThreePointLight from './gl-three-point-light'
import { GlObject3D } from '../base/glObject'

interface GlLight extends GlObject3D {
	helper: boolean
	[key: string]: any
}

export {
	GlLight,
	GlPointLight,
	GlDirectionalLight,
	GlHemisphereLight,
	GlThreePointLight,
}
