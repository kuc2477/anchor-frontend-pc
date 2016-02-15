import React, { PropTypes } from 'react'
import CardTitle from 'material-ui/lib/card/card-title'
import Divider from 'material-ui/lib/divider'
import colors from '../../constants/colors'


// message types
export const INFO = 'INFO'
export const ERROR = 'ERROR'

export default class MessageBox extends React.Component {
  static propTypes = {
    message: PropTypes.string,
    type: PropTypes.oneOf([INFO, ERROR]),
    size: PropTypes.number,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    type: INFO,
    size: 14,
  };

  getColor() {
    switch(this.props.type) {
      case INFO:
        return colors.INFO

      case ERROR:
        return colors.ERROR

      default:
        return colors.INFO
    }
  }

  getStyle() {
    const style = this.props.style || {}
    const { size } = this.props
    return Object.assign({}, style, {fontSize: size})
  }

  render() {
    const { message, type, size, onClick, ...rest} = this.props
    return (
      <CardTitle className={onClick ? 'clickable': null} onClick={onClick}>
        subtitle={this.props.message}
        subtitleColor={this.getColor()}
        subtitleStyle={this.getStyle()}
        {...rest}
      />
    )
  }
}
