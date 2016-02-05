import request from 'superagent-bluebird-promise'

import urls from '../modules/urls'
import { authorizeCSRF } from '../modules/auth'
import { LOGIN } from '../constants/routes'


export const SIGNUP_START = 'SIGNUP_START'
export function signupStart() {
  return { type: SIGNUP_START }
}

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export function signupSuccess(email) {
  return { type: SIGNUP_SUCCESS, email }
}

export const SIGNUP_ERROR = 'SIGNUP_ERROR'
export function signupError(reason = 'Signup failed due to unknown error') {
  return { type: SIGNUP_ERROR, reason }
}

export function signup(
  email, firstname, lastname,
  password, passwordValidation,
  router, next = LOGIN.path) {
  return (dispatch) => {
    request
      .post(urls.signup()).type('form')
      .use(authorizeCSRF())
      .send({ email, firstname, lastname, password,
            password_validation: passwordValidation })
      .end((error, response) => {
        const { body } = response
        const { email, reason } = body
        if (error) {
          dispatch(signupError(reason || undefined))
          return
        }
        // dispatch signup sucess and notify the user that confirmation
        // mail has been sent to his email.
        dispatch(signupSuccess(email))
        toast(`Confirmation mail has been sent to ${email}`, {
          action: 'OK',
          duration: 5000,
          callback: clearToast
        })
        // route to next path
        router.push(next)
      })
  }
}
