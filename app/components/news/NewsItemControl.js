import React, { PropTypes } from 'react'
import ThumbUp from 'material-ui/lib/svg-icons/action/thumb-up'
import ThumbDown from 'material-ui/lib/svg-icons/action/thumb-down'
import IconButton from 'material-ui/lib/icon-button'

import { INACTIVE } from '../../constants/colors'


export default class NewsItemControl extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    rate: PropTypes.func.isRequired,
    currentUserRating: PropTypes.bool
  };

  static BUTTON_ICON_STYLE = {
    height: 16,
    width: 16,
    marginRight: 10,
  };

  rateFactory(rating) {
    const { rate, id } = this.props
    return () => { rate(id, rating) }
  }

  render() {
    const { BUTTON_ICON_STYLE } = this.constructor
    return (
      <div className="row end-md">
        <IconButton
          tooltip="Like"
          tooltipPosition="top-left"
          onClick={this.rateFactory(true)}
        >
          <ThumbUp color={INACTIVE} style={BUTTON_ICON_STYLE} />
        </IconButton>

        <IconButton
          tooltip="useless"
          tooltipPosition="top-left"
          onClick={this.rateFactory(false)}
        >
          <ThumbDown color={INACTIVE} style={BUTTON_ICON_STYLE} />
        </IconButton>
      </div>
    )
  }
}
