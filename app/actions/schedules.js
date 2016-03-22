import request from 'superagent-bluebird-promise'

import { CALL_API, Schemas } from '../middlewares/api'
import { CSRF_TOKEN_HEADER } from '../constants/strings'
import { createSchedule } from '../constants/types'
import { authorize, authorizeCSRF  } from '../modules/auth'
import urls from '../modules/urls'


// ==========================
// Add / Remove / Activation
// ==========================

export const ADD_SCHEDULE = 'ADD_SCHEDULE'
export const addSchedule = () => ({
  type: ADD_SCHEDULE,
  schedule: createSchedule()
})

export const REMOVE_SCHEDULE = 'REMOVE_SCHEDULE'
export const removeSchedule = scheduleId => ({
  type: REMOVE_SCHEDULE, scheduleId
})


export const SELECT_SCHEDULE = 'SET_SCHEDULE_SELECTED'
export const selectSchedule = scheduleId => ({
  type: SELECT_SCHEDULE, scheduleId
})


// =====
// Fetch
// =====

export const FETCH_SCHEDULES_START = 'FETCH_SCHEDULES_START'
export const FETCH_SCHEDULES_SUCCESS = 'FETCH_SCHEDULES_SUCCESS'
export const FETCH_SCHEDULES_ERROR = 'FETCH_SCHEDULES_ERROR'
export function fetchSchedules(url) {
  return {
    [CALL_API]: {
      types: [
        FETCH_SCHEDULES_START,
        FETCH_SCHEDULES_SUCCESS,
        FETCH_SCHEDULES_ERROR
      ],
      endpoint: url,
      schema: Schemas.SCHEDULES
    }
  }
}


// ====
// Save
// ====

export const SAVE_SCHEDULE_START = 'SAVE_SCHEDULE_START'
export const SAVE_SCHEDULE_SUCCESS = 'SAVE_SCHEDULE_SUCCESS'
export const SAVE_SCHEDULE_ERROR = 'SAVE_SCHEDULE_ERROR'
export const saveScheduleStart = () => ({ type: SAVE_SCHEDULE_START })
export const saveScheduleSuccess = () => ({ type: SAVE_SCHEDULE_SUCCESS })
export const saveScheduleError = () => ({ type: SAVE_SCHEDULE_ERROR })
export const saveSchedule = schedule => dispatch => {
  dispatch(saveScheduleStart())
  request.post(urls.site(site.id))
  .use(authorize())
  .use(authorizeCSRF())
  .send(schedule)
  .end((error, response) => {
    // TODO: NOT IMPLEMENTED YET
  })
}



// ======
// Delete
// ======

export const DELETE_SCHEDULE_START = 'DELETE_SCHEDULE_START'
export const DELETE_SCHEDULE_SUCCESS = 'DELETE_SCHEDULE_SUCCESS'
export const DELETE_SCHEDULE_ERROR = 'DELETE_SCHEDULE_ERROR'
export const deleteScheduleStart = scheduleId => ({
  type: DELETE_SCHEDULE_START, scheduleId
})
export const deleteScheduleSuccess = () => ({ type: DELETE_SCHEDULE_SUCCESS })
export const deleteScheduleError = schedule => ({
  type: DELETE_SCHEDULE_ERROR, scheduleId
})
export const deleteSchedule = scheduleId => dispatch => {
  dispatch(deleteScheduleStart())
  request.del(urls.schedule(scheduleId))
  .use(authorize())
  .use(authorizeCSRF())
  .end((error, response) => {
    // TODO: NOT IMPLEMENTED YET
  })
}
