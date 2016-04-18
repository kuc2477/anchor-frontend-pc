import request from 'superagent-bluebird-promise'
import { ActionCreators } from 'redux-undo'
import { decamelizeKeys, camelizeKeys } from 'humps'

import { CALL_API, Schemas } from '../middlewares/api'
import { authorize, authorizeCSRF } from '../middlewares/auth'
import { createSchedule, unsaved } from '../constants/types'
import urls from '../modules/urls'


// ===================================
// Client level schedule manipulation
// ===================================

export const ADD_SCHEDULE = 'ADD_SCHEDULE'
export const addSchedule = (schedule) => ({
  type: ADD_SCHEDULE,
  schedule: createSchedule(schedule),
})

export const REMOVE_SCHEDULE = 'REMOVE_SCHEDULE'
export const removeSchedule = scheduleId => ({
  type: REMOVE_SCHEDULE, scheduleId
})

export const UPDATE_SCHEDULE = 'UPDATE_SCHEDULE'
export const updateSchedule = (scheduleId, schedule) => ({
  type: UPDATE_SCHEDULE, scheduleId, schedule
})


export const SELECT_SCHEDULE = 'SELECT_SCHEDULE'
export const selectSchedule = scheduleId => ({
  type: SELECT_SCHEDULE, scheduleId
})

export const SET_BOARD = 'SET_BOARD'
export const setBoard = board => ({
  type: SET_BOARD, board
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
export const saveScheduleStart = (scheduleId, schedule) => ({
  type: SAVE_SCHEDULE_START, scheduleId, schedule
})

export const SAVE_SCHEDULE_SUCCESS = 'SAVE_SCHEDULE_SUCCESS'
export const saveScheduleSuccess = (previous, saved) => ({
  type: SAVE_SCHEDULE_SUCCESS, previous, saved
})

export const SAVE_SCHEDULE_ERROR = 'SAVE_SCHEDULE_ERROR'
export const saveScheduleError = () => ({
  type: SAVE_SCHEDULE_ERROR
})

export const saveSchedule = (schedule, callback) => dispatch => {
  // dispatch save start and update the schedule
  dispatch(saveScheduleStart(schedule.id, schedule))
  dispatch(updateSchedule(schedule.id, schedule))

  const targetEndPoint = unsaved(schedule) ?
    urls.schedules() : urls.schedules(schedule.id)

  const targetRequest = unsaved(schedule) ?
    request.post : request.put

  targetRequest(targetEndPoint)
  .use(authorize())
  .use(authorizeCSRF())
  .type('json')
  .send(decamelizeKeys(schedule))
  .end((error, response) => {
    if (error) {
      // undo update on error and dispatch error
      dispatch(ActionCreators.undo())
      dispatch(saveScheduleError(error))
      return
    }

    // dispatch success with response's saved values and fire callback
    const saved = camelizeKeys(response.body)
    dispatch(saveScheduleSuccess(schedule, saved))
    if (callback) {
      callback(saved)
    }
  })
}


// ======
// Delete
// ======

export const DELETE_SCHEDULE_START = 'DELETE_SCHEDULE_START'
export const deleteScheduleStart = () => ({
  type: DELETE_SCHEDULE_START
})

export const DELETE_SCHEDULE_SUCCESS = 'DELETE_SCHEDULE_SUCCESS'
export const deleteScheduleSuccess = scheduleId => ({
  type: DELETE_SCHEDULE_SUCCESS, scheduleId
})

export const DELETE_SCHEDULE_ERROR = 'DELETE_SCHEDULE_ERROR'
export const deleteScheduleError = () => ({
  type: DELETE_SCHEDULE_ERROR
})

export const deleteSchedule = (scheduleId, callback) => dispatch => {
  // dispatch delete start and remove the schedule
  dispatch(deleteScheduleStart())
  dispatch(removeSchedule(scheduleId))

  // no http request if deleted schedule was unsaved instance
  if (unsaved(scheduleId)) {
    return
  }

  request.del(urls.schedules(scheduleId))
  .use(authorize())
  .use(authorizeCSRF())
  .end((error) => {
    if (error) {
      // undo schedule removal and dispatch error on error
      dispatch(ActionCreators.undo())
      dispatch(deleteScheduleError(error))
      return
    }
    dispatch(deleteScheduleSuccess())
    if (callback) {
      callback(scheduleId)
    }
  })
}
