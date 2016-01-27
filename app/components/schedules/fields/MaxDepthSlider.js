import React, { PropTypes } from 'react'
import Slider from 'material-ui/lib/slider'

import {
  MAX_DEPTH_DEFAULT,
  MAX_DEPTH_RANGE_MIN,
  MAX_DEPTH_RANGE_MAX,
} from '../../../constants/numbers'


export default class MaxDepthSlider extends React.Component {
  render() {
    return (
      <div>
        Maximum depth
        <Slider
          step={1}
          max={MAX_DEPTH_RANGE_MAX}
          min={MAX_DEPTH_RANGE_MIN}
          defaultValue={MAX_DEPTH_DEFAULT}
        />
      </div>
    )
  }
}

