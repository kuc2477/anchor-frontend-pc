import React, { PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'
import CardTitle from 'material-ui/lib/card/card-title'

import SignupButton from './SignupButton'
import { ValueLinkPropType } from '../../constants/types'
import { INACTIVE } from '../../constants/colors'


export default class SignupPasswordForm extends React.Component {
  static propTypes = {
    isRegistering: PropTypes.bool,
    back: PropTypes.func,
    register: PropTypes.func,

    email: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,

    passwordError: PropTypes.string,
    passwordValueLink: ValueLinkPropType,
    passwordValidationError: PropTypes.string,
    passwordValidationValueLink: ValueLinkPropType
  };

  static PASSWORD_FLOATING_LABEL = 'Password';
  static PASSWORD_HINT = 'Password';

  static PASSWORD_CHECK_FLOATING_LABEL = 'Password validation';
  static PASSWORD_CHECK_HINT = 'Password validation';

  static GREETING_STYLE = {
    color: INACTIVE,
    marginBottom: -5
  };

  static BTN_STYLE = {
    marginTop: 30,
  };

  static TEXT_FIELD_STYLE = {
    marginTop: -15
  };

  render() {
    const {
      email, firstname, lastname,
      isRegistering, register,
      passwordError, passwordValueLink,
      passwordValidationError, passwordValidationValueLink
    } = this.props

    return (
      <div>
        <div style={this.constructor.GREETING_STYLE}>
          <small>Enter your new password for {email}</small>
        </div>

        <br/>

        <TextField
          type="password"
          floatingLabelText={this.constructor.PASSWORD_FLOATING_LABEL}
          hintText={this.constructor.PASSWORD_HINT}
          style={this.constructor.TEXT_FIELD_STYLE}
          errorText={passwordError}
          value={passwordValueLink.value}
          onChange={passwordValueLink.requestChange}
        />

        <br/>

        <TextField
          type="password"
          floatingLabelText={this.constructor.PASSWORD_CHECK_FLOATING_LABEL}
          hintText={this.constructor.PASSWORD_CHECK_HINT}
          style={this.constructor.TEXT_FIELD_STYLE}
          errorText={passwordValidationError}
          value={passwordValidationValueLink.value}
          onChange={passwordValidationValueLink.requestChange}
        />

        <br/>

        <SignupButton
          style={this.constructor.BTN_STYLE}
          isRegistering={isRegistering}
          onClick={register}
        />
      </div>
    )
  }
}
