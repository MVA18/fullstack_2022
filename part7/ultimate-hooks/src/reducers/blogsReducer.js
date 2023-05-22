import blogService from '../services/blogs'
import {createSlice} from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        upvote(state, action) {
            state.filter(blog => {
                if (blog.id === action.payload.id) {
                    blog.votes++
                }
                return blog
            })
        },
        create(state, action) {
            state.push(action.payload)
        },
        remove(state, action) {
            let data = {
                ...state,
                blogs: state.filter(blog => blog.id !== action.payload)
            };
            return data.blogs;
        },
        set(state, action) {
            return action.payload
        }
    },
})

export const {create, upvote, remove, set} = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const anecdotes = await blogService.getAll()
        dispatch(set(anecdotes))
    }
}

export const createNewBlog = content => {
    return async dispatch => {
        const newBlog = await blogService.createNew(content)
        dispatch(create(newBlog))
    }
}

export const upvoteBlog = blog => {
    return async dispatch => {
        let updateBlog = {...blog}
        updateBlog.votes++
        await blogService.upvote(updateBlog).then((blog) => {
            dispatch(upvote(blog))
        })
    }
}

export const removeBlog = blog => {
    return async dispatch => {
        let removeBlog = {...blog}
        await blogService.remove(removeBlog).then((blog) => {
            dispatch(remove(blog))
        })
    }
}
export default blogSlice.reducer