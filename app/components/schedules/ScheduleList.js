import _ from 'lodash'
import React, { PropTypes } from 'react'
import Infinite from 'react-infinite'

import { SelectableContainerEnhance } from 'material-ui/lib/hoc/selectable-enhance'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'

import ScheduleItem from './ScheduleItem'
import { SECONDARY } from '../../constants/colors'
import { SchedulePropType, ValueLinkPropType } from '../../constants/types'
import { SCHEDULE_LIST } from '../../constants/strings'
import { WINDOW_WIDTH } from '../../constants/numbers'


export default class ScheduleList extends React.Component {
  static propTypes = {
    // component activeness
    isActive: PropTypes.bool,
    // schedules
    editing: SchedulePropType.isRequired,
    schedule: PropTypes.number,
    schedules: PropTypes.arrayOf(PropTypes.number).isRequired,
    schedulesById: PropTypes.objectOf(SchedulePropType).isRequired,
    load: PropTypes.func.isRequired,
    // schedule entry manipulation
    addSchedule: PropTypes.func.isRequired,
    removeSchedule: PropTypes.func.isRequired,
    deleteSchedule: PropTypes.func.isRequired,
    selectSchedule: PropTypes.func.isRequired,
  };

  static STYLE = {
    height: 350,
    width: WINDOW_WIDTH * 0.5 - 60,
    marginRight: 20,
    padding: 20,
  };

  static FAB_STYLE = {
    position: 'fixed',
    right: WINDOW_WIDTH / 2,
    bottom: 40,
    color: SECONDARY,
  };

  static LIST_ITEM_STYLE = {
    marginBottom: 10,
  };

  static SCHEDULE_LIST_HEIGHT = 800;
  static SCHEDULE_ITEM_HEIGHT = 100;
  static LOAD_EDGE_OFFSET = 50;

  _getScheduleNodes() {
    const { LIST_ITEM_STYLE } = this.constructor
    const {
      editing,
      schedule: selected,
      removeSchedule,
      selectSchedule
    } = this.props

    const select = scheduleId => () => {
      selectSchedule(scheduleId)
    }

    return this.props.schedules
      .map(id => this.props.schedulesById[id])
      .map(schedule => (
        <ScheduleItem
          style={LIST_ITEM_STYLE}
          key={schedule.id}
          value={schedule.id}
          selected={schedule.id === selected}
          schedule={schedule.id === selected ? editing : schedule}
          removeSchedule={removeSchedule}
          onClick={select(schedule.id)}
        />
      ))
  }

  _getSelectedValueLink() {
    const { schedule, schedules, selectSchedule, dispatch } = this.props
    const value = _.findIndex(schedules, s => s == schedule)
    const requestChange = index => {
      dispatch(selectSchedule(schedules[index]))
    }
    return { value, requestChange }
  }

  render() {
    const {
      STYLE, FAB_STYLE, LOAD_EDGE_OFFSET,
      SCHEDULE_LIST_HEIGHT, SCHEDULE_ITEM_HEIGHT,
    } = this.constructor
    const { load, addSchedule } = this.props
    const scheduleNodes = this._getScheduleNodes()

    return (
      <div style={STYLE}>
        <Infinite
          useWindowAsScrollContainer
          containerHeight={SCHEDULE_LIST_HEIGHT}
          elementHeight={SCHEDULE_ITEM_HEIGHT}
          infiniteLoadBeginEdgeOffset={LOAD_EDGE_OFFSET}
          onInfiniteLoad={load}
          vlink={::this._getSelectedValueLink()}
        >
          {scheduleNodes}
        </Infinite>

        <FloatingActionButton
          mini backgroundColor={FAB_STYLE.color}
          style={FAB_STYLE}
          onClick={addSchedule}
        >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }
}
