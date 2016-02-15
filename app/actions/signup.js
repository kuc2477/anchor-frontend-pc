import request from 'superagent-bluebird-promise'

import urls from '../modules/urls'
import { authorizeCSRF } from '../modules/auth'
import { LOGIN } from '../constants/routes'
import { toast, clearToast } from '../modules/utils'


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
    dispatch(signupStart())
    request
      .post(urls.signup()).type('form')
      .use(authorizeCSRF())
      .send({ email, firstname, lastname, password,
            password_validation: passwordValidation })
      .end((error, response) => {
        const { body } = response
        const { email, reason } = body
        if (error) {
          dispatch(signupError(reason))
          return
        }
        // dispatch signup sucess and notify the user that confirmation
        // mail has been sent to his email.
        dispatch(signupSuccess(email))
        toast(`Confirmation mail has been sent to ${email}`, {
          duration: null,
        })
        // route to next path
        router.push(next)
      })
  }
}
