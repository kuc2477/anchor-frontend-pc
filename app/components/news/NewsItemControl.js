import _ from 'lodash'
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

  render() {
    const { BUTTON_ICON_STYLE } = this.constructor
    const { id, rate, currentUserRating } = this.props
    return (
      <div className="row end-md">
        <IconButton
          tooltip="Like"
          tooltipPosition="top-left"
          onClick={_.partial(rate, id, true)}
        >
          <ThumbUp color={INACTIVE} style={BUTTON_ICON_STYLE} />
        </IconButton>

        <IconButton
          tooltip="useless"
          tooltipPosition="top-left"
          onClick={_.partial(rate, id, false)}
        >
          <ThumbDown color={INACTIVE} style={BUTTON_ICON_STYLE} />
        </IconButton>
      </div>
    )
  }
}
