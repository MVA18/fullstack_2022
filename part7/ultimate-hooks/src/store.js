import {configureStore} from "@reduxjs/toolkit"
import blogsReducer from "./reducers/blogsReducer"
import usersReducer from "./reducers/usersReducer"
import notificationReducer from "./reducers/notificationReducer"
import filterReducer from "./reducers/filterReducer"

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    users: usersReducer,
    notification: notificationReducer,
    filter: filterReducer
  }
})

export default store