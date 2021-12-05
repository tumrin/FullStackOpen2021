import anecdoteService from '../services/anecdotes'
const anectodeReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const votedAnectode = state.find(
        (element) => element.id === action.data.id
      )
      const addedVote = { ...votedAnectode, votes: votedAnectode.votes + 1 }
      return state
        .map((anectode) =>
          anectode.id === action.data.id ? addedVote : anectode
        )
        .sort((a, b) => b.votes - a.votes)
    case 'NEW_ANECTODE':
      return state.concat(action.data).sort((a, b) => b.votes - a.votes)
    case 'INIT_ANECDOTE':
      return action.data
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTE',
      data: anecdotes,
    })
  }
}
export const voteAnectode = (id) => {
  return {
    type: 'VOTE',
    data: { id },
  }
}
export const addAnectode = (data) => {
  return {
    type: 'NEW_ANECTODE',
    data,
  }
}

export default anectodeReducer
