import request from 'superagent-bluebird-promise'

import urls from '../modules/urls'
import { getCSRFToken, setSessionKey, authorize } from '../modules/auth'
import { parseCookie } from '../modules/utils'
import { CSRF_TOKEN_HEADER } from '../constants/strings'


// ==========
// Basic auth
// ==========

export const AUTH_START = 'AUTH_START'
export function authStart() {
  return { type: AUTH_START }
}

export const AUTH_SUCCSESS = 'AUTH_SUCCSESS'
export function authSuccess(user) {
  return { type: AUTH_SUCCSESS, user }
}

export const AUTH_ERROR = 'AUTH_ERROR'
export function authError(reason = 'Wrong email & password combination') {
  return { type: AUTH_ERROR, reason }
}

export function authenticate(email, password, router, next = '/') {
  return (dispatch) => {
    dispatch(authStart())
    request
      .post(urls.login()).type('form')
      .set(CSRF_TOKEN_HEADER, getCSRFToken())
      .send({ email, password })
      .end((error, response) => {
        if (error) {
          dispatch(authError())
          return
        }
        const { body, header } = response
        // on authentication success
        setSessionKey(parseCookie(header['set-cookie'].pop(), 'session'))
        //setLiteralCookie(header['set-cookie'].pop())
        dispatch(authSuccess(body.user))
        router.push(next)
      })
  }
}

export const LOGOUT = 'LOGOUT'
export function logout() {
  return { type: LOGOUT }
}


// =========================================================
// User information initialization (via token within cookie)
// =========================================================

const USER_INIT_START = 'USER_INIT_START'
export function userInitStart () {
  return { type: USER_INIT_START }
}

const USER_INIT_SUCCESS = 'USER_INIT_SUCCESS'
export function userInitSuccess(user) {
  return { type: USER_INIT_SUCCESS, user }
}

const USER_INIT_ERROR = 'USER_INIT_ERROR'
export function userInitError(reason = 'Unknown reason') {
  return { type: USER_INIT_ERROR, reason }
}

export function initUser(router, callback = () => {}) {
  return (dispatch) => {
    dispatch(userInitStart())
    request
      .get(urls.userinfo())
      .use(authorize())
      .end((error, response) => {
        if (error) {
          dispatch(userInitError())
          return
        }
        dispatch(userInitSuccess(response.body.user))
        callback()
      })
  }
}


// ==========
// CSRF setup
// ==========

export const CSRF_INIT_START = 'CSRF_INIT_START'
export function CSRFInitStart() {
  return { type: CSRF_INIT_START }
}

export const CSRF_INIT_SUCCESS = 'CSRF_INIT_SUCCESS'
export function CSRFInitSuccess() {
  return { type: CSRF_INIT_SUCCESS }
}

export const CSRF_INIT_ERROR = 'CSRF_INIT_ERROR'
export function CSRFInitError() {
  return { type: CSRF_INIT_ERROR }
}

export function initCSRF() {
  return (dispatch) => {
    // start csrf init
    dispatch(CSRFInitStart())

    // TODO: should handle exceptional case where csrf token not set on
    // response cookie.
    request
      .get(urls.csrf())
      .end((error, response) => {
        if (error) {
          dispatch(CSRFInitError())
          return
        }
        dispatch(CSRFInitSuccess())
      })
  }
}


export default {
  // auth
  authStart,
  authSuccess,
  authError,
  authenticate,
  // user info
  userInitStart,
  userInitSuccess,
  userInitError,
  initUser,
  // csrf
  CSRFInitStart,
  CSRFInitSuccess,
  CSRFInitError,
  initCSRF
}
