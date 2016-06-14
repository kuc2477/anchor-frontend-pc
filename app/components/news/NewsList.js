import React, { PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ImmutablePropTypes from 'react-immutable-proptypes'

import InfiniteList from '../base/InfiniteList'
import NewsItem from './NewsItem'
import { NewsPropType } from '../../constants/types'
import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../../constants/numbers'


export default class NewsList extends React.Component {
  static propTypes = {
    newsList: ImmutablePropTypes.listOf(PropTypes.number).isRequired,
    newsListById: ImmutablePropTypes.contains(NewsPropType).isRequired,
    isFetching: PropTypes.bool.isRequired,
    load: PropTypes.func.isRequired,
    loadLatest: PropTypes.func.isRequired,
    rate: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props)
    this.shouldComponentUpdate =
      PureRenderMixin.shouldComponentUpdate.bind(this)
  }

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
    top: 160
  };

  static LOAD_EDGE_OFFSET = 300;
  static CONTAINER_HEIGHT = WINDOW_HEIGHT - 100
  static NEWS_ITEM_STYLE = {
    height: 400,
    marginTop: 5,
    marginBottom: 20,
    marginLeft: 5,
    marginRight: 5,
    paddingLeft: 25,
    paddingRight: 25,
  };

  _getNewsNodes() {
    const { NEWS_ITEM_STYLE, NEWS_LIST_ITEM_HEIGHT } = this.constructor
    return this.props.newsList
      .map(id => this.props.newsListById.get(id))
      .map(news => (
        <NewsItem
          style={NEWS_ITEM_STYLE}
          height={NEWS_LIST_ITEM_HEIGHT}
          news={news}
          rate={this.props.rate}
          cancel={this.props.cancel}
        />
      ))
  }

  render() {
    const {
      STYLE,
      NEWS_ITEM_STYLE,
      LOAD_EDGE_OFFSET,
      CONTAINER_HEIGHT,
      LOADING_INDICATOR_PROPS,
    } = this.constructor
    const { load, loadLatest, isFetching } = this.props
    const { height: elementHeight } = NEWS_ITEM_STYLE
    const newsNodes = this._getNewsNodes()

    return (
      <div style={STYLE}>
        <InfiniteList
          preloadAdditionalHeight={CONTAINER_HEIGHT * 5}
          preloadBatchSize={CONTAINER_HEIGHT * 5}
          containerHeight={CONTAINER_HEIGHT}
          elementHeight={elementHeight}
          onLatestLoad={loadLatest}
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
