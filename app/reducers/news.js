import Immutable from 'immutable'

import urls from '../modules/urls'
import {
  FETCH_NEWS_START,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_ERROR,
  FETCH_LATEST_NEWS_START,
  FETCH_LATEST_NEWS_SUCCESS,
  FETCH_LATEST_NEWS_ERROR,
  FETCH_NEWS_RECOMMS_START,
  FETCH_NEWS_RECOMMS_SUCCESS,
  FETCH_NEWS_RECOMMS_ERROR,
  RATING_START,
  RATING_SUCCESS,
  RATING_ERROR,
  CANCEL_RATING_START,
  CANCEL_RATING_SUCCESS,
  CANCEL_RATING_ERROR
} from '../actions/news'
import { COVER_SUCCESS } from '../actions/autobahn'
import { LOGOUT } from '../actions/auth'


export const initialState = new Immutable.Map({
  // news
  newsList: new Immutable.List(),
  newsListById: new Immutable.Map(),
  recomms: new Immutable.List(),
  recommsById: new Immutable.Map(),
  // rating status
  isRating: false,
  didRatingFail: false,
  // fetching status
  isFetching: false,
  didFetchFail: false,
  // fetching recomms status
  isFetchingRecomms: false,
  didFetchingRecommsFailed: false,
  // latest news existance status
  latestNewsToFetch: 0,
  // url
  urlToFetch: urls.news(),
})

export default (state = initialState, action) => {
  switch (action.type) {
    // autobahn
    case COVER_SUCCESS: return reduceCoverSuccess(state, action)

    // fetch
    case FETCH_NEWS_START: return reduceFetchStart(state, action)
    case FETCH_NEWS_SUCCESS: return reduceFetchSuccess(state, action)
    case FETCH_NEWS_ERROR: return reduceFetchError(state, action)

    case FETCH_LATEST_NEWS_START: return reduceFetchStart(state, action)
    case FETCH_LATEST_NEWS_SUCCESS: return reduceFetchLatestSuccess(state, action)
    case FETCH_LATEST_NEWS_ERROR: return reduceFetchError(state, action)

    // fetch (recomms)
    case FETCH_NEWS_RECOMMS_START: return reduceFetchRecommsStart(state, action)
    case FETCH_NEWS_RECOMMS_SUCCESS: return reduceFetchRecommsSuccess(state, action)
    case FETCH_NEWS_RECOMMS_ERROR: return reduceFetchRecommsError(state, action)

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

function reduceFetchSuccess(state, action, append = true) {
  const { result, entities, link } = action

  const previousList = state.get('newsList')
  const resultList = new Immutable.List(result)

  const newsList = append ?
    previousList.concat(resultList).toOrderedSet().toList() :
    resultList.concat(previousList).toOrderedSet().toList()

  const newsListById = state
    .get('newsListById')
    .merge(entities.news)
    .mapKeys(k => Number(k) || k)

  return state.merge({
    newsList,
    newsListById,
    isFetching: false,
    didFetchFail: false,
    urlToFetch: link
  })
}

function reduceFetchLatestSuccess(state, action) {
  const size = action.result.length
  const previous = state.get('latestNewsToFetch')
  const reduced = reduceFetchSuccess(state, action, false)
  return reduced.set('latestNewsToFetch', previous - size)
}

function reduceFetchError(state) {
  return state.merge({ isFetching: false, didFetchFail: true })
}

function reduceFetchRecommsStart(state) {
  return state.set('isFetchingRecomms', true)
}

function reduceFetchRecommsSuccess(state, action) {
  const { result, entities } = action

  const previousList = state.get('recomms')
  const resultList = new Immutable.List(result)

  const recomms =
    previousList.concat(resultList).toOrderedSet().toList()

  const recommsById = state
    .get('recommsById')
    .merge(entities.news)
    .mapKeys(k => Number(k) || k)

  return state.merge({
    recomms,
    recommsById,
    isFetchingRecomms: false,
    didFetchingRecommsFailed: false,
  })
}

function reduceFetchRecommsError(state) {
  return state.merge({
    isFetchingRecomms: false,
    didFetchingRecommsFailed: true
  })
}

// ======
// Rating
// ======

function reduceRatingStart(state, action) {
  const newsId = Number(action.newsId) || action.newsId
  const { rating } = action

  const newsList = state.get('newsList')
  const newsListById = state.get('newsListById')
  const index = newsList.findIndex(n => n === newsId)
  const news = newsListById.get(newsId)

  const updated = news.set('userRating', rating)
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

function reduceRatingSuccess(state) {
  return state.merge({ isRating: false, didRatingFail: false })
}

function reduceRatingError(state) {
  return state.merge({ isRating: false, didRatingFail: true })
}

function reduceCancelRatingStart(state, action) {
  const newsId = Number(action.newsId) || action.newsId
  const newsListById = state.get('newsListById')
  const news = newsListById.get(newsId)

  const updated = news.set('userRating', null)
  const updatedNewsListById = newsListById.set(newsId, updated)
  return state.merge({
    newsListById: updatedNewsListById,
    isRating: true
  })
}

function reduceCancelRatingSuccess(state) {
  return state.merge({ isRating: false, didRatingFail: false })
}

function reduceCancelRatingError(state) {
  return state.merge({ isRating: false, didRatingFail: true })
}


// =============
// Notifications
// =============

function reduceCoverSuccess(state, action) {
  const { size } = action
  const previous = state.get('latestNewsToFetch')
  return state.set('latestNewsToFetch', previous + size)
}
