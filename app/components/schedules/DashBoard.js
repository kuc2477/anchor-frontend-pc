import _ from 'lodash'

import React from 'react'
import Slider from 'material-ui/lib/slider'
import SelectField from 'material-ui/lib/select-field'
import MenuItem from 'material-ui/lib/menus/menu-item'

import ScheduleNameField from './ScheduleNameField'
import ScheduleURLField from './ScheduleURLField'
import CycleSelectField from './CycleSelectField'

import {
  MAX_DEPTH_DEFAULT,
  MAX_DEPTH_RANGE_MIN,
  MAX_DEPTH_RANGE_MAX,
  MAX_DIST_DEFALT,
  MAX_DIST_RANGE_MIN,
  MAX_DIST_RANGE_MAX
} from '../../constants/numbers'


export default class DashBoard extends React.Component {
  static propTypes = {
  };

  static STYLE = {
    margin: 10
  };

  render() {
    return (
      <div style={this.constructor.STYLE}>
        <ScheduleNameField />

        <ScheduleURLField />

        <CycleSelectField />

        Maximum depth
        <Slider
          step={1}
          max={MAX_DEPTH_RANGE_MAX}
          min={MAX_DEPTH_RANGE_MIN}
          defaultValue={MAX_DEPTH_DEFAULT}
        />

        Maximum distance
        <Slider
          step={1}
          max={MAX_DIST_RANGE_MAX}
          min={MAX_DIST_RANGE_MIN}
          defaultValue={MAX_DIST_DEFALT}
        />
      </div>
    )
  }
}
