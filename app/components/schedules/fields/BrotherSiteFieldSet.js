import _ from 'lodash'
import React, { PropTypes } from 'react'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'

import BrotherSiteField from './BrotherSiteField'
import { ValueLinkPropType } from '../../../constants/types'
import colors from '../../../constants/colors'


export default class BrotherSiteFieldSet extends React.Component {
  static propTypes = {
    valueLink: ValueLinkPropType.isRequired,
    error: PropTypes.string,
    style: PropTypes.object,
  };

  constructor(props) {
    super(props)
    this.state = {
      isActive: false,
    }
  }

  static STYLE = {
    marginBottom: 50
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

  _onBrotherSiteFieldChange(index, url) {
    const { value: brothers, requestChange } = this.props.valueLink
    const updated = brothers.map((v, i) => i === index ? url : v)
    requestChange(null, updated)
  }

  _getBrotherSiteFieldNodes() {
    const { value: brothers } = this.props.valueLink
    const onChangeFactory = index => (e, v) => {
      this._onBrotherSiteFieldChange(
        index, (e.target && e.target.value) || v
      )
    }

    return (brothers || []).map(
      (url, index) =>
      <BrotherSiteField
        url={url} index={index}
        onChange={onChangeFactory(index)}
      />
    )
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
