import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'

import BrotherSiteField from './BrotherSiteField'
import colors from '../../../constants/colors'


export default class BrotherSiteFieldSet extends React.Component {
  static propTypes = {
    brothers: ImmutablePropTypes.listOf(PropTypes.string).isRequired
  };

  constructor(props) {
    super(props)
    this.state = { isActive: false }
  }

  static STYLE = {
    minHeight: 500
  };

  static TITLE_STYLE = {
    marginLeft: 0
  };

  static INACTIVE_LABEL_STYLE = {
    color: colors.INACTIVE,
    fontSize: 14
  };

  static ACTIVE_LABEL_STYLE = {
    color: colors.SECONDARY
  };

  static ADD_BUTTON_STYLE = {
    marginLeft: 5,
    height: 16,
    width: 16,
  };

  _getBrotherSiteFieldNodes() {
    return this.props.brothers.map(url => <BrotherSiteField url={url} />)
  }

  _getLabelStyle() {
    return this.state.isActive ?
      this.constructor.ACTIVE_LABEL_STYLE :
      this.constructor.INACTIVE_LABEL_STYLE
  }

  render() {
    const { style } = this.props
    const brotherSiteFieldNodes = this._getBrotherSiteFieldNodes()

    return (
      <div style={style}>
        <div className="row" style={this.constructor.TITLE_STYLE}>
          <small style={this._getLabelStyle()}>Brother sites</small>
          <ContentAdd
            className="clickable"
            style={this.constructor.ADD_BUTTON_STYLE}
            color={colors.INACTIVE}
            hoverColor={colors.SECONDARY}
          />
        </div>
        {brotherSiteFieldNodes}
      </div>
    )
  }
}
