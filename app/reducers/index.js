import { combineReducers } from 'redux'

import auth from './base/auth.js'


// =======================
// Reducers for each pages
// =======================

const combinedBase = combineReducers({
  auth
})


// ===========
// App reducer
// ===========

export default combineReducers({
  base: combinedBase
})
