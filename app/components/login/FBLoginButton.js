import React, { PropTypes } from 'react'
import FlatButton from 'material-ui/lib/flat-button'

import { BRAND_FB } from '../../constants/colors'


export default class FBLoginButton extends React.Component {
  static propTypes = {
    onClick: PropTypes.func
  };

  static LABEL = 'Start with Facebook';
  static STYLE = {
    color: BRAND_FB
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
          <i className="fa fa-lg fa-facebook-official"></i>
        </FlatButton>
      </div>
    )
  }
}
