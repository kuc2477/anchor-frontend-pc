import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { SitePropType, SchedulePropType } from '../constants/types'

import DashBoard from '../components/schedules/DashBoard'
import ScheduleList from '../components/schedules/ScheduleList'
import { fetchSchedules } from '../actions/schedules'


class Schedules extends React.Component {
  static propTypes = {
    scheduleId: PropTypes.number,
    isSaving: PropTypes.bool,
    didSaveFail: PropTypes.bool,
    schedules: PropTypes.arrayOf(PropTypes.number),
    schedulesById: PropTypes.objectOf(SchedulePropType),
    isFetching: PropTypes.bool,
    didFetchFail: PropTypes.bool,
    urlToFetch: PropTypes.string
  };

  load() {
    const { dispatch, urlToFetch } = this.props
    dispatch(fetchSchedules(urlToFetch))
  }

  render() {
    const { schedules, scheduleId, schedulesById, sitesById } = this.props
    const schedule = scheduleId ? schedulesById.get(scheduleId) : null

    return (
      <div className="row">
        <div className="col-md-6 col-sm-6">
          <ScheduleList
            schedules={schedules}
            schedulesById={schedulesById}
            sitesById={sitesById}
            load={::this.load}
          />
        </div>
        <div className="col-md-6 col-sm-6">
          <DashBoard schedule={schedule} />
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
