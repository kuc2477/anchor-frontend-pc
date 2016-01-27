import React from 'react'
import { connect } from 'react-redux'

import DashBoard from '../components/schedules/DashBoard'
import ScheduleList from '../components/schedules/ScheduleList'


class Schedules extends React.Component {
  static propTypes = {
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-4 col-sm-6">
          <DashBoard />
        </div>
        <div className="col-md-8 col-sm-6">
          <ScheduleList />
        </div>
      </div>
    )
  }
}


export default connect(app => ({
  scheduleId: app.schedules.get('scheduleId'),
  isSaving: app.schedules.get('isSaving'),
  didSaveFail: app.schedules.get('didSaveFail'),
  schedules: app.schedules.get('schedules'),
  schedulesById: app.schedules.get('schedulesById'),
  sitesById: app.schedules.get('sitesById'),
  isFetching: app.schedules.get('isFetching'),
  didFetchFail: app.schedules.get('didFetchFail'),
  urlToFetch: app.schedules.get('urlToFetch')
}))(Schedules)
