import request from 'superagent'

import urls from '../modules/urls'
import { authorize, authorizeCSRF } from '../middlewares/auth'
import { parseCookie, toast } from '../modules/utils'
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
export function authError(reason = 'Something went wrong', email = null) {
  return { type: AUTH_ERROR, reason, email }
}

export function authenticate(email, password, router, next = NEWS.path) {
  return (dispatch) => {
    dispatch(authStart())
    request
      .post(urls.login())
      .use(authorizeCSRF())
      .send({ email, password })
      .end((error, response) => {
        const { body, header } = response
        if (!body) {
          dispatch(authError())
          return
        }

        const { user, reason, email: emailToResend } = body
        if (error) {
          // we consider the user is unconfirmed if the server's response
          // contains user's email (implicating that the confirmation did not
          // passed yet).
          dispatch(authError(reason, emailToResend))
          return
        }

        const sessionKey = parseCookie(header['set-cookie'].pop(), 'session')
        dispatch(authSuccess(sessionKey, user))
        router.replace(next)
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
        router.replace(next)
      })
  }
}

export const RESEND_CONFIRMATION_MAIL = 'RESEND_CONFIRMATION_MAIL'
export function resendConfirmationMail(email) {
  return (dispatch) => {
    request
      .post(urls.resend())
      .type('form')
      .use(authorizeCSRF())
      .send({ email })
      .end(() => {
        dispatch({ type: RESEND_CONFIRMATION_MAIL, email })
        toast(`Confirmation mail has been sent to ${email}`, {
          duration: null,
        })
      })
  }
}


// =========================================================
// User information initialization (via token within cookie)
// =========================================================

export const USER_INIT_START = 'USER_INIT_START'
export function userInitStart() {
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
export function csrfInitStart() {
  return { type: CSRF_INIT_START }
}

export const CSRF_INIT_SUCCESS = 'CSRF_INIT_SUCCESS'
export function csrfInitSuccess(token) {
  return { type: CSRF_INIT_SUCCESS, token }
}

export const CSRF_INIT_ERROR = 'CSRF_INIT_ERROR'
export function csrfInitError() {
  return { type: CSRF_INIT_ERROR }
}

export function initCSRF() {
  return (dispatch) => {
    // start csrf init
    dispatch(csrfInitStart())

    // TODO: should handle exceptional case where csrf token not set on
    // response cookie.
    request
      .get(urls.csrf())
      .end((error, response) => {
        if (error) {
          dispatch(csrfInitError())
          return
        }
        const { token } = response.body
        dispatch(csrfInitSuccess(token))
      })
  }
}
