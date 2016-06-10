import React, { PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ThumbUp from 'material-ui/lib/svg-icons/action/thumb-up'
import ThumbDown from 'material-ui/lib/svg-icons/action/thumb-down'
import OpenInBrowser from 'material-ui/lib/svg-icons/action/open-in-browser'
import IconButton from 'material-ui/lib/icon-button'

import { NewsPropType } from '../../constants/types'
import { INACTIVE, PRIMARY, SECONDARY } from '../../constants/colors'


export default class NewsItemControl extends React.Component {
  static propTypes = {
    news: NewsPropType.isRequired,
    rate: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props)
    this.shouldComponentUpdate =
      PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  static BUTTON_ICON_STYLE = {
    height: 17,
    width: 17,
    marginRight: 3,
  };

  openInBrowser() {
    const { news } = this.props
    window.open(news.url, news.url, 'width=1300,height=900,resizeable=true')
  }

  // handler factory
  createRatingHandler(rating) {
    const { news, cancel, rate} = this.props
    const { id, userRating } = news.toJS()
    return () => {
      if (typeof userRating !== 'undefined' &&
          userRating !== null &&
          userRating === rating) {
        cancel(id)
        return
      }
      rate(id, rating)
    }
  }

  render() {
    const { news } = this.props
    const { userRating } = news.toJS()

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
            color={userRating === true ? SECONDARY : INACTIVE}
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
            color={userRating === false ? PRIMARY : INACTIVE}
            hoverColor={PRIMARY}
          />
        </IconButton>
      </div>
    )
  }
}
