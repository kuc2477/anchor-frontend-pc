import strings from '../constants/strings'


export const COVER_START = strings.COVER_START
export function coverStart(scheduleId, state) {
  state = state || COVER_START
  return { type: COVER_START, scheduleId, state, size }
}

export const COVER_SUCCESS = strings.COVER_SUCCESS
export function coverSuccess(scheduleId, state, size) {
  state = state || COVER_SUCCESS
  size = size || 0
  return { type: COVER_SUCCESS, scheduleId, state, size }
}

export const COVER_ERROR = strings.COVER_ERROR
export function coverError(scheduleId, state) {
  state = state || COVER_ERROR
  return { type: COVER_ERROR, scheduleId, state }
}
