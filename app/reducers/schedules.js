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
  DELETE_SCHEDULE_ERROR
} from '../actions/schedules'


export const initialState = new Immutable.Map({
  // schedule
  scheduleId : null,
  isSaving: false,
  didSaveFail: false,
  // schedules
  schedules: new Immutable.List(),
  schedulesById: new Immutable.Map(),
  sitesById: new Immutable.Map(),
  isFetching: false,
  didFetchFail: false,
  urlToFetch: urls.schedules()
})

export default (state = initialState, action) => {
  switch(action.type) {
    case FETCH_SCHEDULES_START:
      return state.set('isFetching', true)

    case FETCH_SCHEDULES_SUCCESS:
      return state.merge({
        schedules: state.schedules.push(action.schedules),
        schedulesById: state.schedulesById.merge(action.schedulesById),
        sitesById: state.sitesById.merge(action.sitesById),
        isFetching: false,
        didFetchFail: false,
        urlToFetch: action.next
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
      const index = state.schedules.findIndex(
        schedule => schedule.id === saved.id
      )
      return state.merge({
        isSaving: false,
        didSaveFail: false,
        schedules: state.schedules.set(index, saved),
        schedulesById: state.schedulesById.set(saved.id, saved),
      })

    case SAVE_SCHEDULE_ERROR:
      return state.merge({
        isSaving: false,
        didSaveFail: true
      })

    case DELETE_SCHEDULE_START:
      return state

    case DELETE_SCHEDULE_SUCCESS:
      return state

    case DELETE_SCHEDULE_ERROR:
      return state

    default:
      return state
  }
}
