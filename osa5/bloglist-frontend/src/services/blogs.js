import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
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
const update = (id, newObject) => {
    const request = axios.put(`${baseUrl} /${id}`, newObject)
    return request.then((response) => response.data)
}

const addBlog = () => {}

export default { getAll, addBlog, create, update, setToken, getAllUser }
