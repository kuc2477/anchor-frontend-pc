import Immutable from 'immutable'
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
  updateSchedule,
  fetchSchedules,
  saveSchedule,
  deleteSchedule,
  selectSchedule,
  setBoard,
} from '../actions/schedules'
import { toast } from '../modules/utils'

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

  componentWillMount() {
    this.syncEditing()
  }

  componentWillReceiveProps(nextProps) {
    const { schedule: currentSchedule } = this.props
    const { schedule: nextSchedule } = nextProps
    if (currentSchedule !== nextSchedule) {
      this.syncEditing(nextProps)
    }
  }

  setBoard(board) {
    const { dispatch } = this.props
    dispatch(setBoard(board))
  }

  select(scheduleId) {
    const { dispatch } = this.props
    if (scheduleId) {
      dispatch(selectSchedule(scheduleId))
    }
  }

  load() {
    const { dispatch, urlToFetch } = this.props
    if (urlToFetch) {
      dispatch(fetchSchedules(urlToFetch))
    }
  }

  save(scheduleId) {
    const { dispatch } = this.props
    if (scheduleId) {
      dispatch(saveSchedule(scheduleId))
    }
  }

  del(scheduleId) {
    const { dispatch } = this.props
    if (scheduleId) {
      dispatch(deleteSchedule(scheduleId))
    }
  }

  add(schedule) {
    const { dispatch } = this.props
    dispatch(addSchedule(schedule))
  }

  remove(scheduleId) {
    const { dispatch } = this.props
    if (scheduleId) {
      dispatch(removeSchedule(scheduleId))
    }
  }

  update(scheduleId, edited) {
    const { dispatch, schedule, schedulesById } = this.props
    const previous = schedulesById[schedule]

    if (scheduleId &&
        !Immutable.fromJS(previous).equals(Immutable.fromJS(edited))) {
      dispatch(updateSchedule(scheduleId, edited))
      toast(`Successfully updated schedule ${edited.name}`)
    }
  }

  // manage currently selected schedule's state within container
  // rather than using redux action dispatches. directly using redux
  // store causes performance issue.
  syncEditing(props) {
    const { schedule, schedulesById } = props || this.props
    const editing = schedulesById[schedule]
    this.setState({ editing })
  }

  linkValue(name, value) {
    const updated = Object.assign({}, this.state.editing, { [name]: value })
    this.setState({ editing: updated })
  }

  render() {
    const { editing } = this.state
    const { schedule, schedules, schedulesById, board } = this.props

    return (
      <div className="row">
        <div className="col-md-6">
          <ScheduleList
            board={board}
            editing={editing}
            schedule={schedule}
            schedules={schedules}
            schedulesById={schedulesById}
            load={::this.load}
            addSchedule={::this.add}
            deleteSchedule={::this.del}
            removeSchedule={::this.remove}
            selectSchedule={::this.select}
          />
        </div>
        <div className="col-md-6">
          <DashBoard
            board={board}
            editing={editing}
            schedule={schedulesById[schedule]}
            updateSchedule={::this.update}
            saveSchedule={::this.save}
            setBoard={::this.setBoard}
            linkValue={::this.linkValue}
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
