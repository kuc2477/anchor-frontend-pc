import React, { PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'
import SwipeableViews from 'react-swipeable-views'

import SignupUserForm from './SignupUserForm'
import SignupPasswordForm from './SignupPasswordForm'

import {
  SIGNUP_STEP_USER,
  SIGNUP_STEP_PASSWORD
} from '../../constants/strings'
import { ValueLinkPropType } from '../../constants/types'
import keyboard from '../../modules/keyboard'



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

  static defaultProps = {
    step: SIGNUP_STEP_USER
  };

  static CONTAINER_STYLE = {
    height: '100%'
  };

  resetKeyboard() {
    keyboard.rewindTemp('backspace')
    keyboard.rewindTemp('alt + left')
    keyboard.rewindTemp('alt + right')
  }

  configureKeyboard() {
    // rest all temp bound keyboard handlers.
    this.resetKeyboard()

    const altRightHandler = () => {
      if (document.activeElement.tagName.toLowerCase() !== 'input') {
        this.props.proceed()
      }
    }
    const backspaceHandler = () => {
      if (document.activeElement.tagName.toLowerCase() !== 'input') {
        this.props.back()
      }
    }

    // configure keyboard accordingly to the current step.
    if (this.props.step === SIGNUP_STEP_USER) {
      keyboard.bindTemp('alt + right', altRightHandler)
    } else if (this.props.step === SIGNUP_STEP_PASSWORD) {
      keyboard.bindTemp('alt + left', backspaceHandler)
      keyboard.bindTemp('backspace', backspaceHandler)
    }
  }

  componentDidMount() {
    this.configureKeyboard()
  }

  componentWillUnmount() {
    this.resetKeyboard()
  }

  componentDidUpdate() {
    this.configureKeyboard()
  }

  render() {
    const {
      step, isRegistering, proceed, back, register,
      emailError, emailValueLink,
      firstnameError, firstnameValueLink,
      lastnameError, lastnameValueLink,
      passwordError, passwordValueLink,
      passwordValidationError, passwordValidationValueLink,
      ...rest
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

    const index =
      step === SIGNUP_STEP_USER ? 0 :
      step === SIGNUP_STEP_PASSWORD ? 1 :
        (() => { throw 'INVALID SIGNUP STEP' })()

    return (
      <SwipeableViews
        disabled={true} index={index}
        containerStyle={this.constructor.CONTAINER_STYLE}
      >
        <SignupUserForm {...userFormProps} />
        <SignupPasswordForm {...passwordFormProps} />
      </SwipeableViews>
    )
  }
}
