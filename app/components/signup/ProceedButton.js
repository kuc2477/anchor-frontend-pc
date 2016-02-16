import React, { PropTypes } from 'react'
import FlatButton from 'material-ui/lib/flat-button'

export default class ProceedButton extends React.Component {
  static propTypes = {
    onClick: PropTypes.func
  };

  static LABEL = 'Proceed';

  render() {
    const statusIcon = <i className='fa fa-lg fa-arrow-right'></i>

    return (
      <FlatButton
        secondary={true}
        label={this.constructor.LABEL}
        labelPosition="after"
        onClick={this.props.onClick}>
        {statusIcon}
      </FlatButton>
    )
  }
 }
