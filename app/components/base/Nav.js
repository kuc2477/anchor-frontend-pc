import _ from 'lodash'

import React, { PropTypes } from 'react'
import { AppBar, Tabs, Tab } from 'material-ui'

import { UserPropType } from '../../constants/types'
import { HOME, NEWS_LIST } from '../../constants/routes'


export default class Nav extends React.Component {
  static propTypes = {
    user: UserPropType.isRequired,
    title: PropTypes.string.isRequired
  };

  static defaultProps = {
    title: this.constructor.MENU.title
  };

  static MENU = {
    title: 'Anchor',
    groups: [
      [
        { route: HOME },
        { route: NEWS_LIST }
      ]
    ]
  };

  static APP_BAR_STYLE = { position: 'fixed' };
  static TAB_ITEM_STYLE = { marginRight: 20 };


  constructor(props) {
    super(props)
    this.state = { tabIndex: 0 }
  }

  componentWillReceiveProps() {
    if (this.state.tabIndex !== this.getSelectedIndex()) {
      this.setState({ tabIndex })
    }
  }


  onTabActive(tab) {
    this.context.history.pushState(null, tab.props.path)
    this.setState({ tabIndex: this.getSelectedIndex() })
  }

  getTabRoutes() {
    return _(this.constructor.MENU).flatten().filter(nav => {
      return (
        !nav.onlyVisibleToAnonymous && !nav.onlyVisibleToAuthenticated ||
        (nav.onlyVisibleToAuthenticated && this.props.user) ||
        (nav.onlyVisibleToAnonymous && !this.props.user)
      )
    }).map(nav => nav.route).value()
  }

  getSelectedIndex() {
    const history = this.context.history
    const routes = this.getTabRoutes()
    return _.findInde(routes, route => history.isActive(route.path))
  }


  render() {
    const tabItems = this.getTabRoutes().map(
      (route, index) => <Tab
        key={index}
        value={JSON.stringify(index)}
        label={route.label} path={route.path}
        onActive={::this.onTabActive} />
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
        iconElementRight={tabs} />
    )
  }
}
