import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'
const middlewares = [applyMiddleware(...[thunk])]
export default () => {
  return createStore(reducers, compose(...middlewares))
}