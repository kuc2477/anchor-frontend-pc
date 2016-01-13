import request from 'superagent-bluebird-promise'

import urls from '../modules/urls'
import { CSRF_TOKEN_HEADER } from '../constants/strings'
import { getCSRFToken } from '../modules/utils'


// ==========
// Basic auth
// ==========

export const REQUEST_AUTHENTICATION = 'REQUEST_AUTHENTICATION'
export function requestAuthentication() {
  return { type: REQUEST_AUTHENTICATION }
}

export const RECEIVE_AUTHENTICATION = 'RECEIVE_AUTHENTICATION'
export function receiveAuthentication(isAuthenticated, user = null) {
  return { type: RECEIVE_AUTHENTICATION, isAuthenticated, user }
}


export function authenticate(username, password, next = '/') {
  return (dispatch) => {
    // start authentication
    dispatch(requestAuthentication())

    // TODO: dispatch `receiveAuthentication` with user information sent from
    //       backend server.
    request
      .post(urls.login()).type('form')
      .set(CSRF_TOKEN_HEADER, getCSRFToken())
      .send({ username, password }).then(() => {
        // on authentication success
        dispatch(receiveAuthentication(true))
        window.location = next
      }, () => {
        // on failure
        dispatch(receiveAuthentication(false))
      })
  }
}


// ==========
// CSRF setup
// ==========

export const REQUEST_CSRF_TOKEN = 'REQUEST_CSRF_TOKEN'
export function requestCSRFToken() {
  return { type: REQUEST_CSRF_TOKEN }
}

export const RECEIVE_CSRF_TOKEN = 'RECEIVE_CSRF_TOKEN'
export function receiveCSRFToken(CSRFToken) {
  return { type: RECEIVE_CSRF_TOKEN, token: CSRFToken }
}

export function initializeCSRFToken() {
  request
    .get(urls.csrf())
    .then(response => response.body)
    .then((response) => {
      // TODO: NOT IMPLEMENTED YET
    }, (error) => {
      // NOT IMPLEMENTED YET
    })
}


export default {
  requestAuthentication,
  receiveAuthentication,
  authenticate,
  requestCSRFToken,
  receiveCSRFToken,
  initializeCSRFToken
}
