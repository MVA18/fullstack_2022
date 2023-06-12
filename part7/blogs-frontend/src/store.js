import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "./reducers/blogsReducer";
import usersReducer from "./reducers/usersReducer";
import notificationReducer from "./reducers/notificationReducer";
import filterReducer from "./reducers/filterReducer";
import loginReducer from "./reducers/loginReducer";

const store = configureStore({
  reducer: {
    loggedInUser: loginReducer,
    blogs: blogsReducer,
    users: usersReducer,
    notification: notificationReducer,
    filter: filterReducer
  }
});

export default store;