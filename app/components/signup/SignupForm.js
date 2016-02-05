import React, { PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'

import { ValueLinkPropType } from '../../constants/types'


export default class SignupForm extends React.Component {
  static propTypes = {
    emailError: PropTypes.string,
    emailValueLink: ValueLinkPropType,

    firstnameError: PropTypes.string,
    firstnameValueLink: ValueLinkPropType,

    lastnameError: PropTypes.string,
    lastnameValueLink: ValueLinkPropType,

    passwordError: PropTypes.string,
    passwordValueLink: ValueLinkPropType,

    passwordValidationError: PropTypes.string,
    passwordValidationValueLink: ValueLinkPropType
  };

  static EMAIL_FLOATING_LABEL = 'Email';
  static EMAIL_HINT = 'Email';

  static FIRSTNAME_FLOATING_LABEL = 'Firstname';
  static FIRSTNAME_HINT = 'Firstname';

  static LASTNAME_FLOATING_LABEL = 'Lastname';
  static LASTNAME_HINT = 'Lastname';

  static PASSWORD_FLOATING_LABEL = 'Password';
  static PASSWORD_HINT = 'Password';

  static PASSWORD_CHECK_FLOATING_LABEL = 'Password validation';
  static PASSWORD_CHECK_HINT = 'Password validation';

  static TEXT_FIELD_STYLE = {
    marginTop: -15
  };

  render() {
    const {
      emailError, emailValueLink,
      firstnameError, firstnameValueLink,
      lastnameError, lastnameValueLink,
      passwordError, passwordValueLink,
      passwordValidationError, passwordValidationValueLink
    } = this.props

    return (
      <div>
        <TextField
          style={this.constructor.TEXT_FIELD_STYLE}
          hintText={this.constructor.EMAIL_HINT}
          floatingLabelText={this.constructor.EMAIL_FLOATING_LABEL}
          errorText={emailError}
          value={emailValueLink.value}
          onChange={emailValueLink.requestChange}
        />

        <br/>

        <TextField
          style={this.constructor.TEXT_FIELD_STYLE}
          hintText={this.constructor.FIRSTNAME_HINT}
          floatingLabelText={this.constructor.FIRSTNAME_FLOATING_LABEL}
          errorText={firstnameError}
          value={firstnameValueLink.value}
          onChange={firstnameValueLink.requestChange}
        />

        <br/>

        <TextField
          style={this.constructor.TEXT_FIELD_STYLE}
          hintText={this.constructor.LASTNAME_HINT}
          floatingLabelText={this.constructor.LASTNAME_FLOATING_LABEL}
          errorText={lastnameError}
          value={lastnameValueLink.value}
          onChange={lastnameValueLink.requestChange}
        />

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
      </div>
    )
  }
}
