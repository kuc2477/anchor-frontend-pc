import _ from 'lodash'
import Immutable from 'immutable'

import { unsaved } from '../constants/types'
import urls from '../modules/urls'
import {
  FETCH_SCHEDULES_START,
  FETCH_SCHEDULES_SUCCESS,
  FETCH_SCHEDULES_ERROR,
  SAVE_SCHEDULE_START,
  SAVE_SCHEDULE_SUCCESS,
  SAVE_SCHEDULE_ERROR,
  DELETE_SCHEDULE_START,
  DELETE_SCHEDULE_SUCCESS,
  DELETE_SCHEDULE_ERROR,
  ADD_SCHEDULE,
  REMOVE_SCHEDULE,
  SELECT_SCHEDULE
} from '../actions/schedules'
import { LOGOUT } from '../actions/auth'


export const initialState = new Immutable.Map({
  schedule : null,
  schedules: new Immutable.List(),
  schedulesById: new Immutable.Map(),
  isSaving: false,
  didSaveFail: false,
  isFetching: false,
  didFetchFail: false,
  urlToFetch: urls.schedules()
})

export default (state = initialState, action) => {
  switch(action.type) {
    // =====================
    // Add / Remove / Select
    // =====================

    case ADD_SCHEDULE:
      var { schedule } = action

      // just activate existing unsaved schedule if already exists
      if (!state.get('schedules').filter(id => unsaved(id)).isEmpty()) {
        return state.merge({ schedule: schedule.id })
      }

      // otherwise add new schedule and activate it
      return state.merge({
        schedule: schedule.id,
        schedules: state.get('schedules').push(schedule.id),
        schedulesById: state.get('schedulesById').merge({
          [schedule.id]: schedule
        })
      })

    case REMOVE_SCHEDULE:
      const { scheduleId: toRemove } = action
      var schedules = state.get('schedules').filter(id => id !== toRemove)
      var schedulesById = state.get('schedulesById').delete(toRemove)
      var schedule = schedules.last()
      return state.merge({ schedule, schedules, schedulesById })

    case SELECT_SCHEDULE:
      const { scheduleId: toSelect } = action
      return state.merge({ schedule: toSelect })

    // =====
    // Fetch
    // =====

    case FETCH_SCHEDULES_START:
      return state.set('isFetching', true)

    case FETCH_SCHEDULES_SUCCESS:
      const { result, entities, link } = action
      var schedules = state.get('schedules').push(...result)
      var schedulesById = state.get('schedulesById').merge(entities.schedule)
      var schedule = !state.get('schedules').count() && result.length ?
        result[0] : state.get('schedule')
      return state.merge({
        schedule, schedules, schedulesById,
        isFetching: false,
        didFetchFail: false,
        urlToFetch: link
      })

    case FETCH_SCHEDULES_ERROR:
      return state.merge({
        isFetching: false,
        didFetchFail: true,
      })


    // ====
    // Save
    // ====

    case SAVE_SCHEDULE_START:
      return state.set('isSaving', true)

    case SAVE_SCHEDULE_SUCCESS:
      const saved = action.schedule
      const index = state.get('schedules').findIndex(
        schedule => schedule.id === saved.id
      )
      return state.merge({
        isSaving: false,
        didSaveFail: false,
        schedules: state.get('schedules').set(index, saved),
        schedulesById: state.get('schedulesById').set(saved.id, saved),
      })

    case SAVE_SCHEDULE_ERROR:
      return state.merge({
        isSaving: false,
        didSaveFail: true
      })


    // ======
    // Delete
    // ======

    case DELETE_SCHEDULE_START:
    case DELETE_SCHEDULE_SUCCESS:
    case DELETE_SCHEDULE_ERROR:
      // TODO: NOT IMPLEMENTED YET
      return state


    // ===
    // Etc
    // ===

    case LOGOUT:
      return initialState

    default:
      return state
  }
}
