import _ from 'lodash'

import React, { PropTypes } from 'react'
import { PropTypes as RouterPropTypes } from 'react-router'
import { AppBar, Tabs, Tab } from 'material-ui'

import { UserPropType } from '../../constants/types.js'
import { NEWS, SCHEDULES } from '../../constants/routes.js'


export default class Nav extends React.Component {
  static propTypes = {
    user: UserPropType,
    title: PropTypes.string.isRequired
  };

  static contextTypes = {
    history: RouterPropTypes.history
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


  static NAV_GROUPS = [
    [
      { route: NEWS },
      { route: SCHEDULES }
    ]
  ];
  static APP_BAR_STYLE = { position: 'fixed' };
  static TAB_ITEM_STYLE = { marginRight: 120 };


  _onTabActive(tab) {
    this.context.history.pushState(null, tab.props.route)
    this.setState({ tabIndex: this._getSelectedIndex() })
  }

  _getTabRoutes() {
    return _(this.constructor.NAV_GROUPS).flatten().filter(nav => {
      return (
        !nav.onlyVisibleToAnonymous && !nav.onlyVisibleToAuthenticated ||
        (nav.onlyVisibleToAuthenticated && this.props.user) ||
        (nav.onlyVisibleToAnonymous && !this.props.user)
      )
    }).map(nav => nav.route).value()
  }

  _getSelectedIndex() {
    const history = this.context.history
    const routes = this._getTabRoutes()
    return _.findIndex(routes, route => history.isActive(route.path))
  }


  render() {
    const tabItems = this._getTabRoutes().map(
      (route, index) =>
      <Tab
        key={index}
        value={JSON.stringify(index)}
        label={route.label} route={route.path}
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

    return (
      <AppBar
        style={this.constructor.APP_BAR_STYLE}
        title={this.props.title}
        showMenuIconButton={false}
        iconElementRight={tabs}
      />
    )
  }
}
