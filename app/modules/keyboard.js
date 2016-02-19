import KeyboardJS from 'keyboardjs'
import history from './history'


function getBoundHandler(combo) {
  const listeners = KeyboardJS._listeners
  for (var i = 0; i < listeners.length; i += 1) {
    var listener = listeners[i]
    if (!combo && !listener.keyCombo || listener.keyCombo.isEqual(combo)) {
      return listeners.splice(i, 1)[0].pressHandler
    }
  }
}

// store handlers that are unbound from keyboard for temp
const TEMP_UNBOUND_HANDLERS = {}


// module methods
export function bind(combo, handler) {
  KeyboardJS.bind(combo, handler)
}
export function bindTemp(combo, handler) {
  // store previous handler
  const previous = getBoundHandler(combo)
  if (previous) {
    TEMP_UNBOUND_HANDLERS[combo] = previous
  }

  // unbind previous and bind new handler
  KeyboardJS.unbind(combo, previous)
  KeyboardJS.bind(combo, handler)
}
export function rewindTemp(combo) {
  const previous = TEMP_UNBOUND_HANDLERS[combo]
  delete TEMP_UNBOUND_HANDLERS[combo]

  if (previous) {
    KeyboardJS.unbind(combo)
    KeyboardJS.bind(combo, previous)
  }
}


// default keyboard event handlers
const defaultBackspaceHandler = () => {
  if (document.activeElement.tagName.toLowerCase() !== 'input') {
    history.goBack()
  }
}
const defaultLeftHandler = () => { history.goBack() }
const defaultRightHandler = () => { history.goBack() }

// bind default handlers
KeyboardJS.bind('backspace', defaultBackspaceHandler)
KeyboardJS.bind('alt + left', defaultLeftHandler)
KeyboardJS.bind('alt + right', defaultRightHandler)


export default { bind, bindTemp, rewindTemp }
