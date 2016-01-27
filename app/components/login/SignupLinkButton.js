import React, { PropTypes } from 'react'
import FlatButton from 'material-ui/lib/flat-button'


export default class SignupLinkButton extends React.Component {
  static propTypes = {
    onClick: PropTypes.func
  };

  static LABEL = 'Signup to Anchor';

  render() {
    return (
      <div>
        <FlatButton
          secondary={true}
          linkButton={true}
          label={this.constructor.LABEL}
          labelPosition="after"
          onClick={this.props.onClick}>
          <i className="fa fa-lg fa-anchor"></i>
        </FlatButton>
      </div>
    )
  }
}
