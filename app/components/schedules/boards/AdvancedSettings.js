import React, { PropTypes } from 'react'
import Colors from 'material-ui/lib/styles/colors'
import { ActionFlightTakeoff } from 'material-ui/lib/svg-icons'

import Title from '../../base/Title'
import { SchedulePropType } from '../../../constants/types'
import BrotherSiteFieldSet from '../fields/BrotherSiteFieldSet'


export default class AdvancedSettings extends React.Component {
  static propTypes = {
    schedule: SchedulePropType
  };

  static BROTHER_FIELD_STYLE = {
    marginBottom: 20
  };

  render() {
    return (
      <div>
        <BrotherSiteFieldSet brothers={this.props.schedule.brothers} />
      </div>
    )
  }
}
