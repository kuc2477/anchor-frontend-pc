import React, { PropTypes } from 'react'
import Infinite from 'react-infinite'

import FloatingActionButton from 'material-ui/lib/floating-action-button'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'
import RefreshIndicator from 'material-ui/lib/refresh-indicator'

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

  constructor(props) {
    super(props)
    this.state = {
      opened: null
    }
  }

  static STYLE = {
    height: 800,
    width: WINDOW_WIDTH * 0.5 - 90,
    marginLeft: 20,
    marginRight: 20,
    padding: 30,
  };

  static FAB_STYLE = {
    position: 'fixed',
    right: WINDOW_WIDTH / 2 - 40,
    bottom: 30,
    color: SECONDARY,
  };

  static LOADING_INDICATOR_PROPS = {
    size: 40,
    left: 10,
    top: 0
  };

  static LIST_ITEM_STYLE = {
    marginBottom: 15,
  };

  static SCHEDULE_LIST_HEIGHT = 500;
  static SCHEDULE_ITEM_HEIGHT = 120;
  static LOAD_EDGE_OFFSET = 10;

  toggleOpen(toToggle) {
    this.setState({ opened: toToggle !== this.state.opened ? toToggle : null })
  }

  _getLoadingIndicator() {
    const { LOADING_INDICATOR_PROPS } = this.props
    return <RefreshIndicator {...LOADING_INDICATOR_STYLE} status='loading' />
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
      SCHEDULE_ITEM_HEIGHT,
    } = this.constructor
    const { load, add, isFetching } = this.props
    const scheduleNodes = this._getScheduleNodes()
    const onContentAddClick = () => {
      add()
    }

    return (
      <div style={STYLE}>
        <Infinite
          useWindowAsScrollContainer
          elementHeight={SCHEDULE_ITEM_HEIGHT}
          infiniteLoadBeginEdgeOffset={LOAD_EDGE_OFFSET}
          onInfiniteLoad={load}
          isInfiniteLoading={isFetching}
          loadingSpinnerDelegate={this._getLoadingIndicator()}
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
