import React, { PropTypes } from 'react'
import Infinite from 'react-infinite'

import FloatingActionButton from 'material-ui/lib/floating-action-button'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'

import ScheduleItem from './ScheduleItem'
import { SECONDARY } from '../../constants/colors'
import { SchedulePropType, ValueLinkPropType } from '../../constants/types'
import { WINDOW_WIDTH } from '../../constants/numbers'


export default class ScheduleList extends React.Component {
  static propTypes = {
    // schedules
    editing: SchedulePropType,
    schedule: PropTypes.number,
    schedules: PropTypes.arrayOf(PropTypes.number).isRequired,
    schedulesById: PropTypes.objectOf(SchedulePropType).isRequired,
    load: PropTypes.func.isRequired,
    // schedule entry manipulation
    add: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    del: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
    // schedule enabled value link
    enabledValueLink: ValueLinkPropType.isRequired
  };

  static STYLE = {
    height: 350,
    width: WINDOW_WIDTH * 0.5 - 100,
    marginLeft: 20,
    marginRight: 20,
    padding: 30,
  };

  static FAB_STYLE = {
    position: 'fixed',
    right: WINDOW_WIDTH / 2 - 20,
    bottom: 60,
    color: SECONDARY,
  };

  static LIST_ITEM_STYLE = {
    marginBottom: 15,
  };

  static SCHEDULE_LIST_HEIGHT = 800;
  static SCHEDULE_ITEM_HEIGHT = 150;
  static LOAD_EDGE_OFFSET = 50;

  constructor(props) {
    super(props)
    this.state = {
      opened: null
    }
  }

  toggleOpen(toToggle) {
    this.setState({ opened: toToggle !== this.state.opened ? toToggle : null })
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
      STYLE, FAB_STYLE, LOAD_EDGE_OFFSET,
      SCHEDULE_LIST_HEIGHT, SCHEDULE_ITEM_HEIGHT,
    } = this.constructor
    const { load, add } = this.props
    const scheduleNodes = this._getScheduleNodes()
    const onContentAddClick = () => {
      add()
    }

    return (
      <div style={STYLE}>
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
          mini backgroundColor={FAB_STYLE.color}
          style={FAB_STYLE}
          onClick={onContentAddClick}
        >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }
}
