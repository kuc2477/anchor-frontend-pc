import { CSRF_TOKEN_KEY } from '../constants/strings.js'


export function getCookie(name) {
  const value = '; ' + document.cookie
  const parts = value.split('; ' + name + '=')
  if (parts.length === 2) {
    return parts.pop().split(';').shift()
  }
}

export function setCookie(name, value) {
  if (!getCookie(name)) {
    document.cookie += `; ${name}=${value}`
  }
}

export function getCSRFToken() {
  return getCookie(CSRF_TOKEN_KEY)
}

export function setCSRFToken(token) {
  setCookie(CSRF_TOKEN_KEY, token)
}


export default {
  getCookie,
  getCSRFToken
}
