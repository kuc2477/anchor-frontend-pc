import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { createHistory } from 'history'

import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import routes from './routes'
import reducer from './reducers'


const middlewaredStore = applyMiddleware(
  thunkMiddleware,
  createLogger()
)(createStore)


document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider history={createHistory()} store={middlewaredStore(reducer)} >
      <Router>
        {routes}
      </Router>
    </Provider>,
    document.getElementById('root')
  )
})
