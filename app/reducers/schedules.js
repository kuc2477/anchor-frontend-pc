import Immutable from 'immutable'

import urls from '../modules/urls'
import { unsaved } from '../constants/types'
import { DASH_BOARD_GENERAL_SETTINGS } from '../constants/strings'
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
  UPDATE_SCHEDULE,
  SELECT_SCHEDULE,
  SET_BOARD,
} from '../actions/schedules'
import { LOGOUT } from '../actions/auth'


export const initialState = new Immutable.Map({
  schedule: null,
  schedules: new Immutable.List(),
  schedulesById: new Immutable.Map(),
  isSaving: false,
  didSaveFail: false,
  isFetching: false,
  didFetchFail: false,
  isDeleting: false,
  didDeleteFail: false,
  urlToFetch: urls.schedules(),
  board: DASH_BOARD_GENERAL_SETTINGS
})

export default (state = initialState, action) => {
  switch (action.type) {
    // client level schedule manipulation
    case ADD_SCHEDULE: return reduceAddSchedule(state, action)
    case REMOVE_SCHEDULE: return reduceRemoveSchedule(state, action)
    case UPDATE_SCHEDULE: return reduceUpdateSchedule(state, action)
    case SELECT_SCHEDULE: return reduceSelectSchedule(state, action)
    case SET_BOARD: return reduceSetBoard(state, action)

    // fetch
    case FETCH_SCHEDULES_START: return reduceFetchStart(state, action)
    case FETCH_SCHEDULES_SUCCESS: return reduceFetchSuccess(state, action)
    case FETCH_SCHEDULES_ERROR: return reduceFetchError(state, action)

    // save
    case SAVE_SCHEDULE_START: return reduceSaveStart(state, action)
    case SAVE_SCHEDULE_SUCCESS: return reduceSaveSuccess(state, action)
    case SAVE_SCHEDULE_ERROR: return reduceSaveError(state, action)

    // delete
    case DELETE_SCHEDULE_START: return reduceDeleteStart(state, action)
    case DELETE_SCHEDULE_SUCCESS: return reduceDeleteSuccess(state, action)
    case DELETE_SCHEDULE_ERROR: return reduceDeleteError(state, action)

    // auxiliary
    case LOGOUT: return initialState
    default: return state
  }
}


// =========================
// Client level manipulation
// =========================

function reduceAddSchedule(state, action) {
  const { schedule } = action
  const existingUnsaved = state.get('schedules').find(s => unsaved(s))

  // just activate existing unsaved schedule if already exists
  if (existingUnsaved) {
    return state.merge({ schedule: existingUnsaved })
  }
  // otherwise add new schedule and activate it
  return state.merge({
    schedule: schedule.id,
    schedules: state.get('schedules').push(schedule.id),
    schedulesById: state.get('schedulesById').merge({
      [schedule.id]: schedule
    })
  })
}

function reduceRemoveSchedule(state, action) {
  const { scheduleId: toDelete } = action

  const [ index, _ ] = state.get('schedules').findEntry(id => id === toDelete)
  const schedules = state.get('schedules').filter(id => id !== toDelete)
  const schedulesById = state.get('schedulesById').delete(toDelete)
  const schedule =
    state.get('schedules').get(index - 1) ||
    state.get('schedules').get(index + 1)
  return state.merge({ schedule, schedules, schedulesById })
}

function reduceUpdateSchedule(state, action) {
  const { scheduleId, schedule } = action
  const schedulesById = state.get('schedulesById')
  const updated = schedulesById.merge({ [scheduleId]: schedule })
  return state.merge({ schedulesById: updated })
}

function reduceSelectSchedule(state, action) {
  const { scheduleId: toSelect } = action
  return state.merge({ schedule: toSelect })
}

function reduceSetBoard(state, action) {
  return state.merge({ board: action.board })
}


// =====
// Fetch
// =====

function reduceFetchStart(state) {
  return state.set('isFetching', true)
}

function reduceFetchSuccess(state, action) {
  const { result, entities, link } = action
  const schedules = state.get('schedules').push(...result).toOrderedSet().toList()
  const schedulesById = state.get('schedulesById').merge(entities.schedule)
  const schedule = !state.get('schedules').count() && result.length ?
    result[0] : state.get('schedule')

  return state.merge({
    schedule, schedules, schedulesById,
    isFetching: false,
    didFetchFail: false,
    urlToFetch: link
  })
}

function reduceFetchError(state) {
  return state.merge({ isFetching: false, didFetchFail: true })
}


// ====
// Save
// ====

function reduceSaveStart(state, action) {
  return state.merge({ isSaving: true })
}

function reduceSaveSuccess(state, action) {
  const { previous, saved } = action
  const savedSelected = previous.id === state.get('schedule')
  const index = state.get('schedules').findIndex(s => s === previous.id)

  return state.merge({
    isSaving: false,
    didSaveFail: false,
    schedule: savedSelected ? saved.id : state.get('schedule'),
    schedules: state.get('schedules').set(index, saved.id),
    schedulesById: state.get('schedulesById').delete(previous.id).merge({
      [saved.id]: Immutable.fromJS(saved)
    })
  })
}

function reduceSaveError(state) {
  return state.merge({
    isSaving: false,
    didSaveFail: true
  })
}


// ======
// Delete
// ======

function reduceDeleteStart(state) {
  return state.merge({ isDeleting: true })
}

function reduceDeleteSuccess(state, action) {
  return state.merge({ isDeleting: false, didDeleteFail: false })
}

function reduceDeleteError(state) {
  return state.merge({ isDeleting: false, didDeleteFail: true })
}
