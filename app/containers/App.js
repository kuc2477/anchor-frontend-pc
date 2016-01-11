import React, { PropTypes } from 'react'

import { UserPropType } from '../constants/types'


export default class App extends React.Component {
  static propTypes = {
    user: UserPropType.isRequired,
    children: PropTypes.node
  };

  constructor(props) {
    super(props)
  }

  render() {
    // TODO: ADD NAVIGATION BAR
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
