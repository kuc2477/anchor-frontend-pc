import React, { PropTypes } from 'react'
import { findDOMNode } from 'react-dom'

import SwipeableViews from 'react-swipeable-views'

import Paper from 'material-ui/lib/paper'
import Colors from 'material-ui/lib/styles/colors'

import ScheduleNameField from './fields/ScheduleNameField'
import ScheduleURLField from './fields/ScheduleURLField'
import CycleSelectField from './fields/CycleSelectField'
import MaxDepthSlider from './fields/MaxDepthSlider'
import MaxDistanceSlider from './fields/MaxDistanceSlider'
import BrotherSiteFieldSet from './fields/BrotherSiteFieldSet'

import { SchedulePropType, createSchedule } from '../../constants/types'
import { SCHEDULE_DASHBOARD } from '../../constants/strings'
import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../../constants/numbers'


export default class DashBoard extends React.Component {
  static propTypes = {
    schedule: SchedulePropType,
    saveSchedule: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  static STYLE = {
    width: WINDOW_WIDTH * 0.5 - 50,
    height: WINDOW_HEIGHT * 0.8 - 20,
    marginTop: 20,
    marginBottom: 20,
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
    marginBottom: 30
  };

  static MAX_DIST_FIELD_STYLE = {
    marginBottom: 30
  };

  static BROTHER_FIELD_STYLE = {
    marginBottom: 20
  };

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
      MAX_DEPTH_FIELD_STYLE, MAX_DIST_FIELD_STYLE, BROTHER_FIELD_STYLE,
    } = this.constructor

    const schedule = this.props.schedule || createSchedule()
    const { name, url, cycle, maxDist, maxDepth } = schedule
    const brothers = (schedule && schedule.brothers) || []


    return (
        <Paper zDepth={this._getStyle().zDepth} style={this._getStyle()}>
          <div style={{paddingTop: 15, fontSize: 16}}>Settings</div>
          <SwipeableViews
            index={1}
            disabled
            style={this._getStyle()}
            slideStyle={{overflow: 'none'}}
          >
            <div>
              hello
            </div>
            <div>
              <ScheduleNameField style={NAME_FIELD_STYLE} name={name} />
              <ScheduleURLField style={URL_FIELD_STYLE} url={url} />
              <CycleSelectField style={CYCLE_FIELD_STYLE} cycle={cycle} />
              <MaxDepthSlider style={MAX_DEPTH_FIELD_STYLE} maxDist={maxDist} />
              <MaxDistanceSlider style={MAX_DIST_FIELD_STYLE} maxDepth={maxDepth} />
            </div>
          </SwipeableViews>
        </Paper>
    )
  }
}
