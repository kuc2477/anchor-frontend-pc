import React from 'react'
import { Router, Route, IndexRedirect } from 'react-router'

import App from './containers/App'
import { SCHEDULES, NEWS, LOGIN, SIGNUP } from './constants/routes'
import history from './modules/history'
import { authRequired } from './modules/routing'


export const router = (
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRedirect to={NEWS.path} />
      <Route path={NEWS.path} component={NEWS.component} onEnter={authRequired}/>
      <Route path={SCHEDULES.path} component={SCHEDULES.component} onEnter={authRequired}/>
      <Route path={LOGIN.path} component={LOGIN.component} />
      <Route path={SIGNUP.path} component={SIGNUP.component} />
    </Route>
  </Router>
)


export default router
