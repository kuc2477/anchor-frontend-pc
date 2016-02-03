import React, { PropTypes } from 'react'

import BaseSlider from '../../base/BaseSlider'
import {
  MAX_DEPTH_DEFAULT,
  MAX_DEPTH_RANGE_MIN,
  MAX_DEPTH_RANGE_MAX,
} from '../../../constants/numbers'


export default class MaxDepthSlider extends React.Component {
  render() {
    return (
      <BaseSlider
        step={1}
        description="Maximum depth"
        max={MAX_DEPTH_RANGE_MAX}
        min={MAX_DEPTH_RANGE_MIN}
        defaultValue={MAX_DEPTH_DEFAULT}
      />
    )
  }
}

