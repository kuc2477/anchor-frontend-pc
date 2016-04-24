import store from '../store'
import baseActions from '../actions/base'
import { TOAST_LENGTH_SHORT, } from '../constants/numbers'


export function parseCookie(cookies, name) {
  const value = `; ${cookies}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop().split(';').shift()
  }
  return null
}

export function toast(message, options) {
  // merge option with defaults
  const defaults = {
    duration: TOAST_LENGTH_SHORT,
    action: 'OK',
    callback: clearToast
  }
  const merged = Object.assign(defaults, options)
  const { duration, action, callback } = merged

  // dispatch toast action
  const toastAction = baseActions.toast(message, duration, action, callback)
  store.dispatch(toastAction)
}

export function clearToast() {
  // dispatch toast clear action
  const clearToastAction = baseActions.clearToast()
  store.dispatch(clearToastAction)
}

export default {
  parseCookie,
  toast,
  clearToast,
}
