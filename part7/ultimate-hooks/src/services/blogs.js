import axios from 'axios'

const baseUrl = 'http://localhost:3005/blogs'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = {content, votes: 0}
    const response = await axios.post(baseUrl, object)
    return response.data
}

const upvote = async (blog) => {
    const response = await axios.patch(baseUrl + '/' + blog.id, blog)
    return response.data
}

const remove = async (blog) => {
    const response = await axios.delete(baseUrl + '/' + blog.id, blog)
    if(response.status === 200){
        return blog.id
    }
}


const blogService = {
    getAll,
    createNew,
    upvote,
    remove
}

export default blogService