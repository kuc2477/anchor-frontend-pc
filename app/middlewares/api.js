import request from 'superagent-bluebird-promise'
import { normalize, Schema, arrayOf } from 'normalizr'


const userSchema = new Schema('users')
const siteSchema = new Schema('sites')
const pageSchema = new Schema('pages')
const scheduleSchema = new Schema('schedule')

export const Schemas = {
  USER: userSchema,
  USERS: arrayOf(userSchema),
  SITE: siteSchema,
  SITES: arrayOf(siteSchema),
  PAGE: pageSchema,
  PAGES: arrayOf(pageSchema),
  SCHEDULE: scheduleSchema,
  SCHEDULES: arrayOf(scheduleSchema)
}

// Returns next url from a paginated response if found and returns null 
// otherwise.
function getNext(response) {
  // TODO: NOT IMPLEMENTED YET
}

// Fetches an API response and normalizes the result JSON according to schema. 
// This makes every API response have the same shape, regardless of how nested.
function callAPI(endpoint, schema) {
  // TODO: NOT IMPLEMENTED YET
}

// Action key that carries API call information interpreted by this
export const CALL_API = 'CALL_API'

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the API call and promises when such actions are dispatched.
export default store => next => action => {
  if (typeof action[CALL_API] === 'undefined') {
    return next(action)
  }
  const APICall = action[CALL_API]
  const { endpoint, schema } = APICall

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL')
  }
  if (!schema) {
    throw new Error('Specify one of the exported schemas')
  }

  return callAPI(endpoint, schema)
}
