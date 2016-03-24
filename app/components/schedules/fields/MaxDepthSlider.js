import React, { PropTypes } from 'react'

import BaseSlider from '../../base/BaseSlider'
import { ValueLinkPropType } from '../../../constants/types'
import {
  MAX_DEPTH_DEFAULT,
  MAX_DEPTH_RANGE_MIN,
  MAX_DEPTH_RANGE_MAX,
} from '../../../constants/numbers'


export default class MaxDepthSlider extends React.Component {
  static propTypes = {
    vlink: ValueLinkPropType.isRequired
  };

  static SLIDER_STYLE = {
    width: '73%'
  };

  render() {
    const { SLIDER_STYLE } = this.constructor
    const { style } = this.props
    const { value, requestChange } = this.props.vlink

    return (
      <div style={style}>
        <BaseSlider
          step={1}
          style={SLIDER_STYLE}
          description="Maximum depth"
          defaultValue={MAX_DEPTH_DEFAULT}
          max={MAX_DEPTH_RANGE_MAX}
          min={MAX_DEPTH_RANGE_MIN}
          value={value}
          onChange={requestChange}
        />
      </div>
    )
  }
}

