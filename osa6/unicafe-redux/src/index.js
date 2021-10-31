import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD',
    })
  }
  const ok = () => {
    store.dispatch({
      type: 'OK',
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD',
    })
  }
  const zero = () => {
    store.dispatch({
      type: 'ZERO',
    })
  }

  return (
    <div>
      <h2>Give feedback</h2>
      <button onClick={good}>good</button>
      <button onClick={ok}>ok</button>
      <button onClick={bad}>bad</button>
      <button onClick={zero}>reset stats</button>
      <h2>Statistics</h2>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
      <div>
        all {store.getState().bad + store.getState().ok + store.getState().good}
      </div>
      <div>
        average{' '}
        {(store.getState().bad * -1 +
          store.getState().ok * 0 +
          store.getState().good * 1) /
          (store.getState().bad +
            store.getState().ok +
            store.getState().good) || 0}
      </div>
      <div>
        positive{' '}
        {`${
          (store.getState().good /
            (store.getState().bad +
              store.getState().ok +
              store.getState().good)) *
            100 || 0
        }%`}
      </div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
