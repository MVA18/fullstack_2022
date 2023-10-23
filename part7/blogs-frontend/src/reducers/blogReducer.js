import blogService from '../services/blogs'
import {createSlice} from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name: 'blog',
    initialState: null,
    reducers: {
        set(state, action) {
            return action.payload
        }
    },
})

export const { set} = blogSlice.actions

export const getBlog = (blogId) => {
    return async dispatch => {
        const user =  await blogService.getBlog(blogId)
        dispatch(set(user))
    }
}

export default blogSlice.reducer