import _ from 'lodash'
import Immutable from 'immutable'

import React from 'react'
import SelectField from 'material-ui/lib/select-field'
import MenuItem from 'material-ui/lib/menus/menu-item'

import ScheduleNameField from './fields/ScheduleNameField'
import ScheduleURLField from './fields/ScheduleURLField'
import CycleSelectField from './fields/CycleSelectField'
import MaxDepthSlider from './fields/MaxDepthSlider'
import MaxDistanceSlider from './fields/MaxDistanceSlider'
import BrotherSiteFieldSet from './fields/BrotherSiteFieldSet'

import { SchedulePropType } from '../../constants/types'


export default class DashBoard extends React.Component {
  static propTypes = {
    schedule: SchedulePropType
  };

  static STYLE = {
    margin: 10
  };

  render() {
    const { schedule } = this.props
    const brothers = schedule ? schedule.get('brothers') : new Immutable.List()

    return (
      <div style={this.constructor.STYLE}>
        <ScheduleNameField />
        <ScheduleURLField />
        <CycleSelectField />
        <MaxDepthSlider />
        <MaxDistanceSlider />
        <BrotherSiteFieldSet brothers={brothers} />
      </div>
    )
  }
}
