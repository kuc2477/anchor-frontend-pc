import React, { PropTypes } from 'react'
import Infinite from 'react-infinite'

import NewsItem from './NewsItem'
import { NewsPropType } from '../../constants/types'
import { WINDOW_WIDTH } from '../../constants/numbers'


export default class NewsList extends React.Component {
  static propTypes = {
    newsList: PropTypes.arrayOf(PropTypes.number).isRequired,
    newsListById: PropTypes.objectOf(NewsPropType).isRequired,
    load: PropTypes.func.isRequired,
    rate: PropTypes.func.isRequired,
  };

  static STYLE = {
    height: 800,
    width: WINDOW_WIDTH * 0.5 - 50,
    marginLeft: 20,
    marginRight: 20,
    padding: 30,
  };

  static NEWS_LIST_HEIGHT = 500
  static NEWS_ITEM_HEIGHT = 200;
  static LOAD_EDGE_OFFSET = 10;

  _getNewsNodes() {
    return this.props.newsList
      .map(id => this.props.newsListById[id])
      .map(news => <NewsItem {...news} rate={this.props.rate} />)
  }

  render() {
    const { STYLE, NEWS_ITEM_HEIGHT, LOAD_EDGE_OFFSET } = this.constructor
    const { load } = this.props
    const newsNodes = this._getNewsNodes()

    return (
      <div style={STYLE}>
        <Infinite
          useWindowAsScrollContainer
          elementHeight={NEWS_ITEM_HEIGHT}
          infiniteLoadBeginEdgeOffset={LOAD_EDGE_OFFSET}
          onInfiniteLoad={load}
        >
          {newsNodes}
        </Infinite>
      </div>
    )
  }
}
