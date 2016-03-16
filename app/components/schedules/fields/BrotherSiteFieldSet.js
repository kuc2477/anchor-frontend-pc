import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

import BrotherSiteField from './BrotherSiteField'
import colors from '../../../constants/colors'


export default class BrotherSiteFieldSet extends React.Component {
  static INACTIVE_LABEL_STYLE = {
    color: colors.INACTIVE,
    fontSize: 14
  };

  static ACTIVE_LABEL_STYLE = {
    color: colors.SECONDARY
  };

  static propTypes = {
    brothers: ImmutablePropTypes.listOf(PropTypes.string).isRequired
  };

  constructor(props) {
    super(props)
    this.state = { isActive: false }
  }

  _getBrotherSiteFieldNodes() {
    return this.props.brothers.map(url => <BrotherSiteField url={url} />)
  }

  _getLabelStyle() {
    return this.state.isActive ?
      this.constructor.ACTIVE_LABEL_STYLE :
      this.constructor.INACTIVE_LABEL_STYLE
  }

  render() {
    const brotherSiteFieldNodes = this._getBrotherSiteFieldNodes()

    return (
      <div>
        <small style={this._getLabelStyle()}>Brother sites</small>
        {brotherSiteFieldNodes}
      </div>
    )
  }
}
