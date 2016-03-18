import React, { PropTypes } from 'react'
import Infinite from 'react-infinite'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'

import ScheduleItem from './ScheduleItem'
import { INDICATOR, PRIMARY } from '../../constants/colors'
import { SchedulePropType } from '../../constants/types'
import { SCHEDULE_LIST } from '../../constants/strings'
import { WINDOW_WIDTH } from '../../constants/numbers'


export default class ScheduleList extends React.Component {
  static propTypes = {
    isActive: PropTypes.bool,
    schedule: PropTypes.number,
    schedules: PropTypes.arrayOf(PropTypes.number).isRequired,
    schedulesById: PropTypes.objectOf(SchedulePropType).isRequired,
    load: PropTypes.func.isRequired,
    setSectionActive: PropTypes.func.isRequired,
    addSchedule: PropTypes.func.isRequired,
    deleteSchedule: PropTypes.func.isRequired,
  };

  static STYLE = {
    position: 'relative',
    height: 430,
    padding: 20,
  };

  static FAB_STYLE = {
    position: 'fixed',
    right: (WINDOW_WIDTH / 2) + 20,
    bottom: 30,
    color: PRIMARY,
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
    const {
      STYLE, FAB_STYLE,
      SCHEDULE_LIST_HEIGHT, SCHEDULE_ITEM_HEIGHT, LOAD_EDGE_OFFSET
    } = this.constructor
    const { load, addSchedule, deleteSchedule } = this.props
    const scheduleNodes = this._getScheduleNodes()

    return (
      <div
        style={this._getStyle()}
        onMouseEnter={::this._setActive}
      >
        <Infinite
          useWindowAsScrollContainer
          containerHeight={SCHEDULE_LIST_HEIGHT}
          elementHeight={SCHEDULE_ITEM_HEIGHT}
          infiniteLoadBeginEdgeOffset={LOAD_EDGE_OFFSET}
          onInfiniteLoad={load}
        >
          {scheduleNodes}
        </Infinite>

        <FloatingActionButton
          mini backgroundColor={FAB_STYLE.color} style={FAB_STYLE}
          onClick={addSchedule}
        >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }
}
