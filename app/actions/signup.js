import 'isomorphic-fetch'
import { decamelizeKeys } from 'humps'
import { LOGIN } from '../constants/routes'
import urls from '../modules/urls'
import { authorizeCSRF } from '../modules/http'
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

export const CLEAR_SIGNUP_STATE = 'CLEAR_SIGNUP_STATE'
export function clearSignupState() {
  return { type: CLEAR_SIGNUP_STATE  }
}

export function signup(
  email, firstname, lastname,
  password, passwordValidation,
  router, next = LOGIN.path) {
  return (dispatch) => {
    dispatch(signupStart())
    fetch(urls.signup(), {
      headers: headers([authorize, authorizeCSRF, jsonContent]),
      body: JSON.stringify(decamelizeKeys({
        email, firstname, lastname, password, passwordValidation
      }))
    }).then(response => {
        const { email, reason } = response.json()
        if (!response.ok) {
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
