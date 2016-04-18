import Immutable from 'immutable'

import urls from '../modules/urls'
import {
  FETCH_NEWS_START,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_ERROR
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
    case FETCH_NEWS_START: return state
    case FETCH_NEWS_SUCCESS: return state
    case FETCH_SCHEDULES_ERROR: return state
  }
}
