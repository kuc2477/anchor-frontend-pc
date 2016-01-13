import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import NewsList from './containers/NewsList'


export default (
  <Route path="/" component={App} >
    <IndexRoute component={NewsList} />
    <Route path="news" component={NewsList} />
  </Route>
)
