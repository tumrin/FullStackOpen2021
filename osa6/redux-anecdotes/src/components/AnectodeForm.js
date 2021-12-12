import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnectode } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnectodeForm = () => {
  const dispatch = useDispatch()
  const createAnectode = async (event) => {
    event.preventDefault()
    console.log(event)
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addAnectode(content))
    dispatch(showNotification(`you voted '${content}'`, 10))
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnectode}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnectodeForm
