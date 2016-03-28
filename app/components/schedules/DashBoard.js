import _ from 'lodash'
import React, { PropTypes } from 'react'

import Paper from 'material-ui/lib/paper'
import SwipeableViews from 'react-swipeable-views'

import DashBoardTitle from './DashBoardTitle'
import GeneralSettings from './boards/GeneralSettings'
import AdvancedSettings from './boards/AdvancedSettings'
import { SchedulePropType } from '../../constants/types'
import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../../constants/numbers'
import {
  DASH_BOARD_GENERAL_SETTINGS,
  DASH_BOARD_ADVANCED_SETTINGS,
} from '../../constants/strings'
import { SCHEDULE_DASH_BOARDS } from '../../constants/arrays'


export default class DashBoard extends React.Component {
  static propTypes = {
    editing: SchedulePropType,
    schedule: SchedulePropType,
    board: PropTypes.oneOf([
      DASH_BOARD_GENERAL_SETTINGS,
      DASH_BOARD_ADVANCED_SETTINGS,
    ]).isRequired,
    // schedule entry / board manipulation
    updateSchedule: PropTypes.func.isRequired,
    saveSchedule: PropTypes.func.isRequired,
    setBoard: PropTypes.func.isRequired,
    linkValue: PropTypes.func.isRequired,
  };

  // root element style
  static STYLE = {
    width: WINDOW_WIDTH * 0.5 - 100,
    height: WINDOW_HEIGHT * 0.8 - 40,
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

  _getValueLink(name) {
    const { editing, linkValue } = this.props

    // return disconnected value link if we have no editing schedule
    if (!editing) {
      return { value: null, requestChange: (e, v) => v }
    }

    const value = editing[name] || null
    const requestChange = (event, changedValue) => {
      const eventChangedValue = event && event.target && event.target.value
      linkValue(name, eventChangedValue || changedValue)
    }
    return { value, requestChange }
  }

  updateEditing() {
    const { schedule, editing, updateSchedule } = this.props

    // don't update if we have no editing schedule
    if (!editing) {
      return
    }

    updateSchedule(schedule.id, editing)
  }

  saveEditing() {
    const { schedule, saveSchedule } = this.props

    // don't save if we have no schedule
    if (!schedule) {
      return
    }

    saveSchedule(schedule.id)
  }


  render() {
    const { STYLE, SLIDE_STYLE } = this.constructor
    const SLIDE_CONTAINER_STYLE = this._getContainerStyle()
    const { board, setBoard } = this.props

    const settingsProps = {
      nameValueLink: this._getValueLink('name'),
      urlValueLink: this._getValueLink('url'),
      cycleValueLink: this._getValueLink('cycle'),
      maxDepthValueLink: this._getValueLink('maxDepth'),
      maxDistValueLink: this._getValueLink('maxDist'),
      brothersValueLink: this._getValueLink('brothers')
    }

    const generalSettingsProps = _.pick(settingsProps, [
      'nameValueLink', 'urlValueLink', 'cycleValueLink',
      'maxDepthValueLink', 'maxDistValueLink'
    ])

    const advancedSettingsProps = _.pick(settingsProps, [
      'brothersValueLink'
    ])

    return (
      <Paper
        zDepth={STYLE.zDepth}
        style={STYLE}
        onMouseLeave={::this.updateEditing}
      >
        <DashBoardTitle board={board} setBoard={setBoard} />
        <SwipeableViews
          disabled
          index={_.findIndex(SCHEDULE_DASH_BOARDS, b => b === board)}
          style={SLIDE_CONTAINER_STYLE}
          slideStyle={SLIDE_STYLE}
        >
          <GeneralSettings {...generalSettingsProps} />
          <AdvancedSettings {...advancedSettingsProps} />
        </SwipeableViews>
      </Paper>
    )
  }
}
