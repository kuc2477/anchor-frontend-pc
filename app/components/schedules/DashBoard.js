import React, { PropTypes } from 'react'
import Paper from 'material-ui/lib/paper'

import ScheduleNameField from './fields/ScheduleNameField'
import ScheduleURLField from './fields/ScheduleURLField'
import CycleSelectField from './fields/CycleSelectField'
import MaxDepthSlider from './fields/MaxDepthSlider'
import MaxDistanceSlider from './fields/MaxDistanceSlider'
import BrotherSiteFieldSet from './fields/BrotherSiteFieldSet'

import { SchedulePropType } from '../../constants/types'
import { SCHEDULE_DASHBOARD } from '../../constants/strings'
import { WINDOW_WIDTH } from '../../constants/numbers'


export default class DashBoard extends React.Component {
  static propTypes = {
    isActive: PropTypes.bool,
    schedule: SchedulePropType,
    setSectionActive: PropTypes.func.isRequired,
    saveSchedule: PropTypes.func.isRequired,
    deleteSchedule: PropTypes.func.isRequired,
  };

  static defaultProps = {
    schedule: {}
  };

  static STYLE = {
    width: WINDOW_WIDTH * 0.5 - 50,
    marginTop: 20,
    paddingTop: -20,
    paddingLeft: 40,
    zDepth: 1
  };

  static NAME_FIELD_STYLE = {
  };

  static URL_FIELD_STYLE = {
  };

  static CYCLE_FIELD_STYLE = {
    marginBottom: 20
  };

  static MAX_DEPTH_FIELD_STYLE = {
    marginBottom: 40
  };

  static MAX_DIST_FIELD_STYLE = {
    marginBottom: 40
  };

  static BROTHER_FIELD_STYLE = {
    marginBottom: 20
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
    const {
      NAME_FIELD_STYLE, URL_FIELD_STYLE, CYCLE_FIELD_STYLE,
      MAX_DEPTH_FIELD_STYLE, MAX_DIST_FIELD_STYLE, BROTHER_FIELD_STYLE
    } = this.constructor
    const { schedule } = this.props
    const { name, url, cycle, maxDist, maxDepth } = schedule
    const brothers = (schedule && schedule.brothers) || []

    return (
      <Paper
        zDepth={this._getStyle().zDepth}
        style={this._getStyle()}
        onMouseEnter={::this._setActive}
      >
        <ScheduleNameField style={NAME_FIELD_STYLE} name={name} />
        <ScheduleURLField style={URL_FIELD_STYLE} url={url} />
        <CycleSelectField style={CYCLE_FIELD_STYLE} cycle={cycle} />
        <MaxDepthSlider style={MAX_DEPTH_FIELD_STYLE} maxDist={maxDist} />
        <MaxDistanceSlider style={MAX_DIST_FIELD_STYLE} maxDepth={maxDepth} />
        <BrotherSiteFieldSet style={BROTHER_FIELD_STYLE} brothers={brothers} />
      </Paper>
    )
  }
}
