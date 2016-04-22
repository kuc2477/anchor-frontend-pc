import { getSessionKey, getCSRFToken } from '../modules/auth'
import { CSRF_TOKEN_HEADER } from '../constants/strings'

// =============================
// HTTP header related utilities
// =============================

// reduces an array of header factories into a composite headers object
export function headers(factories) {
  if (!factories instanceof Array) {
    throw new Error('Argument factories should be type of array')
  }
  if (!factories.every(f => typeof f === 'function')) {
    throw new Error('Every factory should be type of function')
  }
  return factories.reduce((acc, factory) => factory(acc), {})
}

function accumulateHeader(headers, header) {
  return headers ? Object.assign({}, headers, header) : { ...header }
}

export function authorize(headers) {
  return accumulateHeader(headers, { Cookie: `session=${getSessionKey()}` })
}

export function authorizeCSRF(headers) {
  return accumulateHeader(headers, { [CSRF_TOKEN_HEADER]: getCSRFToken() })
}

export function jsonContent(headers) {
  return accumulateHeader(headers, {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  })
}
