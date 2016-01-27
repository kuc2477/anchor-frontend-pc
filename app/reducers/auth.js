import Immutable from 'immutable'

import {
  AUTH_START,
  AUTH_SUCCSESS,
  AUTH_ERROR,
  USER_INIT_SUCCESS,
  USER_INIT_ERROR,
  CSRF_INIT_SUCCESS,
  CSRF_INIT_ERROR
} from '../actions/auth'


export const initialState = new Immutable.Map({
  // user, auth
  user: null,
  isAuthenticating: false,
  didAuthFail: null,
  didUserInitFail: false,
  errorMessage: null,
  // csrf
  CSRFInitialized: false,
  didCSRFInitFail: false
})

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return state.set('isAuthenticating', true)

    case AUTH_SUCCSESS:
      return state.merge({
        user: action.user,
        isAuthenticating: false,
        didAuthFail: false,
        errorMessage: null
      })

    case AUTH_ERROR:
      return state.merge({
        isAuthenticating: false,
        didAuthFail: true,
        errorMessage: action.reason
      })

    case USER_INIT_SUCCESS:
      return state.merge({
        user: new Immutable.Map(action.user),
        didUserInitFail: false
      })

    case USER_INIT_ERROR:
      return state.merge({
        didUserInitFail: true
      })

    case CSRF_INIT_SUCCESS:
      return state.merge({
        CSRFInitialized: true,
        didCSRFInitFail: false,
      })

    case CSRF_INIT_ERROR:
      return state.set('didCSRFInitFail', true)

    default:
      return state
  }
}
