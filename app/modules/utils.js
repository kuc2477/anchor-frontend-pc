import {
  FLOW_MAX,
  FLOW_MIN,
  FLOW_LINE_RATIO,
  FLOW_MIN_WIDTH,
  FLOW_MAX_WIDTH
} from '../constants/numbers'


export function parseCookie(cookies, name) {
  const value = '; ' + cookies
  const parts = value.split('; ' + name + '=')
  if (parts.length === 2) {
    return parts.pop().split(';').shift()
  }
  return null
}

export function flowtype(className) {
  // TODO: NOT IMPLEMENTED YET
  return

  // flowtype elements
  _flowtype(document.getElementsByClassName(className))

  function _flowtype(elements) {
    [].forEach.call(elements, (element) => {
      flowtypeElement(element, {
        maxWidth: FLOW_MAX_WIDTH,
        minWidth: FLOW_MIN_WIDTH,
        lineRatio: FLOW_LINE_RATIO,
        min: FLOW_MIN,
        max: FLOW_MAX
      })
    })
  }
}

export default {
  parseCookie,
  flowtype
}
