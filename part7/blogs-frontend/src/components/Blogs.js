import Notification from "./Notification";
import Filter from "./Filter";
import BlogList from "./BlogList";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeBlogs } from "../reducers/blogsReducer";


const Blogs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  return (
    <div>
      <Notification />
      <h2>Blogs</h2>
      <Filter />
      <BlogList />
    </div>
  );
}

export default Blogs