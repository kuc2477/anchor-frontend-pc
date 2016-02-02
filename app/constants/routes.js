import Schedules from '../containers/Schedules'
import News from '../containers/News'
import Login from '../containers/Login'
import Signup from '../containers/Signup'

import urls from '../modules/urls'


export const NEWS = {
  component: News,
  path: 'news',
  label: 'NEWS',
  loginRequired: true,
  onlyVisibleToAuthenticated: true
}

export const SCHEDULES = {
  component: Schedules,
  path: 'sites',
  label: 'SITES',
  loginRequired: true,
  onlyVisibleToAuthenticated: true
}

export const LOGIN = {
  component: Login,
  path: 'login',
  label: 'LOGIN',
  loginRequired: false,
  onlyVisibleToAnonymous: true,
}

export const LOGOUT = {
  link: urls.logout(),
  label: 'LOGOUT',
  onlyVisibleToAuthenticated: true
}

export const SIGNUP = {
  component: Signup,
  path: 'signup',
  label: 'SIGNUP',
  loginRequired: false
}


export default { NEWS, SCHEDULES, LOGIN, LOGOUT, SIGNUP }
