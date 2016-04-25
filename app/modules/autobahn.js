import autobahn from 'autobahn'
import urls from './urls'
import {
  ROUTER_REALM,
  TOPIC_COVER_STARTED,
  TOPIC_COVER_FINISHED
} from '../constants/strings'


// connection to crossbar router
export default const connection = new autobahn.Connection({
  url: urls.router(),
  realm: ROUTER_REALM
})


// subscribe router events
connection.onopen = (session) => {
  session.subscribe(TOPIC_COVER_STARTED, (args) => {
    // TODO: NOT IMPLEMENTED YET
  })
  session.subscribe(TOPIC_COVER_FINISHED, (args) => {
    // TODO: NOT IMPLEMENTED YET
  })
}


// open connection to the crossbar router
connection.open()
