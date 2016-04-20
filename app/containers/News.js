import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { NewsPropType } from '../constants/types'
import NewsList from '../components/news/NewsList'
import DashBoard from './.components/news/DashBoard'
import { fetchNews, rateNews } from '../actions/news'


class News extends React.Component {
  static propTypes = {
    newsList: PropTypes.arrayOf(PropTypes.number),
    newsListById: PropTypes.objectOf(NewsPropType),
    isRating: PropTypes.bool,
    didRatingFail: PropTypes.bool,
    isFetching: PropTypes.bool,
    didFetchFail: PropTypes.bool,
    urlToFetch: PropTypes.string,
    dispatch: PropTypes.func,
  };

  load() {
    const { dispatch, urlToFetch } = this.props
    if (urlToFetch) {
      dispatch(fetchNews(urlToFetch))
    }
  }

  rate(newsId, rating, callback) {
    const { dispatch } = this.props
    if (newsId) {
      dispatch(rateNews(newsId, rating, callback))
    }
  }

  render() {
    const { newsList, newsListById, isFetching } = this.props
    return (
      <div className="row">
        <div className="col-md-6">
        <NewsList
          newsList={newsList}
          newsListById={newsListById}
          isFetching={isFetching}
          load={::this.load}
          rate={::this.rate}
        />
      </div>
      <div classname="col-md-6">
        <DashBoard />
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
    isRating: present.get('isRating'),
    didRatingFail: present.get('didRatingFail'),
    isFetching: present.get('isFetching'),
    didFetchFail: present.get('didFetchFail'),
    urlToFetch: present.get('urlToFetch')
  }
})(News)
