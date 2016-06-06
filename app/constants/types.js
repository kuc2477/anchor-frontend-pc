import _ from 'lodash'
import Immutable from 'immutable'
import { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'


// ==================
// Extended proptypes
// ==================

export const ValueLinkPropType = PropTypes.shape({
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array,
    PropTypes.bool,
  ]),
  requestChange: PropTypes.func
})


// ================
// Scheme proptypes
// ================

export const UserPropType = ImmutablePropTypes.contains({
  id: PropTypes.number,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
})

export const NewsPropType = ImmutablePropTypes.contains({
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  parent: PropTypes.number,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string,
  published: PropTypes.string,
  summary: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  userRating: PropTypes.bool
})

export const ScheduleOptionPropType = ImmutablePropTypes.contains({
  urlWhitelist: ImmutablePropTypes.list,
  urlBlacklist: ImmutablePropTypes.list,
  maxVisit: PropTypes.number,
  maxDist: PropTypes.number,
})

export const SchedulePropType = ImmutablePropTypes.contains({
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  name: PropTypes.string.isRequired,
  enabled: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  cycle: PropTypes.number.isRequired,
  state: PropTypes.string.isRequired,
  options: ScheduleOptionPropType.isRequired,
})


// ==============================
// Client side instance creators
// ==============================

const UNSAVED_PREFIX = 'unsaved-'
export const unsaved = (instance) => {
  if (typeof instance === 'number') {
    return false
  }
  if (typeof instance === 'string') {
    return instance.includes(UNSAVED_PREFIX)
  }
  if (typeof instance === 'object') {
    return instance.id ?
      instance.id.toString().includes(UNSAVED_PREFIX) :
        instance.get('id').toString().includes(UNSAVED_PREFIX)
  }
  throw new Error('Argument\'s type should be number, string or object')
}


export const createSchedule =
  schedule => schedule || Immutable.fromJS({
    id: _.uniqueId(UNSAVED_PREFIX),
    url: '',
    name: '',
    enabled: false,
    state: 'PENDING',
    cycle: null,
    options: {
      urlBlacklist: [],
      urlWhitelist: [],
      maxDist: null,
      maxVisit: null,
    },
  })


export default {
  // types
  ValueLinkPropType,
  UserPropType,
  NewsPropType,
  SchedulePropType,
  // client side creators
  unsaved,
  createSchedule,
}
