import React from 'react'
import LinearProgress from 'material-ui/lib/linear-progress'
import { SchedulePropType } from '../../constants/types'
import { STARTED } from '../../constants/strings.js'


export default class ScheduleItemProgress extends React.Component {
  static propTypes = {
    schedule: SchedulePropType,
  };

  static DEFAULT_NAME = 'Schedule name';
  static PROGRESS_STYLE = {
    marginTop: 6,
    width: '80%',
  };

  _getMode() {
    const { schedule } = this.props
    const { state, enabled } = schedule.toJS()
    return enabled && state === STARTED ? 'indeterminate' : 'determinate'
  }

  render() {
    const { PROGRESS_STYLE, DEFAULT_NAME } = this.constructor
    const { schedule } = this.props
    const name = schedule.get('name') || DEFAULT_NAME
    const mode = this._getMode()

    return (
      <div>
        {name}
        <LinearProgress style={PROGRESS_STYLE} mode={mode} />
      </div>
    )
  }
}
