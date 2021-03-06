import _ from 'lodash'
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
    const { schedule: currentSchedule, board: currentBoard } = this.props
    const { schedule: nextSchedule } = nextProps
    if (currentSchedule !== nextSchedule) {
      // sync editing schedule and set general dash board when
      // new schedule has been selected
      this.syncEditing(nextProps)
      this.clearErrors()

      if (currentBoard !== DASH_BOARD_GENERAL_SETTINGS) {
        this.setBoard(DASH_BOARD_GENERAL_SETTINGS)
      }
    }
  }

  setBoard(board) {
    const { dispatch } = this.props
    dispatch(setBoard(board))
  }

  static INITIAL_STATE = {
    editing: null,
    errors: {
      nameError: '',
      urlError: '',
      cycleError: '',
      brothersError: [],
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
    },
    brothers: {
      array: true,
      url: true
    }
  };

  validateBeforeSave() {
    const { editing, errors } = this.state
    const { name, url, cycle } = editing
    const { brothersError } = errors
    let { nameError, urlError, cycleError } = errors
    nameError = !name ? 'Name should not be empty' : nameError
    urlError = !url ? 'Url should not be empty' : urlError
    cycleError = !cycle ? 'Cycle should not be empty' : cycleError

    // update error states and return validation result
    const updatedErrors = Object.assign({}, errors, {
      nameError, urlError, cycleError
    })
    this.setState({ errors: updatedErrors })
    return !nameError && !urlError && !cycleError &&
      brothersError.every(v => !v)
  }

  // Validates form on input value changes. Not that this function has
  // nothing to do with `validateBeforeSave`.
  _validate(values) {
    const updated = Object.assign({}, this.state.editing, values)

    const { FORM_CONSTRAINT } = this.constructor
    const singleConstraint = _.pickBy(FORM_CONSTRAINT, v => !v.array)
    const arrayConstraint =
      _(FORM_CONSTRAINT)
      .pickBy(v => v.array)
      .mapValues(v => _.omit(v, 'array'))
      .value()

    const singleValidation = validate(updated, singleConstraint)
    const arrayValidation =
      _(updated)
      .pickBy((v, k) => _.has(arrayConstraint, k))
      .mapValues(
        (array, key) => array
        .map(v => validate.single(v, arrayConstraint[key]))
        .map(validation =>
             validation && validation[0] &&
             `${key.replace(/s$/, '')} ${validation[0]}`)
      )
      .value()

    return _.merge(singleValidation, arrayValidation)
  }

  // get value link to editing state
  _getValueLink(name) {
    const { FORM_CONSTRAINT } = this.constructor
    const { editing, errors } = this.state
    const isArrayField =
      FORM_CONSTRAINT[name] &&
      FORM_CONSTRAINT[name].array

    // return disconnected value link if we have no editing schedule
    if (!editing) {
      return { value: null, requestChange: (e, v) => v }
    }
    const value = editing[name] || (isArrayField ? [] : null)
    const requestChange = (event, changedValue) => {
      const eventChangedValue = event && event.target && event.target.value
      const finalChangedValue = eventChangedValue || changedValue

      const v = this._validate({ [name]: finalChangedValue })
      const updated = Object.assign({}, editing, { [name]: finalChangedValue })
      const updatedErrors = Object.assign({}, errors, {
        [`${name}Error`]: v && v[name] ?
          isArrayField ?
          v[name] :
          v[name][0] : ''
      })

      this.setState({ editing: updated, errors: updatedErrors })
    }
    return { value, requestChange }
  }

  select(scheduleId) {
    const { dispatch, schedule } = this.props
    if (scheduleId && scheduleId !== schedule) {
      dispatch(selectSchedule(scheduleId))
    }
  }

  load() {
    const { dispatch, urlToFetch, isFetching } = this.props
    if (urlToFetch && !isFetching) {
      dispatch(fetchSchedules(urlToFetch))
    }
  }

  save() {
    const { editing } = this.state
    const { dispatch, schedule, schedulesById } = this.props

    const previous = schedulesById[schedule]
    const changed = previous && editing &&
      !Immutable.fromJS(previous).equals(
      Immutable.fromJS(editing)
    )

    if (schedule && changed && this.validateBeforeSave()) {
      dispatch(saveSchedule(editing, () => {
        toast(`Saved schedule ${editing.name}`)
      }))
    }
  }

  del(scheduleId) {
    const { dispatch, schedulesById } = this.props
    const toDelete = schedulesById[scheduleId]

    if (scheduleId && toDelete) {
      dispatch(deleteSchedule(scheduleId, () => {
        toast(`Deleted schedule ${toDelete.name}`)
      }))
    }
  }

  add(schedule) {
    const { dispatch } = this.props
    dispatch(addSchedule(schedule))
  }

  // manage currently selected schedule's state within container
  // rather than using redux action dispatches. directly using redux
  // store causes performance issue.
  syncEditing(props) {
    const { schedule, schedulesById } = props || this.props
    const editing = schedulesById[schedule]
    this.setState({ editing })
  }

  clearErrors() {
    const { errors } = this.constructor.INITIAL_STATE
    this.setState({ errors })
  }

  render() {
    const { editing } = this.state
    const {
      schedule,
      schedules,
      schedulesById,
      isFetching,
      board
    } = this.props

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
        <div className="col-md-5">
          <ScheduleList
            board={board}
            editing={editing}
            schedule={schedule}
            schedules={schedules}
            schedulesById={schedulesById}
            isFetching={isFetching}
            load={::this.load}
            add={::this.add}
            save={::this.save}
            del={::this.del}
            select={::this.select}
            {...valueLinks}
          />
        </div>
        <div className="col-md-offset-1 col-md-4">
          <DashBoard
            board={board}
            schedule={schedule}
            save={::this.save}
            setBoard={::this.setBoard}
            {...valueLinks} {...errors}
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
