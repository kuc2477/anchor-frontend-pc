import React, { PropTypes } from 'react'
import FlatButton from 'material-ui/lib/flat-button'

export default class ProceedButton extends React.Component {
  static LABEL = 'PROCEED TO NEXT STEP';

  render() {
    const statusIcon = <i className='material-icons fa fa-lg'>arrow_forward</i>

    return (
      <FlatButton
        secondary={true}
        label={this.constructor.LABEL}
        labelPosition="after"
        {...this.props}
      >
        {statusIcon}
      </FlatButton>
    )
  }
 }
