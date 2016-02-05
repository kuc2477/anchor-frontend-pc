import React, { PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'

import { ValueLinkPropType } from '../../constants/types'


export default class LoginForm extends React.Component {
  static propTypes = {
    emailError: PropTypes.string,
    emailValueLink: ValueLinkPropType,

    passwordError: PropTypes.string,
    passwordValueLink: ValueLinkPropType
  };

  static EMAIL_FLOATING_LABEL = 'Email';
  static EMAIL_HINT = 'Email';

  static PASSWORD_FLOATING_LABEL = 'Password';
  static PASSWORD_HINT = 'Password';

  static TEXT_FIELD_STYLE = {
    marginTop: -15
  };

  render() {
    const {
      emailError, emailValueLink,
      passwordError, passwordValueLink,
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
          type="password"
          floatingLabelText={this.constructor.PASSWORD_FLOATING_LABEL}
          hintText={this.constructor.PASSWORD_HINT}
          style={this.constructor.TEXT_FIELD_STYLE}
          errorText={passwordError}
          value={passwordValueLink.value}
          onChange={passwordValueLink.requestChange}
        />
      </div>
    )
  }
}
