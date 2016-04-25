import autobahn from 'autobahn'
import urls from './urls'
import {
  ROUTER_REALM,
  TOPIC_COVER_STARTED,
  TOPIC_COVER_FINISHED
} from '../constants/strings'


// connection to crossbar router
export const connection = new autobahn.Connection({
  url: urls.router(),
  realm: ROUTER_REALM
})


// subscribe router events
connection.onopen = (session) => {
  session.subscribe(TOPIC_COVER_STARTED, (args) => {
    console.log(`${TOPIC_COVER_STARTED}: router call!`)
  })
  session.subscribe(TOPIC_COVER_FINISHED, (args) => {
    console.log(`${TOPIC_COVER_FINISHED}: router call!`)
  })
}


// open connection to the crossbar router
connection.open()


export default connection
