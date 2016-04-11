import React, { PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'

import { ValueLinkPropType } from '../../../constants/types'


export default class BrotherSiteField extends React.Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  _onChange(e, v) {
    const { onChange } = this.props
    onChange(e.target.value || v)
  }

  render() {
    const { url, error, onChange } = this.props
    return (
      <TextField
        hintText="Brother site url"
        value={url}
        errorText={error}
        onChange={::this.onChange}
      />
    )
  }
}
