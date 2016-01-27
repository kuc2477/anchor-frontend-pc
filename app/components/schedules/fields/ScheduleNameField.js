import React, { PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'


export default class ScheduleNameField extends React.Component {
  static propTypes = {
    name: PropTypes.string
  };

  static STYLE = {
    marginTop: -15
  };

  render() {
    return (
      <div>
        <TextField
          floatingLabelText="Site name"
          defaultValue={this.props.name}
          style={this.constructor.STYLE}
        />
      </div>
    )
  }
}
