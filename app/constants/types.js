import { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

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

export const UserPropType = ImmutablePropTypes.contains({
  id: PropTypes.number,
  username: PropTypes.string
})

export const NewsPropType = ImmutablePropTypes.contains({
  id: PropTypes.number,
  site: PropTypes.number,
  src: PropTypes.number,
  url: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string
})

export const SitePropType = ImmutablePropTypes.contains({
  id: PropTypes.number,
  url: PropTypes.string
})

export const SchedulePropType = ImmutablePropTypes.contains({
  id: PropTypes.number,
  site: PropTypes.number,
  cycle: PropTypes.number,
  maxDepth: PropTypes.number,
  maxDistance: PropTypes.number,
  brothers: ImmutablePropTypes.listOf(PropTypes.string)
})


export default {
  ValueLinkPropType,
  UserPropType,
  NewsPropType,
  SitePropType,
  SchedulePropType
}
