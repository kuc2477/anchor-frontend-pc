import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { SchedulePropType } from '../constants/types'
import DashBoard from '../components/schedules/DashBoard'
import ScheduleList from '../components/schedules/ScheduleList'
import { addSchedule, fetchSchedules } from '../actions/schedules'
import { SCHEDULE_LIST, SCHEDULE_DASHBOARD } from '../constants/strings.js'

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
    dispatch: PropTypes.func
  };

  constructor(props) {
    super(props)
    this.state = {
      activeSection: SCHEDULE_LIST
    }
  }

  setSectionActive(section) {
    if (section === this.state.activeSection) {
      return
    }
    this.setState({ activeSection: section })
  }

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

  saveSchedule(schedule) {
    // TODO: NOT IMPLEMENTED YET
  }

  deleteSchedule(schedule) {
    // TODO: NOT IMPLEMENTED YET
  }

  render() {
    const { schedule, schedules, schedulesById } = this.props

    return (
      <div className="row">
        <div className="col-md-6 col-sm-6">
          <ScheduleList
            isActive={this.state.activeSection === SCHEDULE_LIST}
            schedule={schedule}
            schedules={schedules}
            schedulesById={schedulesById}
            load={::this.load}
            setSectionActive={::this.setSectionActive}
            addSchedule={::this.addSchedule}
            deleteSchedule={::this.deleteSchedule}
          />
        </div>
        <div className="col-md-6 col-sm-6">
          <DashBoard
            isActive={this.state.activeSection === SCHEDULE_DASHBOARD}
            schedule={schedulesById[schedule]}
            setSectionActive={::this.setSectionActive}
            saveSchedule={::this.saveSchedule}
            deleteSchedule={::this.deleteSchedule}
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
}))(Schedules)
