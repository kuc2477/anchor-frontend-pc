import { LOGIN } from '../constants/routes'
import {
  CSRF_TOKEN_HEADER,
  LOCAL_STORAGE_CSRF_KEY,
  LOCAL_STORAGE_SESSION_KEY
} from '../constants/strings'

import history from '../modules/history'
import store from '../store'
import { initUser } from '../actions/auth'


// ========================================================================
// WARNING: THIS MODULE WRAPS HTML5 LOCAL STORAGE API AND MAKE A CHANNEL
//          TO MAKE SIDE EFFECTS DIRECTLY. BE SURE TO WRITE CODE FOR EVERY
//          EXCEPTIONAL CASES EXHAUSITVELY.
// ========================================================================

// superagent middlewares
export function authorize() {
  return request => request.set('Cookie', `session=${getSessionKey()}`)
}
export function authorizeCSRF() {
  return request => request.set(CSRF_TOKEN_HEADER, getCSRFToken())
}

// csrf
export function getCSRFToken() {
  return window.localStorage.getItem(LOCAL_STORAGE_CSRF_KEY)
}
export function setCSRFToken(token) {
  window.localStorage.setItem(LOCAL_STORAGE_CSRF_KEY, token)
}
export function removeCSRFToken() {
  window.localStorage.removeItem(LOCAL_STORAGE_CSRF_KEY)
}

// session
export function getSessionKey() {
  return window.localStorage.getItem(LOCAL_STORAGE_SESSION_KEY)
}
export function setSessionKey(sessionKey) {
  window.localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, sessionKey)
}
export function removeSessionKey() {
  window.localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY)
}

// auth util
export function isAuthenticated() {
  return window.localStorage.getItem(LOCAL_STORAGE_SESSION_KEY)
}

// callback function to check auth status on route change. used in `onEnter`
// of `router.js`.
export function authRequired(nextState, replace, callback) {
  if (!isAuthenticated()) {
    replace(LOGIN.path)
    callback()
    return
  }
  // Initialize user first if not initialized yet.
  if (!store.getState().auth.get('user')) {
    store.dispatch(initUser(replace, callback))
    return
  }
  callback()
}
