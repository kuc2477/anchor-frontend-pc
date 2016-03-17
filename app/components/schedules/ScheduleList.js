import React, { PropTypes } from 'react'
import Infinite from 'react-infinite'
import ScheduleItem from './ScheduleItem'
import { SchedulePropType, SitePropType } from '../../constants/types'


export default class ScheduleList extends React.Component {
  static propTypes = {
    schedules: PropTypes.arrayOf(PropTypes.number).isRequired,
    schedulesById: PropTypes.objectOf(PropTypes.object).isRequired,
    sitesById: SitePropType,
    load: PropTypes.func.isRequired
  };

  static SCHEDULE_ITEM_HEIGHT = 600;
  static LOAD_EDGE_OFFSET = 200;

  _getScheduleNodes() {
    return this.props.schedules
      .map(id => this.props.schedulesById[id])
      .map(schedule => <ScheduleItem key={schedule.id} schedule={schedule}/>)
  }

  render() {
    const scheduleNodes = this._getScheduleNodes()

    return (
      <Infinite
        useWindowAsScrollContainer={true}
        elementHeight={this.constructor.SCHEDULE_ITEM_HEIGHT}
        infiniteLoadBeginEdgeOffset={this.constructor.LOAD_EDGE_OFFSET}
        onInfiniteLoad={this.props.load}
      >
        {scheduleNodes}
      </Infinite>
    )
  }
}
