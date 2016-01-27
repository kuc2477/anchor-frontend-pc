import React, { PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'



export default class LoginForm extends React.Component {
  static propTypes = {
    emailError: PropTypes.string,
    emailValueLink: PropTypes.shape({
      value: PropTypes.string.isRequired,
      requestChange: PropTypes.func.isRequired
    }),
    passwordError: PropTypes.string,
    passwordValueLink: PropTypes.shape({
      value: PropTypes.string.isRequired,
      requestChange: PropTypes.func.isRequired
    })
  };

  static EMAIL_FLOATING_LABEL = 'Email';
  static EMAIL_HINT = 'Email';

  static PASSWORD_FLOATING_LABEL = 'Password';
  static PASSWORD_HINT = 'Password';

  static TEXT_FIELD_STYLE = {
    marginTop: -15
  };

  render() {
    const { emailError, passwordError } = this.props
    const { value: email, requestChange: onEmailChange } =
      this.props.emailValueLink
    const { value: password, requestChange: onPasswordChange } =
      this.props.passwordValueLink

    return (
      <div>
        <TextField
          style={this.constructor.TEXT_FIELD_STYLE}
          hintText={this.constructor.EMAIL_HINT}
          floatingLabelText={this.constructor.EMAIL_FLOATING_LABEL}
          errorText={emailError}
          value={email}
          onChange={onEmailChange}
        />

        <br/>

        <TextField
          type="password"
          floatingLabelText={this.constructor.PASSWORD_FLOATING_LABEL}
          hintText={this.constructor.PASSWORD_HINT}
          style={this.constructor.TEXT_FIELD_STYLE}
          errorText={passwordError}
          value={password}
          onChange={onPasswordChange}
        />
      </div>
    )
  }
}
