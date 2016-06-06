import React, { PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import BaseSlider from '../../base/BaseSlider'
import { ValueLinkPropType } from '../../../constants/types'
import {
  MAX_VISIT_DEFAULT,
  MAX_VISIT_RANGE_MAX,
  MAX_VISIT_RANGE_MIN,
} from '../../../constants/numbers'


export default class MaxVisitSlider extends React.Component {
  static propTypes = {
    valueLink: ValueLinkPropType.isRequired,
    sliderStyle: PropTypes.object,
    style: PropTypes.object,
  };

  constructor(props) {
    super(props)
    this.shouldComponentUpdate =
      PureRenderMixin.shouldComponentUpdate.bind(this)
  }

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
        description="Maximum Reporter Visit"
        defaultValue={MAX_VISIT_DEFAULT}
        max={MAX_VISIT_RANGE_MAX}
        min={MAX_VISIT_RANGE_MIN}
        value={value}
        onChange={requestChange}
      />
    )
  }
}
