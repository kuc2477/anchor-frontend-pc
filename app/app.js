import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { createHistory } from 'history'

import routes from './routes'
import configureStore from './store/configureStore'


// inject tap event plugin
injectTapEventPlugin()

// render app after dom content load
document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider history={createHistory()} store={configureStore()} >
      <Router>
        {routes}
      </Router>
    </Provider>,
    document.getElementById('root')
  )
})
