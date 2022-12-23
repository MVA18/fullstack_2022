import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
    token = `bearer ${ newToken }`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async newObject => {
    const config = {headers: {Authorization: token}}

    return await axios.post(baseUrl, newObject, config)
}

const update = async (id, newObject) => {
    return await axios.put(`${ baseUrl }/${ id }`, newObject)
}

const remove = async (id) => {
    const config = {headers: {Authorization: token}}

    return await axios.delete(`${ baseUrl }/${ id }`, config)
}

export default {getAll, create, update, remove, setToken}