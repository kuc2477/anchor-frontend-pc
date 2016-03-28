import React, { PropTypes } from 'react'

import Paper from 'material-ui/lib/paper'
import Colors from 'material-ui/lib/styles/colors'

import Close from  'material-ui/lib/svg-icons/navigation/close'
import IconButton from 'material-ui/lib/icon-button'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert'
import ContentInbox from 'material-ui/lib/svg-icons/content/inbox'
import Divider from 'material-ui/lib/divider'

import ListItem from 'material-ui/lib/lists/list-item'
import LinearProgress from 'material-ui/lib/linear-progress'

import { PRIMARY, SECONDARY } from '../../constants/colors'
import { SchedulePropType } from '../../constants/types'


export default class ScheduleItem extends React.Component {
  static propTypes = {
    schedule: SchedulePropType.isRequired,
    selected: PropTypes.bool.isRequired,
    removeSchedule: PropTypes.func.isRequired,
    onClick: PropTypes.func
  };

  static STYLE = {};
  static LIST_ITEM_STYLE = {};
  static PROGRESS_ITEM_STYLE = {};
  static PROGRESS_STYLE = { width: '80%' };
  static DEFAULT_NAME = 'Schedule name';
  static DEFAULT_URL = 'Schedule url to get subscribed';

  _getStyle() {
    const { style } = this.props
    const { STYLE: base } = this.constructor
    return Object.assign({}, base, style)
  }

  _getProgressItem() {
    const { isActive, status } = this.props.schedule
    const { PROGRESS_STYLE } = this.constructor

    const mode = isActive && status === 'STARTED' ?
      'indeterminate' : 'determinate'

    const text =
      !isActive ? 'Disabled' :
      status === 'STARTED' ? 'Reporters are collecting news for you' :
      status === 'PENDING' ? 'Reporters are wating to be dispatched' :
      status === 'SUCCESS' ? 'Reporters successfully collected news' :
        'Something went wrong with reporters. Wating to be dispatched again'

    const progressBar = (
      <LinearProgress style={PROGRESS_STYLE} mode={mode} />
    )

    return (
      <div>
        <Divider style={{paddingTop: 0}}/>
        <ListItem disabled secondaryText={text}>
          {progressBar}
        </ListItem>
      </div>
    )
  }

  _getActionButton() {
    return (
      <IconButton touch tooltip="more" tooltipPosition="bottom-right" >
        <MoreVertIcon color={Colors.grey400} />
      </IconButton>
    )
  }

  _getActionButtonMenu() {
    return (
      <IconMenu iconButtonElement={this._getActionButton()}>
        <MenuItem>
          <div className="row middle-md" onClick={::this.remove}>
            <Close style={{ paddingLeft: 10, width: 20, height: 20}} />
            <div style={{paddingLeft: 5}}>Delete</div>
          </div>
        </MenuItem>
      </IconMenu>
    )
  }

  remove() {
    const { schedule, removeSchedule } = this.props
    removeSchedule(schedule.id)
  }

  render() {
    const { LIST_ITEM_STYLE, DEFAULT_NAME, DEFAULT_URL } = this.constructor
    const { schedule, onClick } = this.props

    return (
      <Paper style={this._getStyle()} onClick={onClick}>
        <ListItem
          style={LIST_ITEM_STYLE}
          primaryText={schedule.name || DEFAULT_NAME}
          secondaryText={schedule.url || DEFAULT_URL}
          leftIcon={<ContentInbox />}
          rightIconButton={this._getActionButtonMenu()}
        />

      </Paper>
    )
  }
}
