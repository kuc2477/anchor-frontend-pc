import React, { PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'


export default class ScheduleNameField extends React.Component {
  static propTypes = {
    name: PropTypes.string
  };

  static INPUT_STYLE = {
    fontSize: 14,
  };

  render() {
    const { style } = this.props
    return (
      <TextField
        style={style}
        floatingLabelText="Site name"
        value={this.props.name}
        inputStyle={this.constructor.INPUT_STYLE}
      />
    )
  }
}
