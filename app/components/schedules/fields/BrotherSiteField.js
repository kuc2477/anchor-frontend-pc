import React, { PropTypes } from 'React'


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
