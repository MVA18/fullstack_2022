import {createSlice} from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: [],
    reducers: {
        show(state, action) {
            state.push(action.payload)
            return state
        },
        reset(state, action) {
            return state = []
        },
        clearTimeOut(state, action) {
            state.forEach((notification) => {
                clearTimeout(notification.id)
            })

        },
    }
})

export const {show, reset, clearTimeOut} = notificationSlice.actions

export const setNotification = (content, timer) => {
    return async dispatch => {
        const timeoutId = setTimeout(() => {
            dispatch(reset())
        }, timer)
        const notification = {
            id: timeoutId,
            message: content
        }
        dispatch(clearTimeOut())
        dispatch(show(notification))
    }
}
export default notificationSlice.reducer
