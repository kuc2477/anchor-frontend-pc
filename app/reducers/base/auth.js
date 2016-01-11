import Immutable from 'immutable'

import {
  REQUEST_AUTHENTICATION,
  RECEIVE_AUTHENTICATION,
  REQUEST_CSRF_TOKEN,
  RECEIVE_CSRF_TOKEN
} from '../../actions/base/auth'


export const initialState = new Immutable.Map({
  user: null,
  isAuthenticating: false,
  didAuthenticationFail: false,
  csrfInitialized: false
})

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_AUTHENTICATION:
      return state.set('isAuthenticating', true)

    case RECEIVE_AUTHENTICATION:
      return state.merge({
        user: action.user,
        isAuthenticating: false,
        didAuthenticationFail: !action.isAuthenticating,
      })

    case REQUEST_CSRF_TOKEN:
      return state

    case RECEIVE_CSRF_TOKEN:
      return state.set('csrfInitialized', true)

    default:
      return state
  }
}
