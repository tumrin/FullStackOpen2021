import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}
const getAllUser = async (user) => {
    const response = await axios.get(baseUrl)
    console.log(user?.username)
    return response.data.filter(
        (entry) => entry.user.username === user?.username
    )
}
const create = async (newObject) => {
    const config = { headers: { Authorization: token } }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}
const update = async (id, newObject) => {
    const response = await axios.put(`${baseUrl} /${id}`, newObject)
    return response.data
}

const addBlog = () => {}

const blogsService = {
    getAll,
    addBlog,
    create,
    update,
    setToken,
    getAllUser,
}

export default blogsService
