import React, { useEffect } from "react";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import UsersList from "./components/UsersList";
import Filter from "./components/Filter";
import { initializeBlogs } from "./reducers/blogsReducer";
import { initializeUsers } from "./reducers/usersReducer";
import { connect, useDispatch } from "react-redux";
import Notification from "./components/Notification";
import { logout } from "./reducers/loginReducer";

const App = (props) => {
  const handleLogout = () => {
    localStorage.removeItem("loggedBlogappUser");
    window.location.href = "/";
    props.logout();
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);

  return (
    <div>
      <p>{ props.loggedInUser.name } logged-in
        <button onClick={ handleLogout }>
          logout
        </button>
      </p>
      <Notification />
      <h2>Blogs</h2>
      <Filter />
      <BlogList />
      <BlogForm />
      <h2>Users</h2>
      <UsersList />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.loggedInUser,
  }
}

const mapDispatchToProps = {
  logout
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;