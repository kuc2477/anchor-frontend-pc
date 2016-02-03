import React, { PropTypes } from 'react'

import BaseSlider from '../../base/BaseSlider'
import {
  MAX_DIST_DEFALT,
  MAX_DIST_RANGE_MIN,
  MAX_DIST_RANGE_MAX
} from '../../../constants/numbers'

export default class MaxDistanceSlider extends React.Component {
  render() {
    return (
      <BaseSlider
        step={1}
        description="Maximum distance"
        max={MAX_DIST_RANGE_MAX}
        min={MAX_DIST_RANGE_MIN}
        defaultValue={MAX_DIST_DEFALT}
      />
    )
  }
}

