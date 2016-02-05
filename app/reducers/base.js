import Immutable from 'immutable'

import { TOAST, CLEAR_TOAST } from '../actions/base'


export const initialState = new Immutable.Map({
  toastOpen: false,
  toastMessage: null,
  toastDuration: 3000,
  toastAction: null,
  toastCallback: null
})

export default (state = initialState, action) => {
  switch(action.type) {
    case TOAST:
      return state.merge({
        toastOpen: true,
        toastMessage: action.message,
        toastDuration: action.duration,
        toastAction: action.action,
        toastCallback: action.callback
      })

    case CLEAR_TOAST:
      return initialState

    default:
      return state
  }
}
