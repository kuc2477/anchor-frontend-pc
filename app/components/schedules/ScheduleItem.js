import React from 'react'
import Paper from 'material-ui/lib/paper'
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
    const { STYLE, LIST_ITEM_STYLE } = this.constructor

    const progress = (
      <LinearProgress
        style={this.constructor.PROGRESS_STYLE}
        mode="indeterminate"
      />
    )
    const progressItem = <ListItem disabled leftAvatar={progress} />
    return (
      <Paper style={STYLE}>
        <ListItem
          initiallyOpen
          style={LIST_ITEM_STYLE}
          primaryText={this.props.schedule.name}
          secondaryText={this.props.schedule.url}
          primaryTogglesNestedList
          nestedItems={[progressItem]}
        />
      </Paper>
    )
  }
}
