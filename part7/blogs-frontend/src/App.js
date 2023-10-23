import React from "react";
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "./reducers/loginReducer";
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import UsersList from "./components/UsersList";
import UserBlogsList from "./components/UserBlogsList";
import BlogForm from "./components/BlogForm";

const App = (props) => {

  const handleLogout = () => {
    localStorage.removeItem("loggedBlogappUser");
    window.location.href = "/";
    props.logout();
  };

  if (props.loggedInUser) {

    const padding = {
      padding: 5
    };

    return (
      <Router>
        <p>{ props.loggedInUser.name } logged-in
          <button onClick={ handleLogout }>
            logout
          </button>
        </p>
        <div>
          <Link style={ padding } to="/blogs">blogs</Link>
          <Link style={ padding } to="/create">create blog</Link>
          <Link style={ padding } to="/users">users</Link>
        </div>

        <Routes>
          <Route path="/blogs" element={ <Blogs /> } />
          <Route path="/blog/:id" element={ <Blog /> } />
          <Route path="/users" element={ <UsersList /> } />
          <Route path="/create" element={ <BlogForm /> } />
          <Route path="/user/:id" element={ <UserBlogsList />} />
          {/*<Route path="/" element={<Home />} />*/ }
        </Routes>
      </Router>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.loggedInUser
  };
};

const mapDispatchToProps = {
  logout
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;