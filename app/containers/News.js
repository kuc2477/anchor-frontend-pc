import React from 'react'

import NewsList from '../components/news/NewsList'


export default class NewsContainer extends React.Component {
  static propTypes = {
  };

  render() {
    return (
      <div><NewsList /></div>
    )
  }
}
