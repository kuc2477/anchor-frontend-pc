import autobahn from 'autobahn'
import urls from './urls'
import {
  ROUTER_REALM,
  SUCCESS,
  TOPIC_COVER_STARTED,
  TOPIC_COVER_FINISHED
} from '../constants/strings'
import store from '../store'


// connection to crossbar router
export const connection = new autobahn.Connection({
  url: urls.router(),
  realm: ROUTER_REALM
})


// subscribe router events
connection.onopen = (session) => {
  // ==============
  // TOPIC STARTED
  // ==============
  
  session.subscribe(TOPIC_COVER_STARTED, (args) => {
    const { coverStarted } = require('../actions/schedules')
    const [ scheduleId ] = args
    if (!scheduleId) {
      return
    }

    // dispatch cover started
    store.dispatch(coverStarted(scheduleId))
  })


  // ==============
  // TOPIC FINISHED
  // ==============
  
  session.subscribe(TOPIC_COVER_FINISHED, (args) => {
    const { coverFinished } = require('../actions/schedules')
    const { fetchLatestNews } = require('../actions/news')
    const [ scheduleId, status ] = args
    if (!scheduleId) {
      return
    }

    // dispatch cover finished and fetch latest news if cover finished
    // succcessfully
    store.dispatch(coverFinished(scheduleId, status))
    if (status === SUCCESS) {
      store.dispatch(fetchLatestNews())
    }
  })
}


// open connection to the crossbar router
connection.open()


export default connection
