import userService from '../services/users'
import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        set(state, action) {
            return action.payload
        }
    },
})

export const { set} = userSlice.actions


export const initializeUsers = () => {
    return async dispatch => {
        const users = await userService.getAll()
        dispatch(set(users))
    }
}

export default userSlice.reducer