import React from 'react'
import { whyDidYouUpdate } from 'why-did-you-update'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import './modules/autobahn'
import './modules/keyboard'
import router from './router'
import store from './store'
import DevTools from './components/dev/DevTools'


// track avoidable renders
if (process.env.TRACK_AVOIDABLE_RENDERS === 'true') {
  whyDidYouUpdate(React)
}

// inject tap event plugin
injectTapEventPlugin()

// render app after dom content load
document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store} >
      <div>
        {router}
        <DevTools />
      </div>
    </Provider>,
    document.getElementById('root')
  )
})
