import React from 'react'

import Paper from 'material-ui/lib/paper'
import Colors from 'material-ui/lib/styles/colors'

import Delete from 'material-ui/lib/svg-icons/action/delete'
import IconButton from 'material-ui/lib/icon-button'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert'

import ListItem from 'material-ui/lib/lists/list-item'
import LinearProgress from 'material-ui/lib/linear-progress'
import { SchedulePropType } from '../../constants/types'


export default class ScheduleItem extends React.Component {
  static propTypes = {
    schedule: SchedulePropType
  };

  static STYLE = {
  };

  static LIST_ITEM_STYLE = {
  };

  static PROGRESS_STYLE = {
    width: '85%',
  };

  static PROGRESS_ITEM_STYLE = {
  };

  _getStyle() {
    const { style } = this.props
    const { STYLE: base } = this.constructor
    return Object.assign({}, base, style)
  }

  _getProgressItem() {
    const { PROGRESS_STYLE } = this.constructor
    const progressBar = (
      <LinearProgress style={PROGRESS_STYLE} mode="indeterminate" />
    )
    return (
      <ListItem>
        {progressBar}
      </ListItem>
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
          <div className="row middle-md">
              <Delete style={{width: 20, height: 20, marginLeft: 10}} />
              <div style={{paddingLeft: 5}}>Delete</div>
          </div>
        </MenuItem>
      </IconMenu>
    )
  }

  render() {
    const { LIST_ITEM_STYLE } = this.constructor
    return (
      <Paper style={this._getStyle()}>
        <ListItem
          style={LIST_ITEM_STYLE}
          primaryTogglesNestedList
          primaryText={this.props.schedule.name || 'Default'}
          secondaryText={this.props.schedule.url || ''}
          nestedItems={[this._getProgressItem()]}
          rightIconButton={this._getActionButtonMenu()}
        />

      </Paper>
    )
  }
}
