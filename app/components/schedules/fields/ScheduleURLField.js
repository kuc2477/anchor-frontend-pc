import React, { PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'
import { ValueLinkPropType } from '../../../constants/types'


export default class ScheduleURLField extends React.Component {
  static propTypes =  {
    style: PropTypes.object,
    vlink: ValueLinkPropType.isRequired,
  };


  render() {
    const { style } = this.props
    const { value, requestChange } = this.props.vlink

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
