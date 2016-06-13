import request from 'superagent'
import { ActionCreators } from 'redux-undo'
import { decamelizeKeys, camelizeKeys } from 'humps'

import { CALL_API, Schemas } from '../middlewares/api'
import { authorize, authorizeCSRF } from '../middlewares/auth'
import { toast } from '../modules/utils'
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

export const FETCH_LATEST_NEWS_START = 'FETCH_LATEST_NEWS_START'
export const FETCH_LATEST_NEWS_SUCCESS = 'FETCH_LATEST_NEWS_START'
export const FETCH_LATEST_NEWS_ERROR = 'FETCH_LATEST_NEWS_ERROR'
export function fetchLatestNews(size) {
  return {
    [CALL_API]: {
      types: [
        FETCH_LATEST_NEWS_START,
        FETCH_LATEST_NEWS_SUCCESS,
        FETCH_LATEST_NEWS_ERROR
      ],
      endpoint: urls.latestNews(size),
      schema: Schemas.NEWS_LIST
    }
  }
}

export const FETCH_NEWS_RECOMMS_START = 'FETCH_NEWS_RECOMMS_START'
export const FETCH_NEWS_RECOMMS_SUCCESS = 'FETCH_NEWS_RECOMMS_SUCCESS'
export const FETCH_NEWS_RECOMMS_ERROR = 'FETCH_NEWS_RECOMMS_ERROR'
export function fetchNewsRecomms() {
  return {
    [CALL_API]: {
      types: [
        FETCH_NEWS_RECOMMS_START,
        FETCH_NEWS_RECOMMS_SUCCESS,
        FETCH_NEWS_RECOMMS_ERROR
      ],
      endpoint: urls.newsRecomms(),
      schema: Schemas.NEWS_LIST
    }
  }
}


// ====
// Save
// ====

export const RATING_START = 'RATING_START'
export const ratingStart = (newsId, rating) => ({
  type: RATING_START, newsId, rating
})

export const RATING_SUCCESS = 'RATING_SUCCESS'
export const ratingSuccess = (updated) => ({
  type: RATING_SUCCESS, updated
})

export const RATING_ERROR = 'RATING_ERROR'
export const ratingError = (reason) => ({
  type: RATING_ERROR, reason
})

export const rateNews = (newsId, rating) => dispatch => {
  dispatch(ratingStart(newsId, rating))

  request.post(urls.newsRatings(newsId))
  .use(authorize())
  .use(authorizeCSRF())
  .type('json')
  .send(decamelizeKeys({ positive: rating }))
  .end((error, response) => {
    if (error) {
      dispatch(ActionCreators.undo())
      dispatch(ratingError(error))
      return
    }

    const updated = camelizeKeys(response.body)
    toast('Rated news successfully')
    dispatch(ratingSuccess(updated))
  })
}


// ======
// Delete
// ======

export const CANCEL_RATING_START = 'CANCEL_RATING_START'
export const cancelRatingStart = (newsId) => ({
  type: CANCEL_RATING_START, newsId
})

export const CANCEL_RATING_SUCCESS = 'CANCEL_RATING_SUCCESS'
export const cancelRatingSuccess = (updated) => ({
  type: CANCEL_RATING_SUCCESS, updated
})

export const CANCEL_RATING_ERROR = 'CANCEL_RATING_ERROR'
export const cancelRatingError = (reason) => ({
  type: CANCEL_RATING_ERROR, reason
})

export const cancelRating = (newsId) => dispatch => {
  dispatch(cancelRatingStart(newsId))

  request.del(urls.newsRatings(newsId))
  .use(authorize())
  .use(authorizeCSRF())
  .end((error, response) => {
    if (error) {
      dispatch(ActionCreators.undo())
      dispatch(cancelRatingError(error))
      return
    }

    const updated = camelizeKeys(response.body)
    toast('Canceled rating successfully')
    dispatch(cancelRatingSuccess(updated))
  })
}
