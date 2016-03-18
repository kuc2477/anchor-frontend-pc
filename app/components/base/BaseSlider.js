import _ from 'lodash'
import React, { PropTypes } from 'react'
import Slider from 'material-ui/lib/slider'

import colors from '../../constants/colors'


export default class BaseSlider extends React.Component {
  static STYLE = {
    marginTop: 20,
    marginBottom: 20
  };

  static INACTIVE_LABEL_STYLE = {
    color: colors.INACTIVE,
    fontSize: 13,
    userSelect: 'none'
  };

  static ACTIVE_LABEL_STYLE = {
    color: colors.SECONDARY,
    fontSize: 14,
    userSelect: 'none'
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
    const { STYLE } = this.constructor
    const {
      description,
      onDragStart: onDragStartProp,
      onDragStop: onDragStopProp, style, ...rest
    } = this.props

    const onDragStart = this._onDragStart(onDragStartProp)
    const onDragStop = this._onDragStop(onDragStopProp)
    const mergedStyle = Object.assign({}, STYLE, style)

    return (
      <div>
        <small><div style={labelStyle}>{description}</div></small>
        <Slider
          style={mergedStyle}
          onDragStart={onDragStart}
          onDragStop={onDragStop}
          {...rest}
        />
      </div>
    )
  }
}
