import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { ValueLinkPropType } from '../../../constants/types'
import OptionURLFieldSet from '../fields/OptionURLFieldSet.js'


export default class URLSettings extends React.Component {
  static propTypes = {
    urlWhitelistValueLink: ValueLinkPropType.isRequired,
    urlWhitelistError: ImmutablePropTypes.listOf(PropTypes.string),
    urlBlacklistValueLink: ValueLinkPropType.isRequired,
    urlBlacklistError: ImmutablePropTypes.listOf(PropTypes.string),
  };

  constructor(props) {
    super(props)
    this.shouldComponentUpdate =
      PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  static STYLE = {
    marginLeft: -20
  };

  static OPTION_URL_FIELD_SET_STYLE = {
    marginTop: 20,
    marginBottom: 20,
  };

  render() {
    const { STYLE, OPTION_URL_FIELD_SET_STYLE } = this.constructor
    const {
      urlWhitelistValueLink,
      urlWhitelistError,
      urlBlacklistValueLink,
      urlBlacklistError,
    } = this.props

    return (
      <div style={STYLE}>
        <OptionURLFieldSet
          label="URL White List"
          style={OPTION_URL_FIELD_SET_STYLE}
          valueLink={urlWhitelistValueLink}
          error={urlWhitelistError}
        />
        <OptionURLFieldSet
          label="URL Black List"
          style={OPTION_URL_FIELD_SET_STYLE}
          valueLink={urlBlacklistValueLink}
          error={urlBlacklistError}
        />
      </div>
    )
  }
}
