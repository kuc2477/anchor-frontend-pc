import _ from 'lodash'
import Immutable from 'immutable'

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
  ADD_SCHEDULE
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
    case FETCH_SCHEDULES_START:
      return state.set('isFetching', true)

    case FETCH_SCHEDULES_SUCCESS:
      const { result, entities, link } = action
      return state.merge({
        schedule:
          !state.get('schedules').count() && result.length ?
            result[0] : state.get('schedule'),
        schedules: state.get('schedules').push(...result),
        schedulesById: state.get('schedulesById').merge(entities.schedule),
        isFetching: false,
        didFetchFail: false,
        urlToFetch: link
      })

    case FETCH_SCHEDULES_ERROR:
      return state.merge({
        isFetching: false,
        didFetchFail: true,
      })

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

    case DELETE_SCHEDULE_START:
    case DELETE_SCHEDULE_SUCCESS:
    case DELETE_SCHEDULE_ERROR:
      return state

  case ADD_SCHEDULE:
      const { schedule } = action
      return state.merge({
        schedule: schedule.id,
        schedules: state.get('schedules').push(schedule.id),
        schedulesById: state.get('schedulesById').merge({
          [schedule.id]: schedule
        })
      })

    case LOGOUT:
      return initialState

    default:
      return state
  }
}
