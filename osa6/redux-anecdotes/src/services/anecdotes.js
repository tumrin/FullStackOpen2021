import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}
const vote = async (id) => {
  const anecdote = await getAll()
  const votedAnecdote = anecdote.find((item) => item.id === id)
  console.log(votedAnecdote)
  votedAnecdote.votes++
  await axios.patch(baseUrl.concat(`/${id}`), votedAnecdote)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew, vote }
