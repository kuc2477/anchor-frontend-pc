import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  DASH_BOARD_GENERAL_SETTINGS,
  DASH_BOARD_ADVANCED_SETTINGS,
} from '../constants/strings'
import { SchedulePropType } from '../constants/types'
import DashBoard from '../components/schedules/DashBoard'
import ScheduleList from '../components/schedules/ScheduleList'
import {
  addSchedule,
  removeSchedule,
  fetchSchedules,
  saveSchedule,
  deleteSchedule,
  selectSchedule,
  setDashBoard,
} from '../actions/schedules'

import '../styles/modules/no-scrollbar.scss'


class Schedules extends React.Component {
  static propTypes = {
    schedule: PropTypes.number,
    schedules: PropTypes.arrayOf(PropTypes.number),
    schedulesById: PropTypes.objectOf(SchedulePropType),
    isSaving: PropTypes.bool,
    didSaveFail: PropTypes.bool,
    isFetching: PropTypes.bool,
    didFetchFail: PropTypes.bool,
    urlToFetch: PropTypes.string,
    board: PropTypes.oneOf([
      DASH_BOARD_GENERAL_SETTINGS,
      DASH_BOARD_ADVANCED_SETTINGS,
    ]),
    dispatch: PropTypes.func
  };

  load() {
    const { dispatch, urlToFetch } = this.props
    if (urlToFetch) {
      dispatch(fetchSchedules(urlToFetch))
    }
  }

  addSchedule() {
    const { dispatch } = this.props
    dispatch(addSchedule())
  }

  removeSchedule(scheduleId) {
    const { dispatch } = this.props
    dispatch(removeSchedule(scheduleId))
  }

  saveSchedule(schedule) {
    // TODO: NOT IMPLEMENTED YET
  }

  deleteSchedule(scheduleId) {
    // TODO: NOT IMPLEMENTED YET
  }

  setScheduleSelected(scheduleId) {
    const { dispatch } = this.props
    dispatch(selectSchedule(scheduleId))
  }

  setBoard(board) {
    const { dispatch } = this.props
    dispatch(setDashBoard(board))
  }

  render() {
    const { schedule, schedules, schedulesById, board } = this.props

    return (
      <div className="row">
        <div className="col-md-6">
          <ScheduleList
            board={board}
            schedule={schedule}
            schedules={schedules}
            schedulesById={schedulesById}
            load={::this.load}
            addSchedule={::this.addSchedule}
            deleteSchedule={::this.deleteSchedule}
            removeSchedule={::this.removeSchedule}
            setScheduleSelected={::this.setScheduleSelected}
          />
        </div>
        <div className="col-md-6">
          <DashBoard
            board={board}
            schedule={schedulesById[schedule] || null}
            saveSchedule={::this.saveSchedule}
            setBoard={::this.setBoard}
          />
        </div>
      </div>
    )
  }
}


export default connect(app => ({
  schedule: app.schedules.get('schedule'),
  schedules: app.schedules.get('schedules').toJS(),
  schedulesById: app.schedules.get('schedulesById').toJS(),
  isSaving: app.schedules.get('isSaving'),
  didSaveFail: app.schedules.get('didSaveFail'),
  isFetching: app.schedules.get('isFetching'),
  didFetchFail: app.schedules.get('didFetchFail'),
  urlToFetch: app.schedules.get('urlToFetch'),
  board: app.schedules.get('board'),
}))(Schedules)
