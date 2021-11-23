import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anectodeReducer from './reducers/anecdoteReducer'

const reducer = combineReducers({
  anectode: anectodeReducer,
})

const store = createStore(reducer, composeWithDevTools())

export default store
