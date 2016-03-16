import request from 'superagent-bluebird-promise'

import { CALL_API, Schemas } from '../middlewares/api'
import { CSRF_TOKEN_HEADER } from '../constants/strings'
import { authorize, authorizeCSRF  } from '../modules/auth'
import urls from '../modules/urls'


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
export function saveScheduleStart() {
  return { type: SAVE_SCHEDULE_START }
}

export const SAVE_SCHEDULE_SUCCESS = 'SAVE_SCHEDULE_SUCCESS'
export function saveScheduleSuccess() {
  return { type: SAVE_SCHEDULE_SUCCESS }
}

export const SAVE_SCHEDULE_ERROR = 'SAVE_SCHEDULE_ERROR'
export function saveScheduleError() {
  return { type: SAVE_SCHEDULE_ERROR }
}

export function saveSchedule(schedule) {
  return (dispatch) => {
    dispatch(saveScheduleStart())
    request
      .post(urls.site(site.id))
      .use(authorize())
      .use(authorizeCSRF())
      .send(schedule)
      .end((error, response) => {
        // TODO: NOT IMPLEMENTED YET
      })
  }
}


// ======
// Delete
// ======

export const DELETE_SCHEDULE_START = 'DELETE_SCHEDULE_START'
export function deleteScheduleStart(scheduleId) {
  return { type: DELETE_SCHEDULE_START, scheduleId }
}

export const DELETE_SCHEDULE_SUCCESS = 'DELETE_SCHEDULE_SUCCESS'
export function deleteScheduleSuccess() {
  return { type: DELETE_SCHEDULE_SUCCESS }
}

export const DELETE_SCHEDULE_ERROR = 'DELETE_SCHEDULE_ERROR'
export function deleteScheduleError(schedule) {
  return { type: DELETE_SCHEDULE_ERROR, scheduleId }
}

export function deleteSchedule(scheduleId) {
  return (dispatch) => {
    dispatch(deleteScheduleStart())
    request
      .del(urls.schedule(scheduleId))
      .use(authorize())
      .use(authorizeCSRF())
      .end((error, response) => {
        // TODO: NOT IMPLEMENTED YET
      })
  }
}
