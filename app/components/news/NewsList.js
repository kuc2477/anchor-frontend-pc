import React, { PropTypes } from 'react'
import Infinite from 'react-infinite'
import Immutable from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'

import NewsItem from './NewsItem'
import { NewsPropType } from '../../constants/types'


export default class NewsList extends React.Component {
  static propTypes = {
    news: ImmutablePropTypes.listOf(PropTypes.number).isRequired,
    newsById: PropTypes.instanceOf(Immutable.Map),
    isFetching: PropTypes.bool,
    load: PropTypes.func
  };

  static defaultProps = {
    news: new Immutable.List(),
    newsById: new Immutable.Map(),
    isFetching: false,
    load: () => {}
  };

  static NEWS_ITEM_HEIGHT = 600;
  static LOAD_EDGE_OFFSET = 200;

  _getNewsNodes() {
    return this.props.news
      .map(id => this.props.newsById[id])
      .map(news => <NewsItem {...news} />)
  }

  render() {
    const newsNodes = this._getNewsNodes()

    return (
      <Infinite
        useWindowAsScrollContainer={true}
        elementHeight={this.constructor.NEWS_ITEM_HEIGHT}
        infiniteLoadBeginEdgeOffset={this.constructor.LOAD_EDGE_OFFSET}
        isInfiniteLoading={this.props.isFetching}
        onInfiniteLoad={this.props.load}
      >
        {newsNodes}
      </Infinite>
    )
  }
}
