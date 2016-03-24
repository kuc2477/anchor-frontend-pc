import React, { PropTypes } from 'react'
import Colors from 'material-ui/lib/styles/colors'
import { ActionFlightTakeoff } from 'material-ui/lib/svg-icons'

import Title from '../../base/Title'
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
    const { brothersValueLink } = this.props
    return (
      <BrotherSiteFieldSet valueLink={brothersValueLink} />
    )
  }
}
