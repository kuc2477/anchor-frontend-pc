import React, { PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'
import { ValueLinkPropType } from '../../../constants/types'


export default class ScheduleNameField extends React.Component {
  static propTypes = {
    valueLink: ValueLinkPropType.isRequired,
    style: PropTypes.object,
  };

  static INPUT_STYLE = {};

  render() {
    const { style } = this.props
    const { value, requestChange } = this.props.valueLink

    return (
      <TextField
        style={style}
        inputStyle={this.constructor.INPUT_STYLE}
        floatingLabelText="Site name"
        value={value}
        onChange={requestChange}
      />
    )
  }
}
