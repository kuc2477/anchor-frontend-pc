import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import './modules/keyboard'
import router from './router'
import store from './store'

import { FLOW_CLASS } from './constants/strings'


// inject tap event plugin
injectTapEventPlugin()

// render app after dom content load
document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store} >
      {router}
    </Provider>,
    document.getElementById('root')
  )
})
