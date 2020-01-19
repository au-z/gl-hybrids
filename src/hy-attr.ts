import { html, property } from "hybrids";

const HyAttr = {
  bool: false,
  num: 0,
  str: '',
  arr: [0, 0, 0],
  obj: property((input = {}) => input),

  render: ({bool, num, str, arr, obj}) => html`<div>
    <span>${typeof bool}: ${bool}</span><br>
    <span>${typeof num}: ${num}</span><br>
    <span>${typeof str}: ${str}</span><br>
    <span>${typeof arr}: ${JSON.stringify(arr)}</span><br>
    <span>${typeof obj}: ${JSON.stringify(obj)}</span><br>
  </div>`
}

export default HyAttr
