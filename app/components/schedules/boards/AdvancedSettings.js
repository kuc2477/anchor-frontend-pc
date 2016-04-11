import React, { PropTypes } from 'react'

import { ValueLinkPropType } from '../../../constants/types'
import BrotherSiteFieldSet from '../fields/BrotherSiteFieldSet'


export default class AdvancedSettings extends React.Component {
  static propTypes = {
    brothersValueLink: ValueLinkPropType.isRequired,
    brothersError: PropTypes.arrayOf(PropTypes.string),
  };

  static STYLE = {
    marginLeft: -20
  };

  static BROTHER_FIELD_STYLE = {
    marginTop: 20,
    marginBottom: 20,
  };

  render() {
    const { STYLE, BROTHER_FIELD_STYLE } = this.constructor
    const { brothersValueLink, brothersError } = this.props

    return (
      <div style={STYLE}>
        <BrotherSiteFieldSet
          style={BROTHER_FIELD_STYLE}
          valueLink={brothersValueLink}
          error={brothersError}
        />
      </div>
    )
  }
}
