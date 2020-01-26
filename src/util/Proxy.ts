import { Vector3, Euler } from 'three'
import { Hybrids, Descriptor } from 'hybrids'

const Translate = {
  vec3: [
    ({x, y, z}) => [x, y, z],
    (vector3: Vector3, [x, y, z]) => vector3.set(x, y, z),
  ],
  euler: [
    ({x, y, z, order}) => [x, y, z, order],
    (euler: Euler, [x, y, z, order = 'XYZ']) => euler.set(x, y, z, order),
  ],
}

interface PropertySelectorFn<E extends HTMLElement> {
  (host: E): any;
}

interface SetTransformFn {
  (property: any, value: any): any;
}

/**
 * Extends an existing property's property to the api
 * @param getProperty a getter returning the property to project. The returned property must be an object
 * @param sub the sub-property to proxy
 * @param get transforms from the stored representation
 * @param set transforms to the stored representation
 */
function proxy<E extends HTMLElement>(
  getProperty: PropertySelectorFn<E>, sub: string, get?: Function, set?: SetTransformFn
): Descriptor<E> {
  let property = null
  return {
    get: (host) => {
      const property = getProperty(host)
      return property ? (get ? get(property[sub]) : property) : null
    },
    set: (host, value) => {
      const property = getProperty(host)
      return set ? set(property[sub], value) : ((_value) => {
        console.log(property[sub], _value)
        property[sub] = _value
        return property[sub]
      })(value)
    },
    connect: (host) => {
      property = getProperty(host)
      return () => {}
    },
  }
}

export default proxy

export {
  proxy,
  Translate,
}