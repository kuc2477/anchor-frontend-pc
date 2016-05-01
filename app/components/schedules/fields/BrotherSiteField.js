import Immutable from 'immutable'
import React, { PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'


export default class BrotherSiteField extends React.Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    style: PropTypes.object,
  };

  shouldComponentUpdate(nextProps) {
    return !Immutable.fromJS(this.props).equals(Immutable.fromJS(nextProps))
  }

  render() {
    const { style, url, error, onChange } = this.props
    return (
      <TextField
        style={style}
        hintText="Brother site url"
        value={url}
        errorText={error}
        onChange={onChange}
      />
    )
  }
}
