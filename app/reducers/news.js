import Immutable from 'immutable'

import urls from '../modules/urls'
import {
  FETCH_NEWS_START,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_ERROR,
  FETCH_LATEST_NEWS_START,
  FETCH_LATEST_NEWS_SUCCESS,
  FETCH_LATEST_NEWS_ERROR,
  FETCH_NEWS_RECOMMENDATIONS_START,
  FETCH_NEWS_RECOMMENDATIONS_SUCCESS,
  FETCH_NEWS_RECOMMENDATIONS_ERROR,
  RATING_START,
  RATING_SUCCESS,
  RATING_ERROR,
  CANCEL_RATING_START,
  CANCEL_RATING_SUCCESS,
  CANCEL_RATING_ERROR
} from '../actions/news'
import { LOGOUT } from '../actions/auth'


export const initialState = new Immutable.Map({
  // news
  newsList: new Immutable.List(),
  newsListById: new Immutable.Map(),
  recommendations: new Immutable.List(),
  recommendationsById: new Immutable.Map(),
  // rating status
  isRating: false,
  didRatingFail: false,
  // fetching status
  isFetching: false,
  didFetchFail: false,
  // fetching recommendations status
  isFetchingRecommendations: false,
  didFetchingRecommendationsFail: false,
  // url
  urlToFetch: urls.news(),
})

export default (state = initialState, action) => {
  switch (action.type) {
    // fetch
    case FETCH_NEWS_START:
    case FETCH_LATEST_NEWS_START:
      return reduceFetchStart(state, action)

    case FETCH_NEWS_SUCCESS: return reduceFetchSuccess(state, action, true)
    case FETCH_LATEST_NEWS_SUCCESS: return reduceFetchSuccess(state, action, false)

    case FETCH_LATEST_NEWS_ERROR:
    case FETCH_NEWS_ERROR: return reduceFetchError(state, action)

    // fetch recommendations
    case FETCH_NEWS_RECOMMENDATIONS_START:
      return reduceFetchRecommendationsStart(state, action)

    case FETCH_NEWS_RECOMMENDATIONS_SUCCESS:
      return reduceFetchRecommendationsSuccess(state, action)

    case FETCH_NEWS_RECOMMENDATIONS_ERROR:
      return reduceFetchRecommendationsError(state, action)

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

function reduceFetchError(state) {
  return state.merge({ isFetching: false, didFetchFail: true })
}

function reduceFetchRecommendationsStart(state) {
  return state.set('isFetchingRecommendations', true)
}

function reduceFetchRecommendationsSuccess(state, action) {
  const { result, entities } = action

  const previousList = state.get('recommendations')
  const resultList = new Immutable.List(result)

  const recommendations =
    previousList.concat(resultList).toOrderedSet().toList()

  const recommendationsById = state
    .get('recommendationsById')
    .merge(entities.news)
    .mapKeys(k => Number(k) || k)

  return state.merge({
    recommendations,
    recommendationsById,
    isFetchingRecommendations: false,
    didFetchingRecommendationsFail: false,
  })
}

function reduceFetchRecommendationsError(state) {
  return state.merge({
    isFetchingRecommendations: false,
    didFetchingRecommendationsFail: true
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
