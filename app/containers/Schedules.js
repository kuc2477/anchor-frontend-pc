import React from 'react'

import DashBoard from '../components/schedules/DashBoard'
import ScheduleList from '../components/schedules/ScheduleList'


export default class ScheduleContainer extends React.Component {
  static propTypes = {
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-sm-6">
          <DashBoard />
        </div>
        <div className="col-md-6 col-sm-6">
          <ScheduleList />
        </div>
      </div>
    )
  }
}
