import _ from 'lodash'
import faker from 'faker'
import Immutable from 'immutable'
import { normalize } from 'normalizr'

import { createFakeSchedule } from '../fixtures/schedules'
import { Schemas } from '../../app/middlewares/api'
import reducer, { initialState } from '../../app/reducers/schedules'
import {
  addSchedule,
  removeSchedule,
  updateSchedule,
  selectSchedule,
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
import { unsaved, createSchedule } from '../../app/constants/types'
import {
  DASH_BOARD_GENERAL_SETTINGS,
  DASH_BOARD_ADVANCED_SETTINGS
} from '../../app/constants/strings'


describe('schedules reducer', () => {
  let fetchedSchedules
  let fetchStartAction
  let fetchSuccessAction
  let fetchErrorAction

  beforeEach(() => {
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

  describe('after schedule update', () => {
    it('should overwrite currently selected schedule\'s values', () => {
      const previousSchedule = createFakeSchedule()
      const previousSchedules = [
        ..._.times(5, createFakeSchedule), previousSchedule
      ]

      const updated = Object.assign({}, previousSchedule, {
        url: 'updatedurl',
        cycle: 999,
        maxDepth: 3,
        maxDist: 4,
        brothers: _.times(3, faker.internet.url),
        isActive: true,
        status: 'STARTED'
      })

      const previous = initialState.merge({
        schedule: previousSchedule.id,
        schedules: normalize(previousSchedules, Schemas.SCHEDULES).result,
        schedulesById: normalize(previousSchedules, Schemas.SCHEDULES).entities.schedule
      })

      const after = reducer(previous, updateSchedule(updated))
      expect(after.get('schedulesById').get(after.get('schedule')).equals(updated))
    })
  })

  describe('after schedule select', () => {
    it('should select the schedule', () => {
      const previousSchedule = createFakeSchedule()
      const nextSchedule = createFakeSchedule()
      const previousSchedules = [
        ..._.times(5, createFakeSchedule), previousSchedule, nextSchedule
      ]

      const previous = initialState.merge({
        schedule: previousSchedule.id,
        schedules: normalize(previousSchedules, Schemas.SCHEDULES).result,
        schedulesById: normalize(previousSchedules, Schemas.SCHEDULES).entities.schedule
      })

      expect(previous.get('schedule')).toEqual(previousSchedule.id)
      const after = reducer(previous, selectSchedule(nextSchedule.id))
      expect(after.get('schedule')).toEqual(nextSchedule.id)
    })
  })

  describe('after schedule add', () => {
    it('should add unsaved schedule if no argument given', () => {
      expect(initialState.get('schedule')).toBeNull()
      const after = reducer(initialState, addSchedule())
      const schedule = after.get('schedule')
      const entitiy = after.get('schedulesById').get(schedule)
      expect(schedule).not.toBeNull()
      expect(unsaved(entitiy)).toBeTruthy()
    })

    it('should add passed schedule if given', () => {
      const toAdd = createFakeSchedule()
      const after = reducer(initialState, addSchedule(toAdd))
      const schedule = after.get('schedule')
      const entitiy = after.get('schedulesById').get(schedule)
      expect(entitiy.equals(Immutable.fromJS(toAdd))).toBeTruthy()
    })

    it('should not add schedule if already unsaved schedule exists', () => {
      const toAdd = createFakeSchedule()
      const previousSchedule = createSchedule()
      const previousSchedules = [
        ..._.times(5, createFakeSchedule), previousSchedule.id
      ]

      const previous = initialState.merge({
        schedule: previousSchedule.id,
        schedules: normalize(previousSchedules, Schemas.SCHEDULES).result,
        schedulesById: normalize(previousSchedules, Schemas.SCHEDULES).entities.schedule
      })

      const after = reducer(previous, addSchedule(toAdd))
      expect(previous.equals(after)).toBeTruthy()
    })

    it('added schedule should be selected', () => {
      const toAdd = createSchedule()
      const previousSchedule = createFakeSchedule()
      const previousSchedules = [
        ..._.times(5, createFakeSchedule), previousSchedule
      ]

      const previous = initialState.merge({
        schedule: previousSchedule,
        schedules: normalize(previousSchedules, Schemas.SCHEDULES).result,
        schedulesById: normalize(previousSchedules, Schemas.SCHEDULES).entities.schedule
      })
      const after = reducer(previous, addSchedule(toAdd))

      expect(previous.get('schedule')).not.toEqual(toAdd.id)
      expect(after.get('schedule')).toEqual(toAdd.id)
      expect(after.get('schedulesById').get(after.get('schedule')).equals(
        Immutable.fromJS(toAdd)
      )).toBeTruthy()
    })
  })

  describe('after schedule remove', () => {
    let toRemove
    let previousSchedules
    let previous
    let after

    beforeEach(() => {
       toRemove = createFakeSchedule()
       previousSchedules = [
         ..._.times(5, createFakeSchedule), toRemove
       ]
       previous = initialState.merge({
         schedule: toRemove.id,
         schedules: normalize(previousSchedules, Schemas.SCHEDULES).result,
         schedulesById: normalize(previousSchedules, Schemas.SCHEDULES).entities.schedule
       })
       after = reducer(previous, removeSchedule(toRemove.id))
    })

    it('should remove the schedule from both the list of ids and map of ' +
       'entities', () => {
         expect(previous.get('schedules').includes(toRemove.id)).toBeTruthy()
         expect(previous.get('schedulesById').has(toRemove.id)).toBeTruthy()
         expect(after.get('schedules').includes(toRemove.id)).toBeFalsy()
     })

    it('should select last available schedule', () => {
      expect(after.get('schedule')).toEqual(previousSchedules[4].id)
    })
  })

  describe('after board set', () => {
    it('should set the given board type', () => {
      expect(initialState.get('board')).toEqual(DASH_BOARD_GENERAL_SETTINGS)
      const after = reducer(initialState, setBoard(DASH_BOARD_ADVANCED_SETTINGS))
      expect(after.get('board')).toEqual(DASH_BOARD_ADVANCED_SETTINGS)
    })
  })

  describe('after schedule fetch start', () => {
    it('should be fetching', () => {
      expect(initialState.get('isFetching')).toBeFalsy()
      const after = reducer(initialState, fetchStartAction)
      expect(after.get('isFetching')).toBeTruthy()
    })
  })

  describe('after schedule fetch success', () => {
    it('should not be fetching', () => {
      const previous = initialState.merge({ isFetching: true })
      const after = reducer(previous, fetchSuccessAction)
      expect(after.get('isFetching')).toBeFalsy()
    })

    it('should clear previously marked failure', () => {
      const previous = initialState.merge({ didFetchFail: true })
      const after = reducer(previous, fetchSuccessAction)
      expect(after.get('didFetchFail')).toBeFalsy()
    })

    it('should merge normalized schedules', () => {
      const previous = reducer(initialState, fetchStartAction)
      expect(previous.get('isFetching')).toBeTruthy()
      expect(previous.get('schedules').count()).toEqual(0)

      const after = reducer(previous, fetchSuccessAction)

      const schedules = after.get('schedules')
      const schedulesById = after.get('schedulesById')
      const result = fetchSuccessAction.result
      const entities = fetchSuccessAction.entities.schedule

      expect(after.get('isFetching')).toBeFalsy()
      expect(schedules.equals(Immutable.fromJS(result)))
      expect(schedulesById.equals(Immutable.fromJS(entities))).toBeTruthy()
    })
  })

  describe('after schedule fetch error', () => {
    it('should not be fetching', () => {
      const previous = initialState.merge({ isFetching: true })
      const after = reducer(previous, fetchErrorAction)
      expect(after.get('isFetching')).toBeFalsy()
    })

    it('should mark failure', () => {
      const previous = initialState.merge({ isFetching: true })
      const after = reducer(previous, fetchErrorAction)
      expect(after.get('didFetchFail')).toBeTruthy()
    })
  })

  describe('after schedule save start', () => {
    it('should mark as saving', () => {
      expect(initialState.get('isSaving')).toBeFalsy()
      const after = reducer(initialState, saveScheduleStart())
      expect(after.get('isSaving')).toBeTruthy()
    })
  })

  describe('after schedule save success', () => {
    let toBeSaved
    let previousSchedules
    let response
    let previous
    let after

    beforeEach(() => {
      toBeSaved = createSchedule()
      response = createFakeSchedule()
      previousSchedules = [
        ..._.times(5, createFakeSchedule), toBeSaved
      ]

      previous = initialState.merge({
        isSaving: true,
        didSaveFail: true,
        schedule: toBeSaved.id,
        schedules: normalize(previousSchedules, Schemas.SCHEDULES).result,
        schedulesById: normalize(previousSchedules, Schemas.SCHEDULES).entities.schedule
      })

      after = reducer(previous, saveScheduleSuccess(toBeSaved, response))
    })

    it('should update saved schedule with values from response', () => {
      const index = previous.get('schedules').findIndex(
        schedule => schedule.id === toBeSaved.id
      )
      expect(after.get('schedules').includes(toBeSaved.id)).toBeFalsy()
      expect(after.get('schedules').includes(response.id)).toBeTruthy()
      expect(after.get('schedulesById').get(response.id).equals(
        Immutable.fromJS(response)
      )).toBeTruthy()
      expect(after.get('schedule')).toEqual(response.id)
    })

    it('should clear previous save failure', () => {
      expect(after.get('didSaveFail')).toBeFalsy()
    })

    it('shouldn\'t be saving ', () => {
      expect(after.get('isSaving')).toBeFalsy()
    })
  })

  describe('after schedule save error', () => {
    let previous
    let after

    beforeEach(() => {
      previous = initialState.merge({
        isSaving: true,
        didSaveFail: false
      })
      after = reducer(previous, saveScheduleError())
    })

    it('shouldn\'t be saving', () => {
      expect(previous.get('isSaving')).toBeTruthy()
      expect(after.get('isSaving')).toBeFalsy()
    })

    it('should mark it\'s failure', () => {
      expect(previous.get('didSaveFail')).toBeFalsy()
      expect(after.get('didSaveFail')).toBeTruthy()
    })

  })

  describe('after schedule delete start', () => {
    it('should be deleting', () => {
      const after = reducer(initialState, deleteScheduleStart())
      expect(after.get('isDeleting')).toBeTruthy()
    })
  })

  describe('after schedule delete success', () => {
    let toDelete
    let previousSchedules
    let previous
    let after

    beforeEach(() => {
      toDelete = createFakeSchedule()
      previousSchedules = [
        ..._.times(2, createFakeSchedule),
        toDelete,
        ..._.times(3, createFakeSchedule)
      ]
      previous = initialState.merge({
        didDeleteFail: true,
        isDeleting: true,
        schedules: normalize(previousSchedules, Schemas.SCHEDULES).result,
        schedulesById: normalize(previousSchedules, Schemas.SCHEDULE).entities.schedule
      })

      after = reducer(previous, deleteScheduleSuccess(toDelete.id))
    })

    it('shouldn\'t be deleting', () => {
      expect(after.get('isDeleting')).toBeFalsy()
    })

    it('should remove from both list of schedule ids and entities', () => {
      expect(after.get('schedules').includes(toDelete.id)).toBeFalsy()
      expect(after.get('schedulesById').has(toDelete.id)).toBeFalsy()
    })

    it('should select available adjecent schedule among rest of the schedules', () => {
      expect(after.get('schedule')).toEqual(previousSchedules[1].id)
    })

    it('should clear deletion failure status', () => {
      expect(after.get('didDeleteFail')).toBeFalsy()
    })
  })

  describe('after schedule delete error', () => {
    let previous
    let after

    beforeEach(() => {
      previous = initialState.merge({ isDeleting: true })
      after = reducer(previous, deleteScheduleError())
    })

    it('shouldn\'t be deleting', () => {
      expect(previous.get('isDeleting')).toBeTruthy()
      expect(after.get('isDeleting')).toBeFalsy()
    })

    it('should mark it\'s failure', () => {
      expect(previous.get('didDeleteFail')).toBeFalsy()
      expect(after.get('didDeleteFail')).toBeTruthy()
    })
  })
})
