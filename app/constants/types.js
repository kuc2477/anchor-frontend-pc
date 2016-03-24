import _ from 'lodash'
import { PropTypes } from 'react'
import { CYCLE_OPTIONS } from './arrays'

// ==================
// Extended proptypes
// ==================

export const ValueLinkPropType = PropTypes.shape({
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
  requestChange: PropTypes.func.isRequired
})

// ================
// Scheme proptypes
// ================

export const UserPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired
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
  isActive: PropTypes.bool.isRequired,
  isUpdating: PropTypes.bool.isRequired,
})


// ==============================
// Client side instance creators
// ==============================

const UNSAVED_PREFIX = 'unsaved-'
export const unsaved = (instance) => {
  if (typeof instance === 'number') {
    return false
  }
  const error = 'Argument\'s type should be one of number, string or object'
  return typeof instance === 'string' ? instance.includes(UNSAVED_PREFIX) :
    typeof instance === 'object' ? instance.id.includes(UNSAVED_PREFIX) :
      (()=>{ throw new Error(error) })()
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
