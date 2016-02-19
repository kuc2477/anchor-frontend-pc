import React, { PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'

import ProceedButton from './ProceedButton'
import { ValueLinkPropType } from '../../constants/types'


export default class SignupUserForm extends React.Component {
  static propTypes = {
    proceed: PropTypes.func,

    emailError: PropTypes.string,
    emailValueLink: ValueLinkPropType,

    firstnameError: PropTypes.string,
    firstnameValueLink: ValueLinkPropType,

    lastnameError: PropTypes.string,
    lastnameValueLink: ValueLinkPropType,
  };

  static EMAIL_FLOATING_LABEL = 'Email';
  static EMAIL_HINT = 'Email';

  static FIRSTNAME_FLOATING_LABEL = 'Firstname';
  static FIRSTNAME_HINT = 'Firstname';

  static LASTNAME_FLOATING_LABEL = 'Lastname';
  static LASTNAME_HINT = 'Lastname';

  static BTN_STYLE = {
    marginTop: 20,
  };

  static TEXT_FIELD_STYLE = {
    marginTop: -15
  };

  render() {
    const {
      proceed,
      emailError, emailValueLink,
      firstnameError, firstnameValueLink,
      lastnameError, lastnameValueLink
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

        <ProceedButton
          style={this.constructor.BTN_STYLE}
          onClick={proceed}
        />
      </div>
    )
  }
}
