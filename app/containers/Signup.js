import validate from 'validate.js'

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Card from 'material-ui/lib/card/card'
import CardTitle from 'material-ui/lib/card/card-title'

import MessageBox, { ERROR } from '../components/base/MessageBox'
import SignupForm from '../components/signup/SignupForm'
import SignupButton from  '../components/signup/SignupButton'

import { signup } from '../actions/signup'


class Signup extends React.Component {
  static STYLE = {
    marginTop: 40
  };

  static TITLE_ROW_STYLE = {
    marginBottom: 20
  };

  static FORM_ROW_STYLE = {
    marginBottom: 20
  };

  static ERROR_ROW_STYLE = {
    marginBottom: 20
  };

  static BTN_ROW_STYLE = {
    marginTop: 10
  };

  static BTN_STYLE = {
    margin: 10,
    padding: 10
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

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props)
    // initial form state
    this.state = {
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
    }
  }

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
  // nothing to do with `validateBeforeLogin`.
  _validate(values) {
    const constraint = this.constructor.FORM_CONSTRAINT
    const result = validate(
      Object.assign({}, this.state, values), constraint, {
      fullMessages: false
    })
    return result
  }

  // Validates form before login.
  validateBeforeLogin() {
    let {
      email, emailError,
      firstname, firstnameError,
      lastname, lastnameError,
      password, passwordError,
      passwordValidation, passwordValidationError
    } = this.state

    // set empty input error message if any of inputs are empty
    emailError = !email ? 'Email should not be empty' : emailError
    firstnameError = !firstname ? 'firstname should not be empty' : firstnameError
    lastnameError = !lastname ? 'lastname should not be empty' : lastnameError
    passwordError = !password ? 'Password should not be empty' : passwordError
    passwordValidationError = !passwordValidation ?
      'Password validation should not be empty' :
        passwordValidationError

    // update error states
    this.setState({
      emailError,
      firstnameError,
      lastnameError,
      passwordError,
      passwordValidationError
    })

    // return false if the form contains any error
    return !emailError && !firstnameError && !lastnameError &&
      !passwordError & !passwordValidationError
  }

  register() {
    if (!this.validateBeforeLogin()) {
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
    const formProps = {
      emailError: this.state.emailError,
      emailValueLink: this._getValueLink('email'),
      firstnameError: this.state.firstnameError,
      firstnameValueLink: this._getValueLink('firstname'),
      lastnameError: this.state.lastnameError,
      lastnameValueLink: this._getValueLink('lastname'),
      passwordError: this.state.passwordError,
      passwordValueLink: this._getValueLink('password'),
      passwordValidationError: this.state.passwordValidationError,
      passwordValidationValueLink: this._getValueLink('passwordValidation')
    }

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

        <div className="row center-md" style={this.constructor.BTN_ROW_STYLE}>
          <SignupButton className="col-md-3"
            isRegistering={isRegistering}
            onClick={::this.register} />
        </div>
      </div>
    )
  }
}


export default connect(app => ({
  isRegistering: app.signup.get('isRegistering'),
  didSignupFail: app.signup.get('didSignupFail'),
  errorMessage: app.signup.get('errorMessage')
}))(Signup)
