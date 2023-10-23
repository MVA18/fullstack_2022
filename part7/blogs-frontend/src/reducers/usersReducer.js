import userService from '../services/users'
import {createSlice} from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        set(state, action) {
            return action.payload
        }
    },
})

export const { set} = usersSlice.actions


export const initializeUsers = () => {
    return async dispatch => {
        const users = await userService.getAll()
        dispatch(set(users))
    }
}

export default usersSlice.reducer