import React, { PropTypes } from 'react'

import BaseSlider from '../../base/BaseSlider'
import { ValueLinkPropType } from '../../../constants/types'
import {
  MAX_DIST_DEFALT,
  MAX_DIST_RANGE_MIN,
  MAX_DIST_RANGE_MAX
} from '../../../constants/numbers'

export default class MaxDistanceSlider extends React.Component {
  static propTypes = {
    valueLink: ValueLinkPropType.isRequired,
    style: PropTypes.object,
  };

  static STYLE = {
  };

  static SLIDER_STYLE = {
    width: '73%'
  };

  render() {
    const { STYLE, SLIDER_STYLE } = this.constructor
    const { style, sliderStyle } = this.props
    const mergedStyle = Object.assign({}, STYLE, style)
    const mergedSliderStyle = Object.assign({}, SLIDER_STYLE, sliderStyle)
    const { value, requestChange } = this.props.valueLink

    return (
      <BaseSlider
        step={1}
        style={mergedStyle}
        sliderStyle={mergedSliderStyle}
        description="Maximum distance"
        max={MAX_DIST_RANGE_MAX}
        min={MAX_DIST_RANGE_MIN}
        defaultValue={MAX_DIST_DEFALT}
        value={value}
        onChange={requestChange}
      />
    )
  }
}
