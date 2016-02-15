import validate from 'validate.js'

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import CardTitle from 'material-ui/lib/card/card-title'

import MessageBox, { INFO, ERROR } from '../components/base/MessageBox'
import LoginForm from '../components/login/LoginForm'
import LoginButton from '../components/login/LoginButton'
import SignupLinkButton from '../components/login/SignupLinkButton'
import { authenticate, resendConfirmationMail } from '../actions/auth'
import { SIGNUP } from '../constants/routes'


class Login extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    isAuthenticating: PropTypes.bool,
    didAuthFail: PropTypes.bool,
    didNotConfirmed: PropTypes.bool,
    emailToResend: PropTypes.string,
    errorMessage: PropTypes.string
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
      password: '',
      passwordError: ''
    }
  }
    static TITLE = 'Subscribe and get your favorite readables curated';
    static SUBTITLE = 'Get most crispy readables from your favorite sites';

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

    static ERROR_SUB_ROW_STYLE = {
      marginTop: -45,
      marginBottom: 0
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

  // Returns a value link from the state of given name to associated form
  // field.
  _getValueLink(name) {
    const value = this.state[name]
    const requestChange = (e) => {
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
    const result = validate(Object.assign({}, this.state, values), constraint)
    return result
  }

  // Validates form before login.
  validateBeforeLogin() {
    const { email, password } = this.state
    let { emailError, passwordError } = this.state

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
    const { router } = this.context
    const { email, password } = this.state
    const { dispatch } = this.props
    dispatch(authenticate(email, password, router))
  }

  // resend confirmation mail if email to resend exists in store.
  resend() {
    const { dispatch, emailToResend } = this.props
    if (emailToResend) {
      dispatch(resendConfirmationMail(emailToResend))
    }
  }

  // route to signup page
  goToSignup() {
    const { router } = this.context
    router.push(SIGNUP.path)
  }

  render() {
    const {
      isAuthenticating,
      didAuthFail,
      didNotConfirmed,
      errorMessage
    } = this.props
    const formProps = {
      emailError: this.state.emailError,
      emailValueLink: this._getValueLink('email'),
      passwordError: this.state.passwordError,
      passwordValueLink: this._getValueLink('password')
    }

    return (
      <div style={this.constructor.STYLE}>

        <div className="row center-md" style={this.constructor.TITLE_ROW_STYLE}>
          <CardTitle clasName="col-md"
            title={this.constructor.TITLE}
            subtitle={this.constructor.SUBTITLE}
          />
        </div>

        <div className="row center-md" style={this.constructor.FORM_ROW_STYLE}>
          <LoginForm className="col-md-3" {...formProps} />
        </div>

        {
          didAuthFail ?
          <div className="row center-md" style={this.constructor.ERROR_ROW_STYLE}>
            <MessageBox className="col-md" message={errorMessage} type={ERROR} />
          </div> : null
        }

        {
          didNotConfirmed ?
            <div className="row center-md" style={this.constructor.ERROR_SUB_ROW_STYLE}>
              <MessageBox className="col-md"
                message="[ Resend confirmation mail ]"
                type={ERROR}
                size={12}
                onClick={::this.resend}
              />
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
            onClick={::this.goToSignup}
          />
        </div>

      </div>
    )
  }
}

export default connect(app => ({
  isAuthenticating: app.auth.get('isAuthenticating'),
  didAuthFail: app.auth.get('didAuthFail'),
  didNotConfirmed: app.auth.get('didNotConfirmed'),
  emailToResend: app.auth.get('emailToResend'),
  errorMessage: app.auth.get('errorMessage'),
}))(Login)
