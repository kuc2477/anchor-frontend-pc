import request from 'superagent-bluebird-promise'
import { ActionCreators } from 'redux-undo'
import { decamelizeKeys, camelizeKeys } from 'humps'

import { CALL_API, Schemas } from '../middlewares/api'
import { authorize, authorizeCSRF } from '../middlewares/auth'
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
export const ratingError = () => ({
  type: RATING_ERROR
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
export const cancelRatingError = () => ({
  type: CANCEL_RATING_ERROR
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
    dispatch(cancelRatingSuccess(updated))
  })
}
