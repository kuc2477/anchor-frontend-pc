import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import DevTools from '../components/dev/DevTools'
import apiMiddleware from '../middlewares/api'
import reducer from '../reducers'


// store enhanvers
const enhancers = [
  applyMiddleware(
    thunkMiddleware,
    apiMiddleware,
    createLogger(),
  ),
  DevTools.instrument()
]

// get enhancer applied store factory
const finalCreateStore = compose(...enhancers)(createStore)


export default function configureStore(initialState) {
  const store = finalCreateStore(reducer, initialState)

  // hot reload reducers
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      return store.replaceReducer(require('../reducers'))
    })
  }

  return store
}
