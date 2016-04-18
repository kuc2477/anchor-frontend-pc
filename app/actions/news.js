import request from 'superagent-bluebird-promise'

import { CALL_API, Schemas } from '../middlewares/api'
import { CSRF_TOKEN_HEADER } from '../constants/strings'
import { getCSRFToken } from '../modules/auth'
import urls from '../modules/urls'

// =====
// Fetch
// =====

export const FETCH_NEWS_START = 'FETCH_NEWS_START'
export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS'
export const FETCH_NEWS_ERROR = 'FETCH_NEWS_ERROR'
export function fetchNews(url) {
  return {
    [CALL_API]: {
      types: [
        FETCH_NEWS_START,
        FETCH_NEWS_SUCCESS,
        FETCH_NEWS_ERROR
      ],
      endpoint: url,
      schema: Schemas.NEWS_LIST
    }
  }
}
