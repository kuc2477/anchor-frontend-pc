import validate from 'validate.js'

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import CardTitle from 'material-ui/lib/card/card-title'

import MessageBox, { ERROR } from '../components/base/MessageBox'
import SignupButton from '../components/signup/SignupButton.js'
import SignupForm from '../components/signup/SignupForm'

import { signup, clearSignupState } from '../actions/signup'

import { SIGNUP_STEP_USER, SIGNUP_STEP_PASSWORD } from '../constants/strings'


class Signup extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    isRegistering: PropTypes.bool,
    didSignupFail: PropTypes.bool,
    errorMessage: PropTypes.string
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props)
    this.state = {
      // initial form state
      email: '',
      emailError: '',
      firstname: '',
      firstnameError: '',
      lastname: '',
      lastnameError: '',
      password: '',
      passwordError: '',
      passwordValidation: '',
      passwordValidationError: '',
      // signup step state
      step: SIGNUP_STEP_USER
    }
  }

  componentDidMount() {
    this.context.router.setRouteLeaveHook(
      this.props.route, ::this.routerWillLeave)
  }

  routerWillLeave(nextLocation) {
    this.props.dispatch(clearSignupState())
  }

  static STYLE = {
    marginTop: 40
  };

  static TITLE_ROW_STYLE = {
    marginBottom: 30
  };

  static FORM_ROW_STYLE = {
    marginBottom: 30
  };

  static ERROR_ROW_STYLE = {
    marginBottom: 30
  };

  static TITLE = 'Signup and get your site readables personalized';
  static SUBTITLE = 'Automate and customize your taste of reading';

  static FORM_CONSTRAINT = {
    email: {
      email: {
        message: 'Email is not in valid format'
      }
    },
    firstname: {
      length: {
        minimum: 2,
        message: 'First name is too short'
      },
      format: {
        pattern: '[a-z]+',
        flags: 'i',
        message: 'First name should only contain alphabets',
      }
    },
    lastname: {
      length: {
        minimum: 2,
        message: 'First name is too short'
      },
      format: {
        pattern: '[a-z]+',
        flags: 'i',
        message: 'Last name should only contain alphabets',
      }
    },
    password: {
      length: {
        minimum: 6,
        message: 'Password is too short'
      }
    },
    passwordValidation: {
      equality: {
        attribute: 'password',
        message: 'Password validation should be equal'
      }
    }
  };

  // Returns a value link from the state of given name to associated form
  // field.
  _getValueLink(name) {
    const value = this.state[name]
    const requestChange = (e) => {
      // validate the field on every change and set error state if any exists.
      const changedValue = e.target.value
      const v = this._validate({ [name]: changedValue })
      this.setState({
        [name]: changedValue,
        [`${name}Error`]: v && v[name] ? v[name][0] : ''
      })
    }
    return { value, requestChange }
  }

  // Validates form on input value changes. Note that this function has
  // nothing to do with `validateBeforeProceed` or `validateBeforeSignup`.
  _validate(values) {
    const constraint = this.constructor.FORM_CONSTRAINT
    const result = validate(
      Object.assign({}, this.state, values), constraint, {
        fullMessages: false
      })
    return result
  }

  validateBeforeProceed() {
    const { email, firstname, lastname } = this.state
    let { emailError, firstnameError, lastnameError } = this.state

    emailError = !email ? 'Email should not be empty' : emailError
    firstnameError = !firstname ? 'firstname should not be empty' : firstnameError
    lastnameError = !lastname ? 'lastname should not be empty' : lastnameError

    // update error states and return validation result
    this.setState({ emailError, firstnameError, lastnameError })
    return !emailError && !firstnameError && !lastnameError;
  }

  validateBeforeSignup() {
    const { password, passwordValidation } = this.state
    let { passwordError, passwordValidationError } = this.state

    passwordError = !password ? 'Password should not be empty' : passwordError
    passwordValidationError = !passwordValidation ?
      'Password validation should not be empty' :
        passwordValidationError

    // update error states and return validation result
    this.setState({ passwordError, passwordValidationError })
    return !passwordError & !passwordValidationError
  }

  proceed() {
    if (this.state.step === SIGNUP_STEP_USER && this.validateBeforeProceed()) {
      this.setState({ step: SIGNUP_STEP_PASSWORD })
    }
  }

  back() {
    if (this.state.step === SIGNUP_STEP_PASSWORD) {
      this.setState({ step: SIGNUP_STEP_USER })
    }
  }

  register() {
    if (!this.validateBeforeSignup()) {
      return
    }
    // unpack current form state
    const {
      email,
      firstname,
      lastname,
      password,
      passwordValidation
    } = this.state

    // prepare signup action arguments
    const { dispatch } = this.props
    const { router } = this.context
    const args = [
      email, firstname, lastname,
      password, passwordValidation, router
    ]

    // dispatch the signup action
    dispatch(signup(...args))
  }

  render() {
    const { isRegistering, didSignupFail, errorMessage } = this.props
    const formProps = Object.assign({}, this.state, {
      isRegistering,
      back: ::this.back,
      proceed: ::this.proceed,
      register: ::this.register,
      // value links
      emailValueLink: this._getValueLink('email'),
      firstnameValueLink: this._getValueLink('firstname'),
      lastnameValueLink: this._getValueLink('lastname'),
      passwordValueLink: this._getValueLink('password'),
      passwordValidationValueLink: this._getValueLink('passwordValidation')
    })

    return (
      <div style={this.constructor.STYLE}>
        <div className="row center-md" style={this.constructor.TITLE_ROW_STYLE}>
          <CardTitle className="col-md"
            title={this.constructor.TITLE}
            subtitle={this.constructor.SUBTITLE}
          />
        </div>

        <div className="row center-md" style={this.constructor.FORM_ROW_STYLE}>
          <SignupForm className="col-md-3" {...formProps} />
        </div>

        {
          didSignupFail ?
          <div className="row center-md" style={this.constructor.ERROR_ROW_STYLE}>
            <MessageBox className="col-md" message={errorMessage} type={ERROR} />
          </div> : null
        }
      </div>
    )
  }
}


export default connect(app => ({
  isRegistering: app.signup.get('isRegistering'),
  didSignupFail: app.signup.get('didSignupFail'),
  errorMessage: app.signup.get('errorMessage')
}))(Signup)
