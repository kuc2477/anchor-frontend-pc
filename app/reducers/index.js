import { combineReducers } from 'redux'

import base from './base'
import auth from './auth'
import signup from './signup'
import schedules from './schedules'


export default combineReducers({
  base, auth, schedules, signup
})
