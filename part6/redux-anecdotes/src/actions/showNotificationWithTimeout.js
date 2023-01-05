import { reset, show } from "../reducers/notificationReducer";

export function showNotificationWithTimeout(dispatch, text) {
    dispatch(show(text))
    setTimeout(() => {
        dispatch(reset())
    }, 5000)
}