import blogService from '../services/blogs'
import { createSlice } from "@reduxjs/toolkit";
import { setNotification } from "./notificationReducer";

const blogSlice = createSlice({
    name: 'blog',
    initialState: null,
    reducers: {
        set(state, action) {
            return action.payload
        },
        addComment(state, action) {
            return {
                ...state,
                comments: [...state.comments, action.payload],
            };
        },
        like(state, action) {
            state.likes = action.payload
            return state
        },
    },
})

export const { set, addComment, like } = blogSlice.actions

export const getBlog = (blogId) => {
    return async dispatch => {
        const user =  await blogService.getBlog(blogId)
        dispatch(set(user))
    }
}

export const likeBlog = blog => {
    return async dispatch => {
        let updateBlog = { ...blog }
        updateBlog.likes++
        await blogService.like(updateBlog).then((updateBlog) => {
            dispatch(like(updateBlog.likes))
            dispatch(setNotification(`Liked blog "${ updateBlog.title }"`, 5000))
        })
    }
}

export const createNewComment = (data) => {
    return async dispatch => {
        const result =  await blogService.addComment(data.blog.id, data.comment, data.user.id)
        dispatch(addComment(result))
    }
}

export default blogSlice.reducer