import React, { PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Card } from 'material-ui/lib/card'
import Divider from 'material-ui/lib/divider'

import { NewsPropType } from '../../constants/types'
import NewsItemContent from './NewsItemContent'
import NewsItemControl from './NewsItemControl'


export default class NewsItem extends React.Component {
  static propTypes = {
    // style
    style: PropTypes.object,
    height: PropTypes.number.isRequired,
    // news
    news: NewsPropType.isRequired,
    // action
    rate: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props)
    this.shouldComponentUpdate =
      PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  _getStyle() {
    const { style, height } = this.props
    return Object.assign({}, style, { height })
  }

  render() {
    const { news, rate, cancel } = this.props

    return (
      <Card style={this._getStyle()}>
        <NewsItemContent news={news}  />
        <Divider />
        <NewsItemControl
          rate={rate}
          cancel={cancel}
          news={news}
        />
      </Card>
    )
  }
}
