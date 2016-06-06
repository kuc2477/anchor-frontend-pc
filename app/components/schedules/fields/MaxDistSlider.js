import React, { PropTypes } from 'react'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import BaseSlider from '../../base/BaseSlider'
import { ValueLinkPropType } from '../../../constants/types'
import {
  MAX_DIST_DEFALT,
  MAX_DIST_RANGE_MIN,
  MAX_DIST_RANGE_MAX
} from '../../../constants/numbers'

class MaxDistSlider extends React.Component {
  static propTypes = {
    valueLink: ValueLinkPropType.isRequired,
    sliderStyle: PropTypes.object,
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
        description="Maximum Reporter Distance"
        max={MAX_DIST_RANGE_MAX}
        min={MAX_DIST_RANGE_MIN}
        defaultValue={MAX_DIST_DEFALT}
        value={value}
        onChange={requestChange}
      />
    )
  }
}


export default immutableRenderDecorator(MaxDistSlider)
