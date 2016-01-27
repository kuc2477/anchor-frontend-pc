import validate from 'validate.js'

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Card from 'material-ui/lib/card/card'
import CardTitle from 'material-ui/lib/card/card-title'

import MessageBox, { ERROR } from '../components/base/MessageBox'

import LoginForm from '../components/login/LoginForm'
import LoginButton from '../components/login/LoginButton'
import SignupLinkButton from '../components/login/SignupLinkButton'
import FBLoginButton from '../components/login/FBLoginButton'
import GoogleLoginButton from '../components/login/GoogleLoginButton'

import { authenticate } from '../actions/auth'


class Login extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  static TITLE = 'Subscribe and get your favorite readables curated';
  static SUBTITLE = 'Get most crispy readables from your favorite sites';

  static STYLE = {
    marginTop: 40
  };

  static TITLE_ROW_STYLE = {
    marginBottom: 30
  };

  static FORM_ROW_STYLE = {
    marginBottom: 20
  };

  static ERROR_ROW_STYLE = {
    marginBottom: 30
  };

  static BTN_ROW_STYLE = {
    marginTop: 10
  };

  static BTN_STYLE = {
    margin: 10,
    padding: 10
  };

  static FORM_CONSTRAINT = {
    email: { email: true },
    password: {
      length: {
        minimum: 6,
        message: 'is too short'
      }
    }
  };

  constructor(props) {
    super(props)
    // initial form state
    this.state = {
      email: '',
      emailError: '',
      password: '',
      passwordError: ''
    }
  }

  _onEmailChange(e) {
    const email = e.target.value
    const v = this._validate({ email })

    this.setState({
      email,
      emailError: v && v.email ? v.email[0] : ''
    })
  }

  _getEmailValueLink() {
    return {
      value: this.state.email,
      requestChange: ::this._onEmailChange
    }
  }

  _onPasswordChange(e) {
    const password = e.target.value
    const v = this._validate({ password })

    this.setState({
      password,
      passwordError: v && v.password ? v.password[0] : ''
    })
  }

  _getPasswordValueLink() {
    return {
      value: this.state.password,
      requestChange: ::this._onPasswordChange
    }
  }

  // Validates form on input value changes. Note that this function has
  // nothing to do with `validateBeforeLogin`.
  _validate(values) {
    const constraint = this.constructor.FORM_CONSTRAINT
    const result = validate(Object.assign({}, this.state, values), constraint)
    return result
  }

  // Validates form before login.
  validateBeforeLogin() {
    let { email, emailError, password, passwordError } = this.state

    // set empty input error message if any of inputs are empty
    emailError = !email ? 'Email should not be empty' : emailError
    passwordError = !password ? 'Password should not be empty' : passwordError
    this.setState({ emailError, passwordError })

    // return false if the form contains any error
    return !emailError && !passwordError
  }

  // dispatch authentication
  login() {
    if (!this.validateBeforeLogin()) {
      return
    }
    debugger
    const { router } = this.context
    const { email, password } = this.state
    const { dispatch } = this.props
    dispatch(authenticate(email, password, router))
  }

  render() {
    const { isAuthenticating, didAuthFail, errorMessage } = this.props
    const { emailError, passwordError } = this.state
    const emailValueLink = this._getEmailValueLink()
    const passwordValueLink = this._getPasswordValueLink()

    return (
      <div style={this.constructor.STYLE}>

        <div className="row center-md" style={this.constructor.TITLE_ROW_STYLE}>
          <CardTitle clasName="col-md"
            title={this.constructor.TITLE}
            subtitle={this.constructor.SUBTITLE}
          />
        </div>

        <div className="row center-md" style={this.constructor.FORM_ROW_STYLE}>
          <LoginForm className="col-md-3"
            emailError={emailError}
            emailValueLink={emailValueLink}
            passwordError={passwordError}
            passwordValueLink={passwordValueLink}
          />
        </div>

        {
          didAuthFail ?
          <div className="row center-md" style={this.constructor.ERROR_ROW_STYLE}>
            <MessageBox className="col-md" message={errorMessage} type={ERROR} />
          </div> : null
        }

        <div className="row center-md" style={this.constructor.BTN_ROW_STYLE}>
          <LoginButton className="col-md-3"
            style={this.constructor.BTN_STYLE}
            isAuthenticating={isAuthenticating}
            onClick={::this.login}
          />
        </div>

        <div className="row center-md" style={this.constructor.BTN_ROW_STYLE}>
          <SignupLinkButton className="col-md-3"
            style={this.constructor.BTN_STYLE}
          />
        </div>

      </div>
    )
  }
}

export default connect(app => ({
  isAuthenticating: app.auth.get('isAuthenticating'),
  didAuthFail: app.auth.get('didAuthFail'),
  errorMessage: app.auth.get('errorMessage')
}))(Login)
