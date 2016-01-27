import React, { PropTypes } from 'react'

import { SchedulePropType } from '../../constants/types'


export default class ScheduleItem extends React.Component {
  static propTypes = {
    schedule: SchedulePropType
  };

  render() {
    return (
      // TODO: NOT IMPLEMENTED YET
      <div>{this.props.schedule.get('url')}</div>
    )
  }
}
