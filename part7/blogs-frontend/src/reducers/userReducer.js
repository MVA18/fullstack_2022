import userService from '../services/users'
import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        set(state, action) {
            return action.payload
        }
    },
})

export const { set} = userSlice.actions

export const getUser = (userId) => {
    return async dispatch => {
        const user =  await userService.getUser(userId)
        dispatch(set(user))
    }
}

export default userSlice.reducer