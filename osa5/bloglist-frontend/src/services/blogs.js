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
    return response.data.filter(
        (entry) => entry.user.username === user?.username
    )
}
const create = async (newObject) => {
    const config = { headers: { Authorization: token } }
    try {
        const response = await axios.post(baseUrl, newObject, config)
        return response.data
    } catch (e) {
        console.log(e)
    }
}
const update = async (id, newObject) => {
    const response = await axios.patch(`${baseUrl}/${id}`, newObject)
    return response.data
}
const remove = async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`, {
        headers: {
            Authorization: token,
        },
    })
    return response.data
}

const blogsService = {
    getAll,
    create,
    update,
    setToken,
    getAllUser,
    remove,
}

export default blogsService
