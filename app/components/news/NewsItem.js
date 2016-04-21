import _ from 'lodash'
import React, { PropTypes } from 'react'
import { Card } from 'material-ui/lib/card'

import NewsItemContent from './NewsItemContent'
import NewsItemControl from './NewsItemControl'


export default class NewsItem extends React.Component {
  static propTypes = {
    // style
    style: PropTypes.object,
    // news props
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    currentUserRating: PropTypes.bool,
    // action
    rate: PropTypes.func.isRequired,
  };

  _mediaOnClick() {
    const { url } = this.props
    window.open(url)
  }

  render() {
    const { STYLE } = this.constructor
    const { style, id, rate } = this.props

    return (
      <Card style={style}>
        <NewsItemContent {...this.props} />
        <NewsItemControl id={id} rate={rate} />
      </Card>
    )
  }
}
