import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnectode } from '../reducers/anecdoteReducer'

const AnectodeForm = () => {
  const dispatch = useDispatch()
  const createAnectode = (event) => {
    event.preventDefault()
    console.log(event)
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addAnectode(content))
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
