import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import distributionZonesReducer from './location'
import plantsReducer from './plant'
import gardenReducer from './garden'

const reducer = combineReducers({
  user,
  distributionZonesReducer,
  plantsReducer,
  gardenReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
