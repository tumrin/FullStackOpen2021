import React from 'react'
import { connect } from 'react-redux'
import { addAnectode } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnectodeForm = (props) => {
  const createAnectode = async (event) => {
    event.preventDefault()
    console.log(event)
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.addAnectode(content)
    props.showNotification(`Added '${content}'`, 10)
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
const mapDispatchToProps = { addAnectode, showNotification }

const ConnectedAnectodeForm = connect(null, mapDispatchToProps)(AnectodeForm)
export default ConnectedAnectodeForm
