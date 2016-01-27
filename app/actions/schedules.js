import request from 'superagent-bluebird-promise'

import { CSRF_TOKEN_HEADER } from '../constants/strings'
import { getCSRFToken } from '../modules/auth'
import urls from '../modules/urls'


// =====
// Fetch
// =====

export const FETCH_SCHEDULES_START = 'FETCH_SCHEDULES_START'
export function fetchSchedulesStart() {
  return { type: FETCH_SCHEDULES_START }
}

export const FETCH_SCHEDULES_SUCCESS = 'FETCH_SCHEDULES_SUCCESS'
export function fetchSchedulesSuccess(schedules, sites) {
  return { type: FETCH_SCHEDULES_SUCCESS, schedules, sites }
}

export const FETCH_SCHEDULES_ERROR = 'FETCH_SCHEDULES_ERROR'
export function fetchSchedulesError() {
  return { type: fetchSchedulesError }
}

export function fetchSchedules(pageNumber) {
  return (dispatch) => {
    dispatch(fetchSchedulesStart())
    request
      .get(urls.schedules(pageNumber))
      .then(response => response.body)
      .then((response) => {
        // TODO: NOT IMPLEMENTED YET
      }, (error) => {
        // TODO: NOT IMPLEMENTED YET
      })
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
      .set(CSRF_TOKEN_HEADER, getCSRFToken())
      .send(schedule)
      .then(response => response.body)
      .then((response) => {
        // TODO: NOT IMPLEMENTED YET
      }, (error) => {
        // TODO: NOT IMPLEMENTED YET
      })
  }
}


// ======
// Delete
// ======

export const DELETE_SCHEDULE_START = 'DELETE_SCHEDULE_START'
export function deleteScheduleStart() {
  return { type: DELETE_SCHEDULE_START }
}

export const DELETE_SCHEDULE_SUCCESS = 'DELETE_SCHEDULE_SUCCESS'
export function deleteScheduleSuccess() {
  return { type: DELETE_SCHEDULE_SUCCESS }
}

export const DELETE_SCHEDULE_ERROR = 'DELETE_SCHEDULE_ERROR'
export function deleteScheduleError() {
  return { type: DELETE_SCHEDULE_ERROR }
}

export function deleteSchedule(scheduleId) {
  return (dispatch) => {
    dispatch(deleteScheduleStart())
    request
      .del(urls.schedule(scheduleId))
      .then(response => response.body)
      .then((response) => {
        // TODO: NOT IMPLEMENTED YET
      }, (error) => {
        // TODO: NOT IMPLEMENTED YET
      })
  }
}
