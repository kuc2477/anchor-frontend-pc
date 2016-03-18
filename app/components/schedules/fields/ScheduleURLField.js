import React, { PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'


export default class ScheduleURLField extends React.Component {
  static propTypes =  {
    url: PropTypes.string
  };

  render() {
    const { style } = this.props

    return (
      <TextField
        style={style}
        floatingLabelText="Site url"
        defaultValue={this.props.url}
        style={this.constructor.STYLE}
      />
    )
  }
}
