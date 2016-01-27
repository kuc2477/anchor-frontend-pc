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
    type: PropTypes.oneOf([INFO, ERROR])
  };

  static defaultProps = {
    type: INFO
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

  render() {
    return (
      <div>
        <CardTitle
          subtitleColor={this.getColor()}
          subtitle={this.props.message}
        />
      </div>
    )
  }
}
