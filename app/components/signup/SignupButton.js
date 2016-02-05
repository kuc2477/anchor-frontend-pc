import React, { PropTypes } from 'react'
import FlatButton from 'material-ui/lib/flat-button'


export default class SignupButton extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
    isRegistering: PropTypes.bool.isRequired
  };

  static defaultProps = {
    isRegistering: false
  };

  static LABEL = 'Signup to Anchor';

  render() {
    const { isRegistering } = this.props
    const statusIcon = isRegistering ?
      <i className='fa fa-lg fa-spinner fa-spin'></i> :
      <i className='fa fa-lg fa-anchor'></i>

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
