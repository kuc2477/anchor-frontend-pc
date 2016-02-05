import request from 'superagent-bluebird-promise'

import urls from '../modules/urls'
import { getCSRFToken, authorize, authorizeCSRF } from '../modules/auth'
import { parseCookie } from '../modules/utils'
import { NEWS, LOGIN } from '../constants/routes'


// ===============
// Authentications
// ===============

export const AUTH_START = 'AUTH_START'
export function authStart() {
  return { type: AUTH_START }
}

export const AUTH_SUCCSESS = 'AUTH_SUCCSESS'
export function authSuccess(sessionKey, user) {
  return { type: AUTH_SUCCSESS, sessionKey, user }
}

export const AUTH_ERROR = 'AUTH_ERROR'
export function authError(reason = 'Wrong email & password combination') {
  return { type: AUTH_ERROR, reason }
}

export function authenticate(email, password, router, next = NEWS.path) {
  return (dispatch) => {
    dispatch(authStart())
    request
      .post(urls.login()).type('form')
      .use(authorizeCSRF())
      .send({ email, password })
      .end((error, response) => {
        const { body, header } = response
        const { user, reason } = body
        if (error) {
          dispatch(authError(reason || undefined))
          return
        }
        const sessionKey = parseCookie(header['set-cookie'].pop(), 'session')
        dispatch(authSuccess(sessionKey, user))
        router.push(next)
      })
  }
}

export const LOGOUT = 'LOGOUT'
export function logout(router, next = LOGIN.path) {
  return (dispatch) => {
    request
      .post(urls.logout())
      .use(authorize())
      .send({})
      .end(() => {
        dispatch({ type: LOGOUT })
        router.push(next)
      })
  }
}


// =========================================================
// User information initialization (via token within cookie)
// =========================================================

export const USER_INIT_START = 'USER_INIT_START'
export function userInitStart () {
  return { type: USER_INIT_START }
}

export const USER_INIT_SUCCESS = 'USER_INIT_SUCCESS'
export function userInitSuccess(user) {
  return { type: USER_INIT_SUCCESS, user }
}

export const USER_INIT_ERROR = 'USER_INIT_ERROR'
export function userInitError(reason = 'Unknown reason') {
  return { type: USER_INIT_ERROR, reason }
}

export function initUser(replace, callback) {
  return (dispatch) => {
    dispatch(userInitStart())
    request
      .get(urls.userinfo())
      .use(authorize())
      .end((error, response) => {
        // There's 2 possible reason of failing user initialization.
        //
        // 1. Session key in local storage has been expired on server side.
        // 2. Internal server error
        //
        // We redirect to login page if failed due to session expiration and
        // redirect to error page otherwise.
        if (error) {
          dispatch(userInitError())
          replace(LOGIN.path)
          callback()
          return
        }
        dispatch(userInitSuccess(response.body.user))
        callback()
      })
  }
}


// ====
// CSRF
// ====

export const CSRF_INIT_START = 'CSRF_INIT_START'
export function CSRFInitStart() {
  return { type: CSRF_INIT_START }
}

export const CSRF_INIT_SUCCESS = 'CSRF_INIT_SUCCESS'
export function CSRFInitSuccess(token) {
  return { type: CSRF_INIT_SUCCESS, token }
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
        dispatch(CSRFInitSuccess(token))
      })
  }
}
