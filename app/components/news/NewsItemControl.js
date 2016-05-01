import React, { PropTypes } from 'react'
import ThumbUp from 'material-ui/lib/svg-icons/action/thumb-up'
import ThumbDown from 'material-ui/lib/svg-icons/action/thumb-down'
import OpenInBrowser from 'material-ui/lib/svg-icons/action/open-in-browser'
import IconButton from 'material-ui/lib/icon-button'

import { INACTIVE, PRIMARY, SECONDARY } from '../../constants/colors'


export default class NewsItemControl extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    rate: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    currentUserRating: PropTypes.bool
  };

  static BUTTON_ICON_STYLE = {
    height: 17,
    width: 17,
    marginRight: 3,
  };

  openInBrowser() {
    const { url } = this.props
    window.open(url, url, 'width=1300,height=900,resizeable=true')
  }

  // handler factory
  createRatingHandler(rating) {
    const { currentUserRating, cancel, rate, id } = this.props
    return () => {
      if (typeof currentUserRating !== 'undefined' &&
          currentUserRating !== null &&
          currentUserRating === rating) {
        cancel(id)
        return
      }
      rate(id, rating)
    }
  }

  render() {
    const { currentUserRating } = this.props
    const { BUTTON_ICON_STYLE } = this.constructor
    return (
      <div className="row end-md">
        <IconButton
          tooltip="Open in browser"
          tooltipPosition="top-left"
          onClick={::this.openInBrowser}
          iconStyle={BUTTON_ICON_STYLE}
        >
        <OpenInBrowser
          color={INACTIVE}
          hoverColor={SECONDARY}
        />
        </IconButton>

        <IconButton
          tooltip="Like"
          tooltipPosition="top-left"
          onClick={this.createRatingHandler(true)}
          iconStyle={BUTTON_ICON_STYLE}
        >
          <ThumbUp
            color={currentUserRating === true ? SECONDARY : INACTIVE}
            hoverColor={SECONDARY}
          />
        </IconButton>

        <IconButton
          tooltip="useless"
          tooltipPosition="top-left"
          onClick={this.createRatingHandler(false)}
          iconStyle={BUTTON_ICON_STYLE}
        >
          <ThumbDown
            color={currentUserRating === false ? PRIMARY : INACTIVE}
            hoverColor={PRIMARY}
          />
        </IconButton>
      </div>
    )
  }
}
