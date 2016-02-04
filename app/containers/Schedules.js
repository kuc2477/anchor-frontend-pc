import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Immutable from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { SitePropType, SchedulePropType } from '../constants/types'

import DashBoard from '../components/schedules/DashBoard'
import ScheduleList from '../components/schedules/ScheduleList'


class Schedules extends React.Component {
  static propTypes = {
    scheduleId: PropTypes.number,
    isSaving: PropTypes.bool,
    didSaveFail: PropTypes.bool,
    schedules: ImmutablePropTypes.listOf(SchedulePropType),
    schedulesById: PropTypes.instanceOf(Immutable.Map),
    sitesById: PropTypes.instanceOf(Immutable.Map),
    isFetching: PropTypes.bool,
    didFetchFail: PropTypes.bool,
    urlToFetch: PropTypes.string
  };

  load() {
    // TODO: NOT IMPLEMENTED YET
  }

  render() {
    const { schedules, scheduleId, schedulesById, sitesById } = this.props
    const schedule = scheduleId ? schedulesById.get(scheduleId) : null

    return (
      <div className="row">
        <div className="col-md-8 col-sm-6">
          <ScheduleList
            schedules={schedules}
            schedulesById={schedulesById}
            sitesById={sitesById}
            load={::this.load}
          />
        </div>
        <div className="col-md-4 col-sm-6">
          <DashBoard schedule={schedule} />
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
