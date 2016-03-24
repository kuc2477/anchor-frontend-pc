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
          description="Maximum distance"
          max={MAX_DIST_RANGE_MAX}
          min={MAX_DIST_RANGE_MIN}
          defaultValue={MAX_DIST_DEFALT}
          value={value}
          onChange={requestChange}
        />
      </div>
    )
  }
}

