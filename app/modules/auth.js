import { LOGIN } from '../constants/routes'
import {
  CSRF_TOKEN_HEADER,
  LOCAL_STORAGE_CSRF_KEY,
  LOCAL_STORAGE_SESSION_KEY
} from '../constants/strings'


// ========================================================================
// WARNING: THIS MODULE WRAPS HTML5 LOCAL STORAGE API AND MAKE A CHANNEL
//          TO MAKE SIDE EFFECTS DIRECTLY. BE SURE TO WRITE CODE FOR EVERY
//          EXCEPTIONAL CASES EXHAUSITVELY.
// ========================================================================

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
