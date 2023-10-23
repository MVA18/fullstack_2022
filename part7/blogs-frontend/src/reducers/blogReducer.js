import blogService from '../services/blogs'
import { createSlice, isFulfilled } from "@reduxjs/toolkit";
import { setNotification } from "./notificationReducer";

const blogSlice = createSlice({
    name: 'blog',
    initialState: null,
    reducers: {
        set(state, action) {
            return action.payload
        },
    },
})

export const { set, like } = blogSlice.actions

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
            dispatch(set(updateBlog))
            dispatch(setNotification(`Removed blog "${ updateBlog.title }"`, 5000))
        })
    }
}

export default blogSlice.reducer