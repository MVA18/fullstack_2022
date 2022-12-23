import Togglable from './Togglable'
import {useEffect, useState} from 'react'

const Blog = ({blog, removeBlog, updateState}) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const [newBlog, setBlog] = useState(blog)

    const updateBlog = () => {
        if (blog !== newBlog) {
            updateState(newBlog)
        }
    }

    useEffect(updateBlog, [blog, newBlog])

    const addLike = (likes) => {
        setBlog(newBlog => ({...newBlog, likes: likes}))
    }

    return (
        <div style={ blogStyle }>
            { newBlog.title }
            <Togglable buttonLabel='view' buttonCancel='hide'>
                <div>
                    { newBlog.url }
                </div>
                <div>
                    likes { newBlog.likes }
                    <button key={ 'btn_likes' } onClick={ () => addLike(newBlog.likes + 1) }>like</button>
                </div>
                <div>
                    { newBlog.author }
                </div>
                <div>
                    <button key={ 'btn_delete' } onClick={ () => removeBlog(newBlog) }>delete</button>
                </div>
            </Togglable>

        </div>
    )
}

export default Blog