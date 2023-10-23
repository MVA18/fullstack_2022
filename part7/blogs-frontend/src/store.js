import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "./reducers/blogsReducer";
import userReducer from "./reducers/userReducer";
import usersReducer from "./reducers/usersReducer";
import notificationReducer from "./reducers/notificationReducer";
import filterReducer from "./reducers/filterReducer";
import loginReducer from "./reducers/loginReducer";
import blogReducer from "./reducers/blogReducer";

const store = configureStore({
  reducer: {
    loggedInUser: loginReducer,
    blog: blogReducer,
    blogs: blogsReducer,
    user: userReducer,
    users: usersReducer,
    notification: notificationReducer,
    filter: filterReducer
  }
});

export default store;