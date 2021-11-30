import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anectodeReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  anectode: anectodeReducer,
  notification: notificationReducer,
  filter: filterReducer,
})

const store = createStore(reducer, composeWithDevTools())

export default store
