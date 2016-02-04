import React, { PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'


export default class SignupForm extends React.Component {
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
    }),
    passwordCheckError: PropTypes.string,
    passwordCheckValueLink: PropTypes.shape({
      value: PropTypes.string.isRequired,
      requestChange: PropTypes.func.isRequired
    }),
  };

  static EMAIL_FLOATING_LABEL = 'Email';
  static EMAIL_HINT = 'Email';

  static PASSWORD_FLOATING_LABEL = 'Password';
  static PASSWORD_HINT = 'Password';

  static PASSWORD_CHECK_FLOATING_LABEL = 'Password check';
  static PASSWORD_CHECK_HINT = 'Enter password again';

  static TEXT_FIELD_STYLE = {
    marginTop: -15
  };

  render() {
    return (
      <div>
      </div>
    )
  }
}
