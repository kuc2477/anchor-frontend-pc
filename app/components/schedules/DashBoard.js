import React, { PropTypes } from 'react'

import ScheduleNameField from './fields/ScheduleNameField'
import ScheduleURLField from './fields/ScheduleURLField'
import CycleSelectField from './fields/CycleSelectField'
import MaxDepthSlider from './fields/MaxDepthSlider'
import MaxDistanceSlider from './fields/MaxDistanceSlider'
import BrotherSiteFieldSet from './fields/BrotherSiteFieldSet'

import { SchedulePropType } from '../../constants/types'
import { SCHEDULE_DASHBOARD } from '../../constants/strings'


export default class DashBoard extends React.Component {
  static propTypes = {
    isActive: PropTypes.bool,
    schedule: SchedulePropType,
    setSectionActive: PropTypes.func.isRequired
  };

  static STYLE = {
    position: 'fixed',
    margin: 10
  };

  _setActive() {
    this.props.setSectionActive(SCHEDULE_DASHBOARD)
  }

  _getStyle() {
    const { isActive } = this.props
    const base = this.constructor.STYLE

    return Object.assign({}, base, {
      position: isActive ? 'relative' : 'fixed'
    })
  }

  render() {
    const { schedule } = this.props
    const brothers = (schedule && schedule.brothers) || []

    return (
      <div
        style={this.constructor.STYLE}
        onMouseEnter={::this._setActive}
      >
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
