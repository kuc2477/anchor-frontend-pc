import React, { PropTypes } from 'react'
import { PropTypes as RouterPropTypes } from 'react-router'
import { connect } from 'react-redux'

import Snackbar from 'material-ui/lib/snackbar'

import Nav from '../components/base/Nav'
import { UserPropType } from '../constants/types'
import { clearToast } from '../actions/base'

import '../styles/generics/app.scss'
import '../styles/generics/vendor.css'


class App extends React.Component {
  static propTypes = {
    user: UserPropType,
    toastOpen: PropTypes.bool,
    toastMessage: PropTypes.string,
    toastDuration: PropTypes.number,
    toastAction: PropTypes.string,
    toastCallback: PropTypes.func,
    children: PropTypes.node,
  };

  static childContextTypes = {
    router: RouterPropTypes.router
  };

  static STYLE = {
    paddingTop: 64,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15
  };

  closeToast() {
    this.props.dispatch(clearToast())
  }

  render() {
    return (
      <div>
        <Nav user={this.props.user} dispatch={this.props.dispatch} />
        <div style={this.constructor.STYLE}>{this.props.children}</div>
        <Snackbar
          open={this.props.toastOpen}
          action={this.props.toastAction}
          message={this.props.toastMessage || ''}
          autoHideDuration={this.props.toastDuration}
          onActionTouchTap={this.props.toastCallback}
          onRequestClose={::this.closeToast}
        />
      </div>
    )
  }
}


export default connect(app => ({
  toastOpen: app.base.get('toastOpen'),
  toastMessage: app.base.get('toastMessage'),
  toastDuration: app.base.get('toastDuration'),
  toastAction: app.base.get('toastAction'),
  toastCallback: app.base.get('toastCallback'),
  user: app.auth.get('user')
}))(App)
