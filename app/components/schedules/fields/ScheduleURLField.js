import React, { PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import TextField from 'material-ui/lib/text-field'
import { ValueLinkPropType } from '../../../constants/types'


export default class ScheduleURLField extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    error: PropTypes.string,
    valueLink: ValueLinkPropType.isRequired,
  };

  constructor(props) {
    super(props)
    this.shouldComponentUpdate =
      PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    const { style, error } = this.props
    const { value, requestChange } = this.props.valueLink

    return (
      <TextField
        style={style}
        floatingLabelText="Site url"
        onChange={requestChange}
        errorText={error}
        value={value}
      />
    )
  }
}
