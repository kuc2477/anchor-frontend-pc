import _ from 'lodash'

import React, { PropTypes } from 'react'
import { AppBar, Tabs, Tab } from 'material-ui'

import { UserPropType } from '../../constants/types.js'
import { NEWS, SCHEDULES, LOGOUT } from '../../constants/routes.js'
import { logout } from '../../actions/auth'


export default class Nav extends React.Component {
  static ROUTES = [
    [ NEWS , SCHEDULES , LOGOUT ]
  ];

  static APP_BAR_STYLE = { position: 'fixed' };
  static TAB_ITEM_STYLE = { marginRight: 120 };

  static propTypes = {
    user: UserPropType,
    title: PropTypes.string.isRequired,
    // need dispatcher to dispatch logout action
    dispatch: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  static defaultProps = {
    title: 'Anchor'
  };

  constructor(props) {
    super(props)
    this.state = { tabIndex: 0 }
  }

  componentWillReceiveProps() {
    if (this.state.tabIndex !== this._getSelectedIndex()) {
      this.setState({ tabIndex: this._getSelectedIndex() })
    }
  }

  _onTabActive(tab) {
    // run logout action if activated tab is logout tab
    if (tab.props.label === LOGOUT.label) {
      const { dispatch } = this.props
      dispatch(logout(this.context.router))
      return
    }

    // otherwise navigate to related route
    this.context.router.push(tab.props.path)
    this.setState({ tabIndex: this._getSelectedIndex() })
  }

  _getTabRoutes() {
    const { user } = this.props
    return _(this.constructor.ROUTES).flatten().filter(route => {
      return (
        (!route.onlyVisibleToAnonymous && !route.onlyVisibleToAuthenticated) ||
        (route.onlyVisibleToAuthenticated && user) ||
        (route.onlyVisibleToAnonymous && !user)
      )
    }).value()
  }

  _getSelectedIndex() {
    const router = this.context.router
    const routes = this._getTabRoutes()
    return _.findIndex(routes, (route) => {
      return route.path && router.isActive(route.path)
    })
  }


  render() {
    const tabItems = this._getTabRoutes().map(
      (route, index) =>
      <Tab
        key={index}
        value={JSON.stringify(index)}
        label={route.label}
        path={route.path}
        link={route.link}
        onActive={::this._onTabActive}
      />
    )

    const tabs = (
      <Tabs
        value={JSON.stringify(this.state.tabIndex)}
        tabItemContainerStyle={this.constructor.TAB_ITEM_STYLE}
      >
        {tabItems}
      </Tabs>
    )

    const icon = (
      <i
        style={{margin: 8, color: 'white'}}
        className="fa fa-2x fa-anchor">
      </i>
    )

    return (
      <AppBar
        style={this.constructor.APP_BAR_STYLE}
        title={this.props.title}
        iconElementLeft={icon}
        iconElementRight={tabs}
      />
    )
  }
}
