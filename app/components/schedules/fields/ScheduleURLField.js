import React, { PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'
import { ValueLinkPropType } from '../../../constants/types'


export default class ScheduleURLField extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    valueLink: ValueLinkPropType.isRequired,
  };


  render() {
    const { style } = this.props
    const { value, requestChange } = this.props.valueLink

    return (
      <TextField
        style={style}
        floatingLabelText="Site url"
        onChange={requestChange}
        value={value}
      />
    )
  }
}
