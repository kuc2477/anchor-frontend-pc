import { getSessionKey, getCSRFToken } from '../modules/auth'
import { CSRF_TOKEN_HEADER } from '../constants/strings'


// superagent middlewares
export function authorize() {
  return request => request.set('Cookie', `session=${getSessionKey()}`)
}
export function authorizeCSRF() {
  return request => request.set(CSRF_TOKEN_HEADER, getCSRFToken())
}
