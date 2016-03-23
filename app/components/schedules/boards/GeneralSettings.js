import React, { PropTypes } from 'react'
import Colors from 'material-ui/lib/styles/colors'
import { ActionSettings } from 'material-ui/lib/svg-icons'

import { SchedulePropType } from '../../../constants/types'
import Title from '../../base/Title'
import ScheduleNameField from '../fields/ScheduleNameField'
import ScheduleURLField from '../fields/ScheduleURLField'
import CycleSelectField from '../fields/CycleSelectField'
import MaxDepthSlider from '../fields/MaxDepthSlider'
import MaxDistanceSlider from '../fields/MaxDistanceSlider'


export default class GeneralSettings extends React.Component {
  static propTypes = {
    schedule: SchedulePropType,
  };

  static NAME_FIELD_STYLE = {
    marginTop: -10,
    marginBottom: -10,
  };

  static URL_FIELD_STYLE = {
    marginBottom: -10,
  };

  static CYCLE_FIELD_STYLE = {
    marginTop: -10,
    marginBottom: 30,
  };

  static MAX_DEPTH_FIELD_STYLE = {
    marginBottom: 30
  };

  static MAX_DIST_FIELD_STYLE = {
    marginBottom: 30
  };

  render() {
    const {
      TITLE_ROW_STYLE, TITLE_ICON_STYLE, TITLE_MENU_STYLE,
      NAME_FIELD_STYLE, URL_FIELD_STYLE, CYCLE_FIELD_STYLE,
      MAX_DEPTH_FIELD_STYLE, MAX_DIST_FIELD_STYLE,
    } = this.constructor

    const schedule = this.props.schedule || createSchedule()
    const { name, url, cycle, maxDist, maxDepth } = schedule

    return (
      <div>
        <ScheduleNameField style={NAME_FIELD_STYLE} name={name} />
        <ScheduleURLField style={URL_FIELD_STYLE} url={url} />
        <CycleSelectField style={CYCLE_FIELD_STYLE} cycle={cycle} />
        <MaxDepthSlider style={MAX_DEPTH_FIELD_STYLE} maxDist={maxDist} />
        <MaxDistanceSlider style={MAX_DIST_FIELD_STYLE} maxDepth={maxDepth} />
      </div>
    )
  }
}
