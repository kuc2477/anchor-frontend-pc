import _ from 'lodash'
import faker from 'faker'
import { normalize } from 'normalizr'
import { Schemas } from '../../app/middlewares/api'
import schedules, { initialState } from '../../app/reducers/schedules'
import {
  addSchedule,
  removeSchedule,
  updateSchedule,
  setBoard,
  FETCH_SCHEDULES_START,
  FETCH_SCHEDULES_SUCCESS,
  FETCH_SCHEDULES_ERROR,
  saveScheduleStart,
  saveScheduleSuccess,
  saveScheduleError,
  deleteScheduleStart,
  deleteScheduleSuccess,
  deleteScheduleError
} from '../../app/actions/schedules.js'


describe('schedules reducer', () => {
  let fetchedSchedules
  let fetchStartAction
  let fetchSuccessAction
  let fetchErrorAction

  beforeEach(() => {
    function createFakeSchedule() {
      return {
        id: faker.random.uuid(),
        url: faker.internet.url(),
        cycle: 60,
        maxDepth: null,
        maxDist: null,
        brothers: [faker.internet.url()],
        isActive: false,
        status: 'PENDING'
      }
    }

    fetchedSchedules = _.times(5, createFakeSchedule)
    fetchStartAction = { type: FETCH_SCHEDULES_START }
    fetchErrorAction = { type: FETCH_SCHEDULES_ERROR }
    fetchSuccessAction = {
      type: FETCH_SCHEDULES_SUCCESS,
      link: 'testlink',
      result: normalize(fetchedSchedules, Schemas.SCHEDULES).result,
      entities: normalize(fetchedSchedules, Schemas.SCHEDULES).entities
    }
  })

  describe('after schedule fetch start', () => {
    it('should be fetching', () => {
      const after = schedules(initialState, fetchStartAction)
      expect(after.get('isFetching')).toBeTruthy()
    })
  })

  describe('after schedule fetch success', () => {
  })

  describe('after schedule fetch error', () => {
  })

  describe('after schedule save start', () => {
  })

  describe('after schedule save success', () => {
  })

  describe('after schedule save error', () => {
  })

  describe('after schedule delete start', () => {
  })

  describe('after schedule delete success', () => {
  })

  describe('after schedule delete error', () => {
  })

  describe('after schedule update', () => {
  })

  describe('after schedule select', () => {
  })

  describe('after schedule add', () => {
  })

  describe('after schedule remove', () => {
  })

  describe('after board set', () => {
  })
})
