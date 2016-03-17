import { PropTypes } from 'react'

// ==================
// Extended proptypes
// ==================

export const ValueLinkPropType = PropTypes.shape({
  value: PropTypes.string.isRequired,
  requestChange: PropTypes.func.isRequired
})

// ================
// Scheme proptypes
// ================

export const UserPropType = PropTypes.shape({
  id: PropTypes.number,
  username: PropTypes.string
})

export const NewsPropType = PropTypes.shape({
  id: PropTypes.number,
  site: PropTypes.number,
  src: PropTypes.number,
  url: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string
})

export const SchedulePropType = PropTypes.shape({
  id: PropTypes.number,
  site: PropTypes.number,
  cycle: PropTypes.number,
  maxDepth: PropTypes.number,
  maxDistance: PropTypes.number,
  brothers: PropTypes.arrayOf(PropTypes.string)
})


export default {
  ValueLinkPropType,
  UserPropType,
  NewsPropType,
  SchedulePropType
}
