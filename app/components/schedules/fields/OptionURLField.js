import React, { PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import TextField from 'material-ui/lib/text-field'


export default class OptionURLField extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    error: PropTypes.string,
    hintText: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    style: PropTypes.object,
  };

  constructor(props) {
    super(props)
    this.shouldComponentUpdate =
      PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    const { style, url, error, hintText, onChange } = this.props
    return (
      <TextField
        style={style}
        hintText={hintText}
        value={url}
        errorText={error}
        onChange={onChange}
      />
    )
  }
}
