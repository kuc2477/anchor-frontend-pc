import React, { PropTypes } from 'react'

import InfiniteList from '../base/InfiniteList'
import NewsItem from './NewsItem'
import { NewsPropType } from '../../constants/types'
import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../../constants/numbers'


export default class NewsList extends React.Component {
  static propTypes = {
    newsList: PropTypes.arrayOf(PropTypes.number).isRequired,
    newsListById: PropTypes.objectOf(NewsPropType).isRequired,
    isFetching: PropTypes.bool.isRequired,
    load: PropTypes.func.isRequired,
    rate: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired
  };

  static STYLE = {
    height: WINDOW_HEIGHT - 150,
    width: WINDOW_WIDTH * 0.5 - 50,
    marginLeft: 20,
    marginRight: 20,
    padding: 30,
  };

  static LOADING_INDICATOR_PROPS = {
    size: 40,
    left: WINDOW_WIDTH / 3 - 80,
    top: 150
  };

  static NEWS_LIST_ITEM_STYLE = {
    marginTop: 5,
    marginBottom: 20,
    marginLeft: 5,
    marginRight: 5,
    paddingLeft: 25,
    paddingRight: 25,
  };

  static NEWS_LIST_HEIGHT = WINDOW_HEIGHT - 100;
  static NEWS_ITEM_HEIGHT = 500;
  static LOAD_EDGE_OFFSET = 20;

  _getNewsNodes() {
    const { NEWS_LIST_ITEM_STYLE, NEWS_LIST_ITEM_HEIGHT } = this.constructor
    return this.props.newsList
      .map(id => this.props.newsListById[id])
      .map(news => (
        <NewsItem
          style={NEWS_LIST_ITEM_STYLE}
          height={NEWS_LIST_ITEM_HEIGHT}
          rate={this.props.rate}
          cancel={this.props.cancel}
          {...news}
        />
      ))
  }

  render() {
    const {
      STYLE,
      NEWS_LIST_HEIGHT,
      NEWS_ITEM_HEIGHT,
      LOAD_EDGE_OFFSET,
      LOADING_INDICATOR_PROPS,
    } = this.constructor
    const { load, isFetching } = this.props
    const newsNodes = this._getNewsNodes()

    return (
      <div style={STYLE}>
        <InfiniteList
          containerHeight={NEWS_LIST_HEIGHT}
          elementHeight={NEWS_ITEM_HEIGHT}
          onInfiniteLoad={load}
          isInfiniteLoading={isFetching}
          infiniteLoadBeginEdgeOffset={LOAD_EDGE_OFFSET}
          loadingIndicatorProps={LOADING_INDICATOR_PROPS}
        >
          {newsNodes}
        </InfiniteList>
      </div>
    )
  }
}
