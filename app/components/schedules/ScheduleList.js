import React, { PropTypes } from 'react'
import Infinite from 'react-infinite'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'

import ScheduleItem from './ScheduleItem'
import { SchedulePropType } from '../../constants/types'
import { SCHEDULE_LIST } from '../../constants/strings'


export default class ScheduleList extends React.Component {
  static propTypes = {
    isActive: PropTypes.bool,
    schedules: PropTypes.arrayOf(PropTypes.number).isRequired,
    schedulesById: PropTypes.objectOf(SchedulePropType).isRequired,
    load: PropTypes.func.isRequired,
    setSectionActive: PropTypes.func.isRequired
  };

  static STYLE = {
    position: 'relative',
    height: 430
  };
  static FAB_STYLE = {
    position: 'absolute',
    right: 0,
    bottom: 0
  };
  static SCHEDULE_LIST_HEIGHT = 800;
  static SCHEDULE_ITEM_HEIGHT = 100;
  static LOAD_EDGE_OFFSET = 50;

  _setActive() {
    this.props.setSectionActive(SCHEDULE_LIST)
  }

  _getStyle() {
    const { isActive } = this.props
    const base = this.constructor.STYLE
    return Object.assign({}, base, {
      position: isActive ? 'relative' : 'fixed'
    })
  }

  _getScheduleNodes() {
    return this.props.schedules
      .map(id => this.props.schedulesById[id])
      .map(schedule => <ScheduleItem key={schedule.id} schedule={schedule}/>)
  }

  render() {
    const scheduleNodes = this._getScheduleNodes()

    return (
      <div
        style={this.constructor.STYLE}
        onMouseEnter={::this._setActive}
      >
        <Infinite
          containerHeight={this.constructor.SCHEDULE_LIST_HEIGHT}
          useWindowAsScrollContainer
          elementHeight={this.constructor.SCHEDULE_ITEM_HEIGHT}
          infiniteLoadBeginEdgeOffset={this.constructor.LOAD_EDGE_OFFSET}
          onInfiniteLoad={this.props.load}
        >
          {scheduleNodes}
        </Infinite>

        <FloatingActionButton
          mini secondary
          style={this.constructor.FAB_STYLE}
        >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }
}
