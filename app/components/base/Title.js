import React, { PropTypes } from 'react'
import Colors from 'material-ui/lib/styles/colors'
import Ink from 'react-ink'


export default class Title extends React.Component {
  static PropTypes = {
    style: PropTypes.object,
    children: PropTypes.node,
  };

  static STYLE = {
    paddingTop: 5,
    paddingBottom: 20,
    color: Colors.grey600,
    fontSize: 17,
    position: 'relative',
    className: 'row middle-md'
  };

  _getStyle() {
    const { STYLE: baseStyle } = this.constructor
    const { style: titleStyle } = this.props
    return Object.assign({}, baseStyle, titleStyle)
  }

  _getClassName() {
    const { className: baseClassName } = this.constructor.STYLE
    const { className } = this.props
    return `${baseClassName} ${className}`
  }

  render() {
    const { className, style, children, ...rest } = this.props
    return (
      <div className={this._getClassName()} style={this._getStyle()} {...rest}>
        {children}
      </div>
    )
  }
}
