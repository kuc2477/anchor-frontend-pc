import { combineReducers } from 'redux'

import auth from './auth'
import schedules from './schedules'


export default combineReducers({
  auth, schedules
})
