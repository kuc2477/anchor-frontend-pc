import React, { PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'
import { ValueLinkPropType } from '../../../constants/types'


export default class ScheduleNameField extends React.Component {
  static propTypes = {
    valueLink: ValueLinkPropType.isRequired,
    error: PropTypes.string,
    style: PropTypes.object,
  };

  static INPUT_STYLE = {
  };

  static ERROR_STYLE = {
  };

  render() {
    const { style, error } = this.props
    const { value, requestChange } = this.props.valueLink

    return (
      <TextField
        style={style}
        inputStyle={ this.constructor.INPUT_STYLE}
        errorStyle={ this.constructor.ERROR_STYLE}
        floatingLabelText="Site name"
        value={value}
        errorText={error}
        onChange={requestChange}
      />
    )
  }
}
