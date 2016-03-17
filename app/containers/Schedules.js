import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { SchedulePropType } from '../constants/types'

import DashBoard from '../components/schedules/DashBoard'
import ScheduleList from '../components/schedules/ScheduleList'
import { fetchSchedules } from '../actions/schedules'
import { SCHEDULE_LIST, SCHEDULE_DASHBOARD } from '../constants/strings.js'


class Schedules extends React.Component {
  static propTypes = {
    scheduleId: PropTypes.number,
    isSaving: PropTypes.bool,
    didSaveFail: PropTypes.bool,
    schedules: PropTypes.arrayOf(PropTypes.number),
    schedulesById: PropTypes.objectOf(SchedulePropType),
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
    dispatch(fetchSchedules(urlToFetch))
  }

  render() {
    const { schedules, scheduleId, schedulesById } = this.props
    const schedule = scheduleId ? schedulesById.get(scheduleId) : null

    return (
      <div className="row">
        <div className="col-md-6 col-sm-6">
          <ScheduleList
            isActive={this.state.activeSection === SCHEDULE_LIST}
            schedules={schedules}
            schedulesById={schedulesById}
            load={::this.load}
            setSectionActive={::this.setSectionActive}
          />
        </div>
        <div className="col-md-6 col-sm-6">
          <DashBoard
            isActive={this.state.activeSection === SCHEDULE_DASHBOARD}
            schedule={schedule}
            setSectionActive={::this.setSectionActive}
          />
        </div>
      </div>
    )
  }
}


export default connect(app => ({
  // schedule
  scheduleId: app.schedules.get('scheduleId'),
  isSaving: app.schedules.get('isSaving'),
  didSaveFail: app.schedules.get('didSaveFail'),
  // schedules
  schedules: app.schedules.get('schedules').toJS(),
  schedulesById: app.schedules.get('schedulesById').toJS(),
  isFetching: app.schedules.get('isFetching'),
  didFetchFail: app.schedules.get('didFetchFail'),
  urlToFetch: app.schedules.get('urlToFetch')
}))(Schedules)
