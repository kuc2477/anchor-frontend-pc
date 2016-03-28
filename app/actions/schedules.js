import request from 'superagent-bluebird-promise'

import { CALL_API, Schemas } from '../middlewares/api'
import { createSchedule } from '../constants/types'
import { authorize, authorizeCSRF } from '../modules/auth'
import urls from '../modules/urls'


// ===================================
// Client level schedule manipulation
// ===================================

export const ADD_SCHEDULE = 'ADD_SCHEDULE'
export const addSchedule = (schedule) => ({
  type: ADD_SCHEDULE,
  schedule: createSchedule(schedule)
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
export const SAVE_SCHEDULE_SUCCESS = 'SAVE_SCHEDULE_SUCCESS'
export const SAVE_SCHEDULE_ERROR = 'SAVE_SCHEDULE_ERROR'
export const saveScheduleStart = () => ({ type: SAVE_SCHEDULE_START })
export const saveScheduleSuccess = schedule => ({
  type: SAVE_SCHEDULE_SUCCESS, schedule
})
export const saveScheduleError = () => ({ type: SAVE_SCHEDULE_ERROR })
export const saveSchedule = schedule => dispatch => {
  dispatch(saveScheduleStart())
  request.post(urls.schedules(schedule.id))
  .use(authorize())
  .use(authorizeCSRF())
  .send(schedule)
  .end((error, response) => {
    if (error) {
      dispatch(saveScheduleError(error))
      return
    }
    const { body: saved } = response
    dispatch(saveScheduleSuccess(saved))
  })
}


// ======
// Delete
// ======

export const DELETE_SCHEDULE_START = 'DELETE_SCHEDULE_START'
export const DELETE_SCHEDULE_SUCCESS = 'DELETE_SCHEDULE_SUCCESS'
export const DELETE_SCHEDULE_ERROR = 'DELETE_SCHEDULE_ERROR'
export const deleteScheduleStart = () => ({
  type: DELETE_SCHEDULE_START
})
export const deleteScheduleSuccess = scheduleId => ({
  type: DELETE_SCHEDULE_SUCCESS, scheduleId
})
export const deleteScheduleError = () => ({
  type: DELETE_SCHEDULE_ERROR
})
export const deleteSchedule = scheduleId => dispatch => {
  dispatch(deleteScheduleStart())
  request.del(urls.schedule(scheduleId))
  .use(authorize())
  .use(authorizeCSRF())
  .end((error) => {
    if (error) {
      dispatch(deleteScheduleError(error))
      return
    }
    dispatch(deleteScheduleSuccess())
  })
}
