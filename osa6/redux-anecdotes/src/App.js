import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import AnectodeForm from './components/AnectodeForm'
import AnectodeList from './components/AnectodeList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import anecdoteService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService.getAll().then(
      (anecdotes) => {
        dispatch(initializeAnecdotes(anecdotes))
      },
      [dispatch]
    )
  })
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnectodeList />
      <AnectodeForm />
    </div>
  )
}

export default App
