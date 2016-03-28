import store from '../store'
import { LOGIN } from '../constants/routes'
import { initUser } from '../actions/auth'
import { isAuthenticated } from './auth'


// callback function to check auth status on route change. used in `onEnter`
// of `router.js`.
export function authRequired(nextState, replace, callback) {
  if (!isAuthenticated()) {
    replace(LOGIN.path)
    callback()
    return
  }
  // Initialize user first if not initialized yet.
  if (!store.getState().auth.get('user')) {
    store.dispatch(initUser(replace, callback))
    return
  }
  callback()
}
