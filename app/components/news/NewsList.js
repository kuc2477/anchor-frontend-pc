import React, { PropTypes } from 'react'
import Infinite from 'react-infinite'

import NewsItem from './NewsItem'
import { NewsPropType } from '../../constants/types'


export default class NewsList extends React.Component {
  static propTypes = {
    newsList: PropTypes.arrayOf(PropTypes.number).isRequired,
    newsListById: PropTypes.objectOf(NewsPropType).isRequired,
    load: PropTypes.func.isRequired,
  };

  static NEWS_ITEM_HEIGHT = 600;
  static LOAD_EDGE_OFFSET = 200;

  _getNewsNodes() {
    return this.props.newsList
      .map(id => this.props.newsListById[id])
      .map(news => <NewsItem {...news} />)
  }

  render() {
    const newsNodes = this._getNewsNodes()

    return (
      <Infinite
        useWindowAsScrollContainer={true}
        elementHeight={this.constructor.NEWS_ITEM_HEIGHT}
        infiniteLoadBeginEdgeOffset={this.constructor.LOAD_EDGE_OFFSET}
        onInfiniteLoad={this.props.load}
      >
        {newsNodes}
      </Infinite>
    )
  }
}
