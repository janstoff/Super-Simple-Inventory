import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducers from '../reducers'

const middleware = [thunk]

if (process.env.NODE_ENV === 'development') {
	middleware.push(logger)
}

const middlewareToBeApplied = applyMiddleware(...middleware)

const store = createStore(reducers, composeWithDevTools(middlewareToBeApplied))

export default store
