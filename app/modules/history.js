import { browserHistory } from 'react-router'
import KeyboardJS from 'keyboardjs'


// project wide global history object
const history = browserHistory

// bind keyboard events to history routing
KeyboardJS.bind('backspace', () => {
  if (document.activeElement.tagName.toLowerCase() !== 'input') {
    history.goBack()
  }
})
KeyboardJS.bind('alt + left', history.goBack)
KeyboardJS.bind('alt + right', history.goForward)

export default history
