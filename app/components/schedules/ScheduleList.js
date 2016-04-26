import Immutable from 'immutable'
import React, { PropTypes } from 'react'

import FloatingActionButton from 'material-ui/lib/floating-action-button'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'

import InfiniteList from '../base/InfiniteList'
import ScheduleItem from './ScheduleItem'
import { SECONDARY } from '../../constants/colors'
import { SchedulePropType, ValueLinkPropType } from '../../constants/types'
import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../../constants/numbers'


export default class ScheduleList extends React.Component {
  static propTypes = {
    // schedules
    editing: SchedulePropType,
    schedule: PropTypes.number,
    schedules: PropTypes.arrayOf(PropTypes.number).isRequired,
    schedulesById: PropTypes.objectOf(SchedulePropType).isRequired,
    load: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    // schedule entry manipulation
    add: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    del: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
    // schedule enabled value link
    enabledValueLink: ValueLinkPropType.isRequired
  };

  constructor(props) {
    super(props)
    this.state = {
      opened: null
    }
  }

  static STYLE = {
    height: WINDOW_HEIGHT - 150,
    width: WINDOW_WIDTH * 0.5 - 90,
    marginLeft: 20,
    marginRight: 20,
    padding: 30,
  };

  static FAB_STYLE = {
    position: 'fixed',
    right: WINDOW_WIDTH / 2 - 20,
    bottom: 40,
    color: SECONDARY,
  };

  static LOADING_INDICATOR_PROPS = {
    size: 40,
    left: WINDOW_WIDTH / 3 - 80,
    top: 150
  };

  static LIST_ITEM_STYLE = {
    marginBottom: 15,
  };

  static SCHEDULE_LIST_HEIGHT = WINDOW_HEIGHT - 150;
  static SCHEDULE_ITEM_HEIGHT = 100;
  static LOAD_EDGE_OFFSET = 50;

  toggleOpen(toToggle) {
    this.setState({ opened: toToggle !== this.state.opened ? toToggle : null })
  }

  _getFab() {
    const { add, isFetching } = this.props
    const { FAB_STYLE } = this.constructor
    const onContentAddClick = () => {
      add()
    }

    if (isFetching) {
      return null
    }

    return (
      <FloatingActionButton
        mini backgroundColor={FAB_STYLE.color}
        style={FAB_STYLE}
        onClick={onContentAddClick}
      >
        <ContentAdd />
      </FloatingActionButton>
    )
  }

  _getScheduleNodes() {
    const { LIST_ITEM_STYLE } = this.constructor
    const { opened } = this.state
    const {
      // editing, value link to editing and currently selected schedule
      editing, enabledValueLink,
      schedule: selected,
      // schedule item operations
      del, save, select
    } = this.props

    return this.props.schedules
      .map(id => this.props.schedulesById[id])
      .map(schedule => (
        <ScheduleItem
          style={LIST_ITEM_STYLE}
          key={schedule.id}
          opened={schedule.id === opened}
          selected={schedule.id === selected}
          schedule={schedule.id === selected ? editing : schedule}
          del={del}
          save={schedule.id === selected ? save : null}
          select={select}
          toggleOpen={::this.toggleOpen}
          enabledValueLink={schedule.id === selected ? enabledValueLink : null}
        />
      ))
  }

  render() {
    const {
      STYLE,
      LOAD_EDGE_OFFSET,
      SCHEDULE_LIST_HEIGHT,
      SCHEDULE_ITEM_HEIGHT,
      LOADING_INDICATOR_PROPS,
    } = this.constructor
    const { load, isFetching } = this.props
    const scheduleNodes = this._getScheduleNodes()
    const fab = this._getFab()

    return (
      <div style={STYLE}>
        <InfiniteList
          loadingIndicatorProps={LOADING_INDICATOR_PROPS}
          containerHeight={SCHEDULE_LIST_HEIGHT}
          elementHeight={SCHEDULE_ITEM_HEIGHT}
          infiniteLoadBeginEdgeOffset={LOAD_EDGE_OFFSET}
          onInfiniteLoad={load}
          isInfiniteLoading={isFetching}
        >
          {scheduleNodes}
        </InfiniteList>
        {fab}
      </div>
    )
  }
}
