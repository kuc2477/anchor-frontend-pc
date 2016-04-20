import Immutable from 'immutable'

import urls from '../modules/urls'
import {
  FETCH_NEWS_START,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_ERROR,
  RATING_START,
  RATING_SUCCESS,
  RATING_ERROR,
  CANCEL_RATING_START,
  CANCEL_RATING_SUCCESS,
  CANCEL_RATING_ERROR
} from '../actions/news'
import { LOGOUT } from '../actions/auth'


export const initialState = new Immutable.Map({
  newsList: new Immutable.List(),
  newsListById: new Immutable.Map(),
  isRating: false,
  didRatingFail: false,
  isFetching: false,
  didFetchFail: false,
  urlToFetch: urls.news(),
})

export default (state = initialState, action) => {
  switch(action.type) {
    // fetch
    case FETCH_NEWS_START: return reduceFetchStart(state, action)
    case FETCH_NEWS_SUCCESS: return reduceFetchSuccess(state, action)
    case FETCH_NEWS_ERROR: return reduceFetchError(state, action)

    // save
    case RATING_START: return reduceRatingStart(state, action)
    case RATING_SUCCESS: return reduceRatingSuccess(state, action)
    case RATING_ERROR: return reduceRatingError(state, action)

    // delete
    case CANCEL_RATING_START: return reduceCancelRatingStart(state, action)
    case CANCEL_RATING_SUCCESS: return reduceCancelRatingSuccess(state, action)
    case CANCEL_RATING_ERROR: return reduceCancelRatingError(state, action)

    // auxiliary
    case LOGOUT: return initialState
    default: return state
  }
}


// =====
// Fetch
// =====

function reduceFetchStart(state) {
  return state.set('isFetching', true)
}

function reduceFetchSuccess(state, action) {
  const { result, entities, link } = action
  const newsList = state.get('newsList').push(...result).toOrderedSet().toList()
  const newsListById = state.get('newsListById').merge(entities.news)
  return state.merge({
    newsList,
    newsListById,
    isFetching: false,
    didFetchFail: false,
    urlToFetch: link
  })
}

function reduceFetchError(state) {
  return state.merge({ isFetching: false, didFetchFail: true })
}


// ======
// Rating
// ======

function reduceRatingStart(state, action) {
  const { newsId, rating } = action

  const newsList = state.get('newsList')
  const newsListById = state.get('newsListById')
  const index = newsList.findIndex(newsId)
  const news = newsListById.get(newsId)

  const updated = news.set('currentUserRating', rating)
  const updatedNewsList = rating === false ?
    newsList.delete(index) :
    newsList
  const updatedNewsListById = rating === false ?
    newsListById.delete(newsId) :
    newsListById.set(newsId, updated)

  return state.merge({
    newsList: updatedNewsList,
    newsListById: updatedNewsListById,
    isRating: true
  })
}

function reduceRatingSuccess(state, action) {
  return state.merge({ isRating: false, didRatingFail: false })
}

function reduceRatingError(state, action) {
  return state.merge({ isRating: false, didRatingFail: true })
}

function reduceCancelRatingStart(state, action) {
  const { newsId } = action
  const newsListById = state.get('newsListById')
  const news = newsListById.get(newsId)

  const updated = news.set('currentUserRating', null)
  const updatedNewsListById = newsListById.set(newsId, updated)
  return state.merge({
    newsListById: updatedNewsListById,
    isRating: true
  })
}

function reduceCancelRatingSuccess(state, action) {
  return state.merge({ isRating: false, didRatingFail: false })
}

function reduceCancelRatingError(state, action) {
  return state.merge({ isRating: false, didRatingFail: true })
}
