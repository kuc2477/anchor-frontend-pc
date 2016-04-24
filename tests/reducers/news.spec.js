import _ from 'lodash'
import Immutable from 'immutable'
import { normalize } from 'normalizr'

import { createFakeNews } from '../fixtures/news'
import { Schemas } from '../../app/middlewares/api'
import {
  FETCH_NEWS_START,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_ERROR,
  ratingStart,
  ratingSuccess,
  ratingError,
  cancelRatingStart,
  cancelRatingSuccess,
  cancelRatingError
} from '../../app/actions/news'
import reducer, { initialState } from '../../app/reducers/news'


describe('news reducer', () => {
  // =====
  // Fetch
  // =====

  describe('after news fetch start', () => {
    it('should be fetching', () => {
      const previous = initialState
      const after = reducer(initialState, { type: FETCH_NEWS_START })
      expect(previous.get('isFetching')).toBeFalsy()
      expect(after.get('isFetching')).toBeTruthy()
    })
  })

  describe('after news fetch success', () => {
    let action
    let fetched
    let previous
    let after

    beforeEach(() => {
      fetched = _.times(5, createFakeNews)
      action = {
        type: FETCH_NEWS_SUCCESS,
        link: 'testlink',
        result: normalize(fetched, Schemas.NEWS_LIST).result,
        entities: normalize(fetched, Schemas.NEWS_LIST).entities
      }
      previous = reducer(
        initialState.merge({ didFetchFail: true }),
        { type: FETCH_NEWS_START }
      )
      after = reducer(previous, action)
    })

    it('should not be fetching', () => {
      expect(previous.get('isFetching')).toBeTruthy()
      expect(after.get('isFetching')).toBeFalsy()
    })

    it('should set link', () => {
      expect(after.get('urlToFetch')).toEqual(action.link)
    })

    it('should clear previously marked failure', () => {
      expect(previous.get('didFetchFail')).toBeTruthy()
      expect(after.get('didFetchFail')).toBeFalsy()
    })

    it('should merge normalized schedules', () => {
      expect(previous.get('newsList').count()).toEqual(0)
      expect(after.get('newsList').count()).toEqual(fetched.length)
      expect(after.get('newsList').equals(
        Immutable.fromJS(action.result)
      )).toBeTruthy()
      expect(
        after.get('newsListById').equals(
          Immutable.fromJS(action.entities.news)
        )).toBeTruthy()
    })
  })

  describe('after news fetch error', () => {
    let previous
    let after

    beforeEach(() => {
      previous = reducer(initialState, { type: FETCH_NEWS_START })
      after = reducer(previous, { type: FETCH_NEWS_ERROR })
    })

    it('should not be fetching', () => {
      expect(previous.get('isFetching')).toBeTruthy()
      expect(after.get('isFetching')).toBeFalsy()
    })

    it('should mark it\'s failure', () => {
      expect(previous.get('didFetchFail')).toBeFalsy()
      expect(after.get('didFetchFail')).toBeTruthy()
    })
  })

  // ======
  // Rating
  // ======

  describe('news rating', () => {
    let fetched
    let previous
    let rated

    beforeEach(() => {
      fetched = _.times(5, createFakeNews)
      previous = reducer(initialState, {
        type: FETCH_NEWS_SUCCESS,
        link: 'testlink',
        result: normalize(fetched, Schemas.NEWS_LIST).result,
        entities: normalize(fetched, Schemas.NEWS_LIST).entities
      })
      rated = fetched[0]
    })

    describe('after positive news rating started', () => {
      let after

      beforeEach(() => {
        after = reducer(previous, ratingStart(rated.id, true))
      })

      it('should be rating', () => {
        expect(after.get('isRating')).toBeTruthy()
      })

      it('news should be set positive', () => {
        expect(
          after
          .get('newsListById').get(rated.id)
          .get('currentUserRating')
        ).toEqual(true)
      })
    })

    describe('after negative news rating started', () => {
      let after

      beforeEach(() => {
        after = reducer(previous, ratingStart(rated.id, false))
      })

      it('should be rating', () => {
        expect(after.get('isRating')).toBeTruthy()
      })

      it('news should be removed from store', () => {
        expect(previous.get('newsList').findIndex(n => n === rated.id)).toEqual(0)
        expect(previous.get('newsListById').has(rated.id)).toEqual(false)

        expect(after.get('newsList').findIndex(n => n === rated.id)).toEqual(-1)
        expect(after.get('newsListById').has(rated.id)).toBeFalsy()
      })
    })

    describe('after news rating successed', () => {
      let after

      beforeEach(() => {
        previous = reducer(previous, ratingStart(rated.id, true)).merge({
          didRatingFail: true
        })
        after = reducer(previous, ratingSuccess())
      })

      it('should not be rating', () => {
        expect(previous.get('isRating')).toBeTruthy()
        expect(after.get('isRating')).toBeFalsy()
      })

      it('should clear previous rating failure flag', () => {
        expect(previous.get('didRatingFail')).toBeTruthy()
        expect(after.get('didRatingFail')).toBeFalsy()
      })
    })

    describe('after news rating failed', () => {
      let after

      beforeEach(() => {
        previous = reducer(previous, ratingStart(rated.id, true))
        after = reducer(previous, ratingError())
      })

      it('should not be rating', () => {
        expect(previous.get('isRating')).toBeTruthy()
        expect(after.get('isRating')).toBeFalsy()
      })

      it('should set rating failure flag', () => {
        expect(previous.get('didRatingFail')).toBeFalsy()
        expect(after.get('didRatingFail')).toBeTruthy()
      })
    })

    describe('after news rating cancelation started', () => {
      let canceling
      let after

      beforeEach(() => {
        canceling = previous.get('newsList').get(0)
        after = reducer(previous, cancelRatingStart(canceling))
      })

      it('rating status should be null', () => {
        expect(
          after
          .get('newsListById')
          .get(canceling)
          .get('currentUserRating')
        ).toBeNull()
      })
    })

    describe('after news rating cancelation successed', () => {
      let canceling
      let after

      beforeEach(() => {
        canceling = previous.get('newsList').get(0)
        previous = reducer(previous, cancelRatingStart(canceling)).merge({
          didRatingFail: true
        })
        after = reducer(previous, cancelRatingSuccess())
      })

      it('should not be rating', () => {
        expect(previous.get('didRatingFail')).toBeTruthy()
        expect(after.get('isRating')).toBeFalsy()
      })

      it('should clear previous failure flag', () => {
        expect(previous.get('didRatingFail')).toBeTruthy()
        expect(after.get('didRatingFail')).toBeFalsy()
      })
    })

    describe('after news rating cancelation failed', () => {
      let canceling
      let after

      beforeEach(() => {
        canceling = previous.get('newsList').get(0)
        previous = reducer(previous, cancelRatingStart(canceling))
        after = reducer(previous, cancelRatingError())
      })

      it('should not be rating', () => {
        expect(previous.get('isRating')).toBeTruthy()
        expect(after.get('isRating')).toBeFalsy()
      })

      it('should set failure flag', () => {
        expect(previous.get('didRatingFail')).toBeFalsy()
        expect(after.get('didRatingFail')).toBeTruthy()
      })
    })
  })
})
