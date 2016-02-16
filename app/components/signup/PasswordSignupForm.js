import React, { PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'

import SignupButton from './SignupButton'
import { ValueLinkPropType } from '../../constants/types'


export default class PasswordSignupForm extends React.Component {
  static propTypes = {
    onSignupButtonClick: PropTypes.func,

    isRegistering: PropTypes.bool,
    didSignupFail: PropTypes.bool,
    errorMessage: PropTypes.string,

    passwordError: PropTypes.string,
    passwordValueLink: ValueLinkPropType,

    passwordValidationError: PropTypes.string,
    passwordValidationValueLink: ValueLinkPropType
  };

  static PASSWORD_FLOATING_LABEL = 'Password';
  static PASSWORD_HINT = 'Password';

  static PASSWORD_CHECK_FLOATING_LABEL = 'Password validation';
  static PASSWORD_CHECK_HINT = 'Password validation';

  static FORM_ROW_STYLE = {
    marginBottom: 20
  };

  static TEXT_FIELD_STYLE = {
    marginTop: -15
  };

  render() {
    const {
      isRegistering, onSignupButtonClick,
      passwordError, passwordValueLink,
      passwordValidationError, passwordValidationValueLink
    } = this.props

    return (
      <div>
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
          isRegistering={isRegistering}
          onClick={onSignupButtonClick}
        />
      </div>
    )
  }
}
