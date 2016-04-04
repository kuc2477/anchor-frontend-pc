import React from 'react'

import { ValueLinkPropType } from '../../../constants/types'
import BrotherSiteFieldSet from '../fields/BrotherSiteFieldSet'


export default class AdvancedSettings extends React.Component {
  static propTypes = {
    brothersValueLink: ValueLinkPropType.isRequired,
  };

  static BROTHER_FIELD_STYLE = {
    marginBottom: 20
  };

  render() {
    const { BROTHER_FIELD_STYLE } = this.constructor
    const { brothersValueLink } = this.props

    return (
      <BrotherSiteFieldSet
        style={BROTHER_FIELD_STYLE}
        valueLink={brothersValueLink}
      />
    )
  }
}
