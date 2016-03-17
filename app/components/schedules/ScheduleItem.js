import React from 'react'
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

  render() {
    const progress = (
      <LinearProgress
        style={this.constructor.PROGRESS_STYLE}
        mode="indeterminate"
      />
    )

    const progressItem = <ListItem disabled leftAvatar={progress} />
    const expandButton = <i className="material-icons">expand_more</i>

    return (
      <div style={this.constructor.STYLE}>
        <ListItem
          disabled
          style={this.constructor.LIST_ITEM_STYLE}
          primaryText={this.props.schedule.name}
          secondaryText={this.props.schedule.url}
          rightToggle={expandButton}
        />
        {progressItem}
      </div>
    )
  }
}
