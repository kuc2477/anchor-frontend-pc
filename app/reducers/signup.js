import Immutable from 'immutable'

import {
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  CLEAR_SIGNUP_STATE
} from '../actions/signup'


export const initialState = new Immutable.Map({
  isRegistering: false,
  didSignupFail: false,
  errorMessage: null,
})

export default(state = initialState, action) => {
  switch(action.type) {
    case SIGNUP_START:
      return state.set('isRegistering', true)

    case SIGNUP_SUCCESS:
      return state.merge({
        isRegistering: false,
        didSignupFail: false,
        errorMessage: null
      })

    case SIGNUP_ERROR:
      return state.merge({
        isRegistering: false,
        didSignupFail: true,
        errorMessage: action.reason
      })

    case CLEAR_SIGNUP_STATE:
      return initialState

    default:
      return state
  }
}
