import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        show(state, action) {
            return state = action.payload
        },
        reset(state, action) {
            return state = ''
        },
    }
})

export const { show, reset } = notificationSlice.actions

export const setNotification = (content, timer) => {
    return dispatch => {
        dispatch(show(content))
        setTimeout(() => {
            dispatch(reset())
        }, timer)
    }
}
export default notificationSlice.reducer
