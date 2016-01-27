import request from 'superagent-bluebird-promise'

import { CSRF_TOKEN_HEADER } from '../constants/strings'
import { getCSRFToken } from '../modules/auth'
import urls from '../modules/urls'

// =====
// Fetch
// =====

export const FETCH_NEWS_START = 'FETCH_NEWS_START'
export function fetchNewsStart() {
  return { type: FETCH_NEWS_START }
}

export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS'
export function fetchNewsSuccess() {
  return { type: FETCH_NEWS_SUCCESS }
}

export const FETCH_NEWS_ERROR = 'FETCH_NEWS_ERROR'
export function fetchNewsError() {
  return { type: FETCH_NEWS_ERROR }
}

export function fetchNews(pageNumber) {
  return (dispatch) => {
    dispatch(fetchNewsStart())
    request
      .get(urls.news(pageNumber))
      .then(response => response.body)
      .then((response) => {
        // TODO: NOT IMPLEMENTED YET
      }, (error) => {
        // TODO: NOT IMPLEMENTED YET
      })
  }
}
