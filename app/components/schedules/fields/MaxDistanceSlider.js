import React, { PropTypes } from 'react'
import Slider from 'material-ui/lib/slider'

import {
  MAX_DIST_DEFALT,
  MAX_DIST_RANGE_MIN,
  MAX_DIST_RANGE_MAX
} from '../../../constants/numbers'

export default class MaxDistanceSlider extends React.Component {
  render() {
    return (
      <div>
        Maximum distance
        <Slider
          step={1}
          max={MAX_DIST_RANGE_MAX}
          min={MAX_DIST_RANGE_MIN}
          defaultValue={MAX_DIST_DEFALT}
        />
      </div>
    )
  }
}

