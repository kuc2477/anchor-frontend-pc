import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'

import './modules/keyboard'
import router from './router'
import store from './store'
import DevTools from './components/dev/DevTools'
import { FLOW_CLASS } from './constants/strings'


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
