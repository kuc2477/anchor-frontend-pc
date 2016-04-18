import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import NewsList from '../components/news/NewsList'
import { fetchNews } from '../actions/news'
import { NewsPropType } from '../constants/types'


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

  render() {
    const { newsList, newsListById } = this.props
    return (
      <div>
        <NewsList
          newsList={newsList}
          newsListById={newsListById}
          load={::this.load}
        />
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
