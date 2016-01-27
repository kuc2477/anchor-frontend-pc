import React, { PropTypes } from 'react'
import { PropTypes as RouterPropTypes } from 'react-router'
import { connect } from 'react-redux'

import Nav from '../components/base/Nav'
import { UserPropType } from '../constants/types'

import '../styles/generics/app.scss'
import '../styles/generics/vendor.css'


class App extends React.Component {
  static propTypes = {
    user: UserPropType,
    children: PropTypes.node,
    // need history to inherit history as contexts to all childs in app
    history: RouterPropTypes.history.isRequired
  };

  static childContextTypes = {
    history: RouterPropTypes.history
  };

  static STYLE = {
    paddingTop: 64,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15
  };

  render() {
    return (
      <div>
        <Nav user={this.props.user} />
        <div style={this.constructor.STYLE}>{this.props.children}</div>
      </div>
    )
  }
}


export default connect(app => ({
  user: app.auth.get('user')
}))(App)
