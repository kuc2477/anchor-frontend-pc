import React, { PropTypes } from 'react'
import Infinite from 'react-infinite'
import RefreshIndicator from 'material-ui/lib/refresh-indicator'

import NewsItem from './NewsItem'
import { NewsPropType } from '../../constants/types'
import { WINDOW_WIDTH } from '../../constants/numbers'


export default class NewsList extends React.Component {
  static propTypes = {
    newsList: PropTypes.arrayOf(PropTypes.number).isRequired,
    newsListById: PropTypes.objectOf(NewsPropType).isRequired,
    isFetching: PropTypes.bool.isRequired,
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

  static LOADING_INDICATOR_PROPS = {
    size: 40,
    left: WINDOW_WIDTH / 3 - 80,
    top: 150
  };

  static NEWS_LIST_ITEM_STYLE = {
    marginBottom: 15,
    padding: 10,
  };

  static NEWS_LIST_HEIGHT = 800;
  static NEWS_ITEM_HEIGHT = 500;
  static LOAD_EDGE_OFFSET = 20;

  _getLoadingIndicator() {
    const { LOADING_INDICATOR_PROPS } = this.constructor
    return <RefreshIndicator {...LOADING_INDICATOR_PROPS} status="loading" />
  }

  _getNewsNodes() {
    const { NEWS_LIST_ITEM_STYLE } = this.constructor
    return this.props.newsList
      .map(id => this.props.newsListById[id])
      .map(news => (
        <NewsItem
          style={NEWS_LIST_ITEM_STYLE}
          rate={this.props.rate}
          {...news}
        />
      ))
  }

  render() {
    const {
      STYLE,
      NEWS_LIST_HEIGHT,
      NEWS_ITEM_HEIGHT,
      LOAD_EDGE_OFFSET
    } = this.constructor
    const { load, isFetching } = this.props
    const newsNodes = this._getNewsNodes()

    return (
      <div style={STYLE}>
        <Infinite
          containerHeight={NEWS_LIST_HEIGHT}
          elementHeight={NEWS_ITEM_HEIGHT}
          onInfiniteLoad={load}
          isInfiniteLoading={isFetching}
          infiniteLoadBeginEdgeOffset={LOAD_EDGE_OFFSET}
          loadingSpinnerDelegate={this._getLoadingIndicator()}
        >
          {newsNodes}
        </Infinite>
      </div>
    )
  }
}
