import _ from 'lodash'
import React, { PropTypes } from 'react'

import Paper from 'material-ui/lib/paper'
import SwipeableViews from 'react-swipeable-views'

import DashBoardTitle from './DashBoardTitle'
import GeneralSettings from './boards/GeneralSettings'
import AdvancedSettings from './boards/AdvancedSettings'
import { SchedulePropType, createSchedule } from '../../constants/types'
import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../../constants/numbers'
import {
  DASH_BOARD_GENERAL_SETTINGS,
  DASH_BOARD_ADVANCED_SETTINGS,
} from '../../constants/strings'
import { SCHEDULE_DASH_BOARDS } from '../../constants/arrays'


export default class DashBoard extends React.Component {
  static propTypes = {
    schedule: SchedulePropType,
    saveSchedule: PropTypes.func.isRequired,
    board: PropTypes.oneOf([
      DASH_BOARD_GENERAL_SETTINGS,
      DASH_BOARD_ADVANCED_SETTINGS,
    ]).isRequired,
    setBoard: PropTypes.func.isRequired
  };

  // root element style
  static STYLE = {
    width: WINDOW_WIDTH * 0.5 - 100,
    height: WINDOW_HEIGHT * 0.8 - 20,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 35,
    paddingTop: -20,
    paddingLeft: 20,
    zDepth: 1,
    position: 'fixed',
  };

  // swipeable container style
  static SLIDE_CONTAINER_STYLE = {
    paddingLeft: 20,
  };

  static SLIDE_STYLE = {
    overflow: 'none',
    marginRight: 20,
  };

  _getContainerStyle() {
    const { STYLE, SLIDE_CONTAINER_STYLE } = this.constructor
    return {
      width: STYLE.width,
      height: STYLE.height,
      ...SLIDE_CONTAINER_STYLE
    }
  }

  render() {
    const { STYLE, SLIDE_STYLE } = this.constructor
    const SLIDE_CONTAINER_STYLE = this._getContainerStyle()
    const schedule = this.props.schedule || createSchedule()
    const { board, setBoard } = this.props

    return (
      <Paper zDepth={STYLE.zDepth} style={STYLE}>
        <DashBoardTitle board={board} setBoard={setBoard} />
        <SwipeableViews
          disabled
          index={_.findIndex(SCHEDULE_DASH_BOARDS, b => b === board)}
          style={SLIDE_CONTAINER_STYLE}
          slideStyle={SLIDE_STYLE}
        >
          <GeneralSettings schedule={schedule} />
          <AdvancedSettings schedule={schedule} />
        </SwipeableViews>
      </Paper>
    )
  }
}
