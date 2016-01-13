import React from 'react'
import { Route, IndexRedirect } from 'react-router'

import App from './containers/App'
import { SCHEDULES, NEWS } from './constants/routes'


export default (
  <Route path="/" component={App} >
    <IndexRedirect to={NEWS.path} />
    <Route path={NEWS.path} component={NEWS.component} />
    <Route path={SCHEDULES.path} component={SCHEDULES.component} />
  </Route>
)
