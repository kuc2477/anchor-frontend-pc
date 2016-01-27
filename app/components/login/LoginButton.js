import React, { PropTypes } from 'react'
import FlatButton from 'material-ui/lib/flat-button'
import Colors from 'material-ui/lib/styles/colors'


export default class LoginButton extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
    isAuthenticating: PropTypes.bool.isRequired
  };

  static defaultProps = {
    isAuthenticating: false
  };

  static LABEL = 'Login to Anchor';

  render() {
    const { isAuthenticating } = this.props
    const statusIcon = isAuthenticating ?
      <i className='fa fa-lg fa-spinner fa-spin'></i> :
      <i className='fa fa-lg fa-check'></i>

    return (
      <div>
        <FlatButton
          secondary={true}
          label={this.constructor.LABEL}
          labelPosition="after"
          onClick={this.props.onClick}>
          {statusIcon}
        </FlatButton>
      </div>
    )
  }
}
