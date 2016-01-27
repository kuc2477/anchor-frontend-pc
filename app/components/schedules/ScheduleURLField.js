import React, { PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'


export default class ScheduleURLField extends React.Component {
  static propTypes =  {
    url: PropTypes.string
  };

  static STYLE = {
    marginTop: -15
  };

  render() {
    return (
      <div>
        <TextField
          floatingLabelText="Site url"
          defaultValue={this.props.url}
          style={this.constructor.STYLE}
        />
      </div>
    )
  }
}
