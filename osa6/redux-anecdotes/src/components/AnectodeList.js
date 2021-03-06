import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnectode } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnectodeList = () => {
  const anecdotes = useSelector(({ anectode }) => anectode)
  const dispatch = useDispatch()
  const filter = useSelector((state) => state.filter.content)

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnectode(id))
    dispatch(
      showNotification(`Voted ${anecdotes.find((e) => e.id === id).content}`, 5)
    )
  }
  console.log(anecdotes)
  return (
    <div>
      {anecdotes.map((anecdote) =>
        anecdote.content.toLowerCase().startsWith(filter.toLowerCase()) ? (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ) : (
          ''
        )
      )}
    </div>
  )
}

export default AnectodeList
