import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { NewsPropType } from '../constants/types'
import NewsList from '../components/news/NewsList'
import DashBoard from '../components/news/DashBoard'
import {
  fetchNews,
  fetchNewsRecommendations,
  rateNews,
  cancelRating
} from '../actions/news'


class News extends React.Component {
  static propTypes = {
    // news
    newsList: PropTypes.arrayOf(PropTypes.number),
    newsListById: PropTypes.objectOf(NewsPropType),
    recommendations: PropTypes.arrayOf(PropTypes.number),
    recommendationsById: PropTypes.objectOf(NewsPropType),
    // rating status
    isRating: PropTypes.bool,
    didRatingFail: PropTypes.bool,
    // fetching status
    isFetching: PropTypes.bool,
    didFetchFail: PropTypes.bool,
    // fetching recommendation status
    isFetchingRecommendations: PropTypes.bool,
    didFetchingRecommendationsFail: PropTypes.bool,
    // url
    urlToFetch: PropTypes.string,
    // dispatch
    dispatch: PropTypes.func,
  };

  componentDidMount() {
    this.loadRecommendations()
  }

  load() {
    const { dispatch, urlToFetch, isFetching } = this.props
    if (urlToFetch && !isFetching) {
      dispatch(fetchNews(urlToFetch))
    }
  }

  loadRecommendations() {
    const { dispatch, isFetchingRecommendations } = this.props
    if (!isFetchingRecommendations) {
      dispatch(fetchNewsRecommendations())
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
      recommendations,
      recommendationsById,
      isFetching,
      isFetchingRecommendations,
      didFetchFail,
      didFetchingRecommendationsFail,
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
          rate={::this.rate}
          cancel={::this.cancel}
        />
      </div>
      <div className="col-md-6">
        <DashBoard
          recommendations={recommendations}
          recommendationsById={recommendationsById}
          isFetchingRecommendations={isFetchingRecommendations}
          didFetchingRecommendationsFail={didFetchingRecommendationsFail}
        />
      </div>
      </div>
    )
  }
}


export default connect(app => {
  const { present } = app.news
  return {
    newsList: present.get('newsList').toJS(),
    newsListById: present.get('newsListById').toJS(),
    recommendations: present.get('recommendations').toJS(),
    recommendationsById: present.get('recommendationsById').toJS(),
    isRating: present.get('isRating'),
    didRatingFail: present.get('didRatingFail'),
    isFetching: present.get('isFetching'),
    didFetchFail: present.get('didFetchFail'),
    isFetchingRecommendations: present.get('isFetchingRecommendations'),
    didFetchingRecommendationsFail: present.get('didFetchingRecommendationsFail'),
    urlToFetch: present.get('urlToFetch')
  }
})(News)
