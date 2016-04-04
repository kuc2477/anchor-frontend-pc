import Immutable from 'immutable'
import validate from 'validate.js'
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


  constructor(props) {
    super(props)
    this.state = this.constructor.INITIAL_STATE
  }

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

  static INITIAL_STATE = {
    editing: null,
    errors: {
      nameError: '',
      urlError: '',
      cycleError: '',
    }
  };

  static FORM_CONSTRAINT = {
    name: {
      length: {
        minimum: 2,
        message: 'is too short'
      }
    },
    url: {
      url: true
    },
    cycle: {
      presence: true
    }
  };

  // get value link to editing state
  _getValueLink(name) {
    const { editing, errors } = this.state

    // return disconnected value link if we have no editing schedule
    if (!editing) {
      return { value: null, requestChange: (e, v) => v }
    }
    const value = editing[name] || null
    const requestChange = (event, changedValue) => {
      const eventChangedValue = event && event.target && event.target.value
      const finalChangedValue = eventChangedValue || changedValue

      const v = this._validate({ [name]: finalChangedValue })
      const updated = Object.assign({}, editing, { [name]: finalChangedValue })
      const updatedErrors = Object.assign({}, errors, {
        [`${name}Error`]: v && v[name] ? v[name][0] : ''
      })

      this.setState({ editing: updated, errors: updatedErrors })
    }
    return { value, requestChange }
  }

  // Validates form on input value changes. Not that this function has
  // nothing to do with `validateBeforeSave`.
  _validate(values) {
    const constraint = this.constructor.FORM_CONSTRAINT
    const result = validate(
      Object.assign({}, this.state.editing, values), constraint,
    )
    return result
  }

  validateBeforeSave() {
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
    // TODO: BUGGY
    const { dispatch, schedulesById } = this.props
    const toSave = schedulesById[scheduleId]
    if (toSave) {
      dispatch(saveSchedule(toSave))
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

  render() {
    const { editing } = this.state
    const { schedule, schedules, schedulesById, board } = this.props

    const valueLinks = {
      enabledValueLink: this._getValueLink('enabled'),
      nameValueLink: this._getValueLink('name'),
      urlValueLink: this._getValueLink('url'),
      cycleValueLink: this._getValueLink('cycle'),
      maxDepthValueLink: this._getValueLink('maxDepth'),
      maxDistValueLink: this._getValueLink('maxDist'),
      brothersValueLink: this._getValueLink('brothers')
    }

    const errors = Object.assign({}, this.state.errors)

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
            add={::this.add}
            del={::this.del}
            remove={::this.remove}
            select={::this.select}
          />
        </div>
        <div className="col-md-6">
          <DashBoard
            board={board}
            schedule={schedule}
            editing={editing} {...valueLinks} {...errors}
            update={::this.update}
            save={::this.save}
            setBoard={::this.setBoard}
          />
        </div>
      </div>
    )
  }
}


export default connect(app => {
  const { present } = app.schedules
  return {
    schedule: present.get('schedule'),
    schedules: present.get('schedules').toJS(),
    schedulesById: present.get('schedulesById').toJS(),
    isSaving: present.get('isSaving'),
    didSaveFail: present.get('didSaveFail'),
    isFetching: present.get('isFetching'),
    didFetchFail: present.get('didFetchFail'),
    urlToFetch: present.get('urlToFetch'),
    board: present.get('board'),
  }
})(Schedules)
