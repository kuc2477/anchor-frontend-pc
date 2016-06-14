import React, { PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { NewsPropType } from '../constants/types'
import NewsList from '../components/news/NewsList'
import DashBoard from '../components/news/DashBoard'
import {
  fetchNews,
  fetchLatestNews,
  fetchNewsRecomms,
  rateNews,
  cancelRating
} from '../actions/news'


class News extends React.Component {
  static propTypes = {
    // news
    newsList: ImmutablePropTypes.listOf(PropTypes.number),
    newsListById: ImmutablePropTypes.contains(NewsPropType),
    recomms: ImmutablePropTypes.listOf(PropTypes.number),
    recommsById: ImmutablePropTypes.contains(NewsPropType),
    // rating status
    isRating: PropTypes.bool,
    didRatingFail: PropTypes.bool,
    // fetching status
    isFetching: PropTypes.bool,
    didFetchFail: PropTypes.bool,
    // fetching recommendation status
    isFetchingRecomms: PropTypes.bool,
    didFetchingRecommsFailed: PropTypes.bool,
    // url
    urlToFetch: PropTypes.string,
    // latest news
    latestNewsToFetch: PropTypes.number,
    // dispatch
    dispatch: PropTypes.func,
  };

  constructor(props) {
    super(props)
    this.shouldComponentUpdate =
      PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  componentDidMount() {
    this.loadRecommendations()
  }

  load() {
    const { dispatch, urlToFetch, isFetching } = this.props
    if (urlToFetch && !isFetching) {
      dispatch(fetchNews(urlToFetch))
    }
  }

  loadLatest() {
    const { dispatch, latestNewsToFetch } = this.props
    if (latestNewsToFetch) {
      dispatch(fetchLatestNews(latestNewsToFetch))
    }
  }

  loadRecommendations() {
    const { dispatch, isFetchingRecomms } = this.props
    if (!isFetchingRecomms) {
      dispatch(fetchNewsRecomms())
    }
  }

  cancel(newsId) {
    const { dispatch } = this.props
    if (newsId) {
      dispatch(cancelRating(newsId))
    }
  }

  rate(newsId, rating) {
    const { dispatch } = this.props
    if (newsId) {
      dispatch(rateNews(newsId, rating))
    }
  }

  render() {
    const {
      newsList,
      newsListById,
      recomms,
      recommsById,
      isFetching,
      isFetchingRecomms,
      didFetchFail,
      didFetchingRecommsFailed,
    } = this.props
    return (
      <div className="row">
        <div className="col-md-6">
        <NewsList
          newsList={newsList}
          newsListById={newsListById}
          isFetching={isFetching}
          didFetchFail={didFetchFail}
          load={::this.load}
          loadLatest={::this.loadLatest}
          rate={::this.rate}
          cancel={::this.cancel}
        />
      </div>
      <div className="col-md-6">
        <DashBoard
          recomms={recomms}
          recommsById={recommsById}
          isFetchingRecomms={isFetchingRecomms}
          didFetchingRecommsFailed={didFetchingRecommsFailed}
        />
      </div>
      </div>
    )
  }
}


export default connect(app => {
  const { present } = app.news
  return {
    newsList: present.get('newsList'),
    newsListById: present.get('newsListById'),
    recomms: present.get('recomms'),
    recommsById: present.get('recommsById'),
    isRating: present.get('isRating'),
    didRatingFail: present.get('didRatingFail'),
    isFetching: present.get('isFetching'),
    didFetchFail: present.get('didFetchFail'),
    isFetchingRecomms: present.get('isFetchingRecomms'),
    didFetchingRecommsFailed: present.get('didFetchingRecommsFailed'),
    urlToFetch: present.get('urlToFetch'),
    latestNewsToFetch = present.get('latestNewsToFetch'),
  }
})(News)
