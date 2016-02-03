import React, { PropTypes } from 'react'


export default class BrotherSiteField extends React.Component {
  static propTypes = {
    url: PropTypes.string
  };

  render() {
    return (
      <div>{this.props.url}</div>
    )
  }
}
