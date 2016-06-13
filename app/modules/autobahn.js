import autobahn from 'autobahn'
import urls from './urls'
import {
  ROUTER_REALM,
  SUCCESS,
  COVER_START,
  COVER_SUCCESS,
  COVER_ERROR,
} from '../constants/strings'
import store from '../store'


// connection to crossbar router
export const connection = new autobahn.Connection({
  url: urls.router(),
  realm: ROUTER_REALM
})


// subscribe router events
connection.onopen = (session) => {
  const {
    coverStart,
    coverSuccess,
    coverError,
  } = require('../actions/autobahn')

  // cover start
  session.subscribe(COVER_START, (args) => {
    const [scheduleId, state] = args
    if (!scheduleId) {
      console.warn(
        'Empty schedule id has been received from the router. ' +
        'You should check your notifier component or celery callbacks.'
      )
      return
    }
    store.dispatch(coverStart(scheduleId, state))
  })

  // cover success
  session.subscribe(COVER_SUCCESS, (args) => {
    const [scheduleId, state, size] = args
    if (!scheduleId) {
      console.warn(
        'Empty schedule id has been received from the router. ' +
        'You should check your notifier component or celery callbacks.'
      )
      return
    }
    store.dispatch(coverFinished(scheduleId, state, size))
  })

  // cover error
  session.subscribe(COVER_ERROR, (args) => {
    const [scheduleId, state] = args
    if (!scheduleId) {
      console.warn(
        'Empty schedule id has been received from the router. ' +
        'You should check your notifier component or celery callbacks.'
      )
      return
    }
    store.dispatch(coverError(scheduleId, state))
  })
}


// open connection to the crossbar router
connection.open()


export default connection
