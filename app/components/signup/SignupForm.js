import React, { PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'

import SignupUserForm from './SignupUserForm'
import SignupPasswordForm from './SignupPasswordForm'

import {
  SIGNUP_STEP_USER,
  SIGNUP_STEP_PASSWORD
} from '../../constants/strings'
import { ValueLinkPropType } from '../../constants/types'


export default class SignupForm extends React.Component {
  static propTypes = {
    step: PropTypes.string,
    isRegistering: PropTypes.bool,

    proceed: PropTypes.func,
    back: PropTypes.func,
    register: PropTypes.func,

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

  render() {
    const {
      step, isRegistering, proceed, back, register,
      emailError, emailValueLink,
      firstnameError, firstnameValueLink,
      lastnameError, lastnameValueLink,
      passwordError, passwordValueLink,
      passwordValidationError, passwordValidationValueLink
    } = this.props

    const userFormProps = {
      proceed, emailError, emailValueLink,
      firstnameError, firstnameValueLink,
      lastnameError, lastnameValueLink
    }

    const passwordFormProps = {
      isRegistering, back, register,
      email: emailValueLink.value,
      firstname: firstnameValueLink.value,
      lastname: lastnameValueLink.value,
      passwordError, passwordValueLink,
      passwordValidationError, passwordValidationValueLink
    }

    const form =
      step === SIGNUP_STEP_USER ?  <SignupUserForm {...userFormProps} /> :
      step === SIGNUP_STEP_PASSWORD ? <SignupPasswordForm {...passwordFormProps} /> :
        (() => { throw 'INVALID SIGNUP STEP' })()

    return form
  }
}
