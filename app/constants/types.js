import _ from 'lodash'
import { PropTypes } from 'react'


// ==================
// Extended proptypes
// ==================

export const ValueLinkPropType = PropTypes.shape({
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array,
  ]),
  requestChange: PropTypes.func
})


// ================
// Scheme proptypes
// ================

export const UserPropType = PropTypes.shape({
  firstname: PropTypes.string,
  lastname: PropTypes.string,
})

export const NewsPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  owner: PropTypes.number.isRequired,
  src: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
})

export const SchedulePropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  cycle: PropTypes.number.isRequired,
  maxDepth: PropTypes.number,
  maxDistance: PropTypes.number,
  brothers: PropTypes.arrayOf(PropTypes.oneOfType(
    [PropTypes.string, PropTypes.number]
  )),
  status: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
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
    return instance.id.includes(UNSAVED_PREFIX)
  }
  throw new Error('Argument\'s should be number, string or object')
}


export const createSchedule = schedule => _.clone(schedule) || {
  id: _.uniqueId(UNSAVED_PREFIX),
  url: '',
  cycle: null,
  maxDepth: null,
  maxDistance: null,
  brothers: [],
  isActive: false,
  isUpdating: false,
}


export default {
  // types
  ValueLinkPropType,
  UserPropType,
  NewsPropType,
  SchedulePropType,
  // client side creators
  unsaved,
  createSchedule
}
