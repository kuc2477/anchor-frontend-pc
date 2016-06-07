import _ from 'lodash'
import Immutable from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import validate from 'validate.js'
import React, { PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
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


export default class Schedules extends React.Component {
  static propTypes = {
    schedule: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    schedules: ImmutablePropTypes.listOf(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ])),
    schedulesById: ImmutablePropTypes.contains(SchedulePropType),
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
    this.shouldComponentUpdate =
      PureRenderMixin.shouldComponentUpdate.bind(this)
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
    errors: Immutable.fromJS({
      nameError: '',
      urlError: '',
      cycleError: '',
      urlWhitelistError: [],
      urlBlacklistError: [],
    })
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
    'options.urlWhitelist': {
      array: true,
      url: true,
    },
    'options.urlBlacklist': {
      array: true,
      url: true,
    },
  };

  // ===========
  // Validations
  // ===========

  validateBeforeSave() {
    const { editing, errors } = this.state
    const { name, url, cycle } = editing.toJS()
    const { urlWhitelistError, urlBlacklistError } = errors.toJS()
    let { nameError, urlError, cycleError } = errors
    nameError = !name ? 'Name should not be empty' : nameError
    urlError = !url ? 'Url should not be empty' : urlError
    cycleError = !cycle ? 'Cycle should not be empty' : cycleError

    // update error states and return validation result
    const updatedErrors = errors.merge({
      nameError, urlError, cycleError
    })
    this.setState({ errors: updatedErrors })
    return !nameError && !urlError && !cycleError &&
      urlWhitelistError.every(v => !v) &&
      urlBlacklistError.every(v => !v)
  }

  // Validates form on input value changes. Not that this function has
  // nothing to do with `validateBeforeSave`.
  _validate(values) {
    const { FORM_CONSTRAINT } = this.constructor
    const { editing } = this.state
    const updated = editing.merge(values).toJS()

    const singleConstraint = _.pickBy(FORM_CONSTRAINT, v => !v.array)
    const arrayConstraint =
      _(FORM_CONSTRAINT)
      .pickBy(v => v.array)
      .mapValues(v => _.omit(v, 'array'))
      .value()

    const singleValidation = validate(updated, singleConstraint)
    const arrayValidation = _(arrayConstraint).mapValues(
      (constraints, key) => (_.get(updated, key) || [])
      .map(v => validate.single(v, constraints))
      .map(v => v && v[0] && _.capitalize(v[0]))
    )
    .value()

    return _.merge(singleValidation, arrayValidation)
  }

  // ====================
  // Value Link Factories
  // ====================

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

    // generate updated value and value link
    const value = editing.get(name) || (
      isArrayField ? new Immutable.List() : null)

    const requestChange = (event, changedValue) => {
      const eventChangedValue = event && event.target && event.target.value
      const finalChangedValue = eventChangedValue || changedValue

      const v = this._validate({ [name]: finalChangedValue })
      const updated = editing.set(name, finalChangedValue)
      const updatedErrors = errors.set(
        `${name}Error`,
        (v && v[name]) ? isArrayField ?
          new Immutable.List(v[name]) :
            v[name][0] : ''
      )
      this.setState({ editing: updated, errors: updatedErrors })
    }

    return { value, requestChange }
  }

  // get value link to nested editing state (e.g. schedule.options.*)
  _getNestedValueLink(name, nestedName) {
    const concatenatedName = `${name}.${nestedName}`
    const { FORM_CONSTRAINT } = this.constructor
    const { editing, errors } = this.state
    const isArrayField =
      FORM_CONSTRAINT[concatenatedName] &&
      FORM_CONSTRAINT[concatenatedName].array

    // return disconnected value link if we have no editing schedule
    if (!editing) {
      return { value: null, requestChange: (e, v) => v }
    }

    // generate updated value and value link
    const value = editing.getIn([name, nestedName]) ||
      (isArrayField ? new Immutable.List() : null)

    const requestChange = (event, changedValue) => {
      const eventChangedValue = event && event.target && event.target.value
      const finalChangedValue = eventChangedValue || changedValue

      const v = this._validate(editing.setIn([name, nestedName], finalChangedValue))
      const updated = editing.setIn([name, nestedName], finalChangedValue)
      const updatedErrors = errors.set(
        `${nestedName}Error`,
        v && v[concatenatedName] ? isArrayField ?
          new Immutable.List(v[concatenatedName]) : v[concatenatedName][0] :
        isArrayField ? new Immutable.List() : ''
      )

      this.setState({ editing: updated, errors: updatedErrors })
    }

    return { value, requestChange }
  }

  // ====================
  // Container Operations
  // ====================

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

    const previous = schedulesById.get(schedule)
    const changed = previous && editing &&
      !Immutable.fromJS(previous).equals(
      Immutable.fromJS(editing)
    )

    if (schedule && changed && this.validateBeforeSave()) {
      dispatch(saveSchedule(editing, () => {
        toast(`Saved schedule ${editing.get('name')}`)
      }))
    }
  }

  del(scheduleId) {
    const { dispatch, schedulesById } = this.props
    const toDelete = schedulesById.get(scheduleId)

    if (scheduleId && toDelete) {
      dispatch(deleteSchedule(scheduleId, () => {
        toast(`Deleted schedule ${toDelete.get('name')}`)
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
    const editing = schedulesById.get(schedule)
    this.setState({ editing })
  }

  clearErrors() {
    const { errors } = this.constructor.INITIAL_STATE
    this.setState({ errors })
  }

  render() {
    let { errors } = this.state
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
      typeValueLink: this._getValueLink('type'),
      maxVisitValueLink: this._getNestedValueLink('options', 'maxVisit'),
      maxDistValueLink: this._getNestedValueLink('options', 'maxDist'),
      urlWhitelistValueLink: this._getNestedValueLink('options', 'urlWhitelist'),
      urlBlacklistValueLink: this._getNestedValueLink('options', 'urlBlacklist')
    }

    errors = {
      nameError: errors.get('nameError'),
      urlError: errors.get('urlError'),
      cycleError: errors.get('cycleError'),
      urlWhitelistError: errors.get('urlWhitelistError'),
      urlBlacklistError: errors.get('urlBlacklistError'),
    }

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
    schedules: present.get('schedules'),
    schedulesById: present.get('schedulesById'),
    isSaving: present.get('isSaving'),
    didSaveFail: present.get('didSaveFail'),
    isFetching: present.get('isFetching'),
    didFetchFail: present.get('didFetchFail'),
    urlToFetch: present.get('urlToFetch'),
    board: present.get('board'),
  }
})(Schedules)
