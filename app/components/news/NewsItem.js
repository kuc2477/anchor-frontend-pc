import React, { PropTypes } from 'react'
import { Card } from 'material-ui/lib/card'
import Divider from 'material-ui/lib/divider'

import NewsItemContent from './NewsItemContent'
import NewsItemControl from './NewsItemControl'


export default class NewsItem extends React.Component {
  static propTypes = {
    // style
    style: PropTypes.object,
    height: PropTypes.number.isRequired,
    // news props
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    currentUserRating: PropTypes.bool,
    // action
    rate: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
  };

  _getStyle() {
    const { style, height } = this.props
    return Object.assign({}, style, { height })
  }

  render() {
    const { id, url, currentUserRating, rate, cancel } = this.props

    return (
      <Card style={this._getStyle()}>
        <NewsItemContent {...this.props} />
        <Divider />
        <NewsItemControl
          id={id}
          url={url}
          currentUserRating={currentUserRating}
          rate={rate}
          cancel={cancel}
        />
      </Card>
    )
  }
}
