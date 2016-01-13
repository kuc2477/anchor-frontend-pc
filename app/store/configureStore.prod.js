import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import reducer from '../reducers'


// store enhanvers
const enhancers = [
  applyMiddleware(thunkMiddleware, createLogger()),
]

// get enhancer applied store factory
const finalCreateStore = compose(...enhancers)(createStore)


export default function configureStore(initialState) {
  return finalCreateStore(reducer, initialState)
}