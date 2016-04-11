import React, { PropTypes } from 'react'

import { ValueLinkPropType } from '../../../constants/types'
import BrotherSiteFieldSet from '../fields/BrotherSiteFieldSet'


export default class AdvancedSettings extends React.Component {
  static propTypes = {
    brothersValueLink: ValueLinkPropType.isRequired,
    brothersError: PropTypes.arrayOf(PropTypes.string),
  };

  static BROTHER_FIELD_STYLE = {
    marginBottom: 20
  };

  render() {
    const { BROTHER_FIELD_STYLE } = this.constructor
    const { brothersValueLink, brothersError } = this.props

    return (
      <div>
        <BrotherSiteFieldSet
          style={BROTHER_FIELD_STYLE}
          valueLink={brothersValueLink}
          error={brothersError}
        />
      </div>
    )
  }
}
