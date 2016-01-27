import React, { PropTypes } from 'react'
import Infinite from 'react-infinite'
import Immutable from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'

import ScheduleItem from './ScheduleItem'
import { SchedulePropType, SitePropType } from '../../constants/types'


export default class ScheduleList extends React.Component {
  static propTypes = {
    schedules: ImmutablePropTypes.listOf(PropTypes.number).isRequired,
    schedulesById: PropTypes.instanceOf(Immutable.Map).isRequired,
    sitesById: SitePropType,
    load: PropTypes.func.isRequired
  };

  static SCHEDULE_ITEM_HEIGHT = 600;
  static LOAD_EDGE_OFFSET = 200;

  _getScheduleNodes() {
    return this.props.schedules
      .map(id => this.props.schedulesById[id])
      .map(schedule => <ScheduleItem {...schedule} />)
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
