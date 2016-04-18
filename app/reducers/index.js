import _ from 'lodash'
import { combineReducers } from 'redux'
import undoable from 'redux-undo'

import base from './base'
import auth from './auth'
import signup from './signup'
import schedules from './schedules'
import news from './news'


export default combineReducers({
  base, auth, signup,
  schedules: undoable(schedules),
  news: undoable(news),
})
