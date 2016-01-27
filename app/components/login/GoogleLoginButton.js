import React, { PropTypes } from 'react'
import FlatButton from 'material-ui/lib/flat-button'

import { BRAND_GOOGLE } from '../../constants/colors'


export default class FBLoginButton extends React.Component {
  static propTypes = {
    onClick: PropTypes.func
  };

  static LABEL = 'Start with Google';
  static STYLE = {
    color: BRAND_GOOGLE
  };

  render() {
    return (
      <div>
        <FlatButton
          style={this.constructor.STYLE}
          secondary={true}
          linkButton={true}
          label={this.constructor.LABEL}
          labelPosition="after"
          onClick={this.props.onClick}>
          <i className="fa fa-lg fa-google"></i>
        </FlatButton>
      </div>
    )
  }
}
