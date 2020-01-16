if (process.env.NODE_ENV !== "production") module.hot.accept();

import {html, define} from 'hybrids'
import GlCanvas from './gl-canvas.ts'
import GlMesh from './gl-mesh.ts'

import style from './style/main.styl'

define("app-root", {
  render: () => html`
    <gl-canvas width="100vw" height="100vh" clear-color="0x353843">
      <gl-mesh name="cube"></gl-mesh>
    </gl-canvas>
  `.define({ GlCanvas, GlMesh})
});

const globalStyle = document.createElement('style')
globalStyle.innerHTML = style.toString()
document.head.appendChild(globalStyle)