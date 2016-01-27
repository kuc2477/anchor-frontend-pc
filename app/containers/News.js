import React from 'react'
import { connect } from 'react-redux'

import NewsList from '../components/news/NewsList'


export default class News extends React.Component {
  static propTypes = {
  };

  render() {
    return (
      <div><NewsList /></div>
    )
  }
}
