// if (process.env.NODE_ENV !== "production") module.hot.accept();

import style from './style/main.styl'

import {html, define} from 'hybrids'
import * as glElements from './gl'
import HyAttr from './hy-attr'

define("app-root", {
  render: () => html`
    <gl-canvas width="100vw" height="100vh" clear-color="0x353843">
      <gl-camera type="perspective" fov="75" near="0.1" far="1000" position="${[0, 0, 5]}"></gl-camera>
      <gl-mesh name="cube.01" position="${[0, 2, 0]}"></gl-mesh>
      <gl-mesh name="cube.02" position="${[0, 0, 0]}"></gl-mesh>
      <gl-mesh name="cube.03" position="${[0, -2, 0]}"></gl-mesh>

      <gl-point-light position="${[2, 3, 2]}" intensity="1" distance="0" decay="1"></gl-point-light>
      <gl-point-light position="${[-2, 3, 2]}" intensity="1" distance="0" decay="1"></gl-point-light>
    </gl-canvas>

    <!-- <hy-attr
      bool="true"
      num="1"
      str="foobar"
      arr="${[1, 2, 3]}"></hy-attr> -->
    <br>
  `.define({...glElements, HyAttr})
});

const globalStyle = document.createElement('style')
globalStyle.innerHTML = style.toString()
document.head.appendChild(globalStyle)