import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anectodeReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  anectode: anectodeReducer,
  notification: notificationReducer,
})

const store = createStore(reducer, composeWithDevTools())

export default store
