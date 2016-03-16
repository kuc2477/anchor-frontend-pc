import _ from 'lodash'
import React, { PropTypes } from 'react'
import Slider from 'material-ui/lib/slider'

import colors from '../../constants/colors'


export default class BaseSlider extends React.Component {
  static INACTIVE_LABEL_STYLE = {
    color: colors.INACTIVE
  };

  static ACTIVE_LABEL_STYLE = {
    color: colors.SECONDARY
  };

  constructor(props) {
    super(props)
    this.state = { isActive: false }
  }

  _getLabelStyle() {
    return this.state.isActive ?
      this.constructor.ACTIVE_LABEL_STYLE :
      this.constructor.INACTIVE_LABEL_STYLE
  }

  _onDragStart = (f) => (arg) => {
    this.setState({ isActive: true })
    if (f) {
      f(arg)
    }
  };

  _onDragStop = (f) => (arg) => {
    this.setState({ isActive: false })
    if (f) {
      f(arg)
    }
  };

  render() {
    const labelStyle = this._getLabelStyle()
    const {
      description,
      onDragStart: onDragStartProp,
      onDragStop: onDragStopProp, ...rest
    } = this.props

    const onDragStart = this._onDragStart(onDragStartProp)
    const onDragStop = this._onDragStop(onDragStopProp)

    return (
      <div>
        <small><div style={labelStyle}>{description}</div></small>
        <Slider onDragStart={onDragStart} onDragStop={onDragStop} {...rest} />
      </div>
    )
  }
}
