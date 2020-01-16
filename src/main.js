if (process.env.NODE_ENV !== "production") module.hot.accept();

import {html, define} from 'hybrids'
import GlCanvas from './gl-canvas.ts'
import GlMesh from './gl-mesh.ts'

define("app-root", {
  render: () => html`
    <gl-canvas width="800px" height="500px">
      <gl-mesh></gl-mesh>
    </gl-canvas>
  `.define({ GlCanvas, GlMesh})
});