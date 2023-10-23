import blogService from "../services/blogs";
import { createSlice } from "@reduxjs/toolkit";
import { setNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    like(state, action) {
      state = state.map(blog => {
        if (blog.id === action.payload.id) {
          return {
            ...blog,
            likes: blog.likes + 1
          };
        }
        return blog;
      });
      return state;
    },
    create(state, action) {
      state.push(action.payload);
    },
    remove(state, action) {
      if(action.payload.blog) {
        let data = {
          ...state,
          blogs: state.filter(blog => blog.id !== action.payload.blog.id)
        };
        return data.blogs;
      }
    },
    set(state, action) {
      return action.payload;
    },
  }
});

export const { create, set, remove } = blogSlice.actions;

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch(set(blogs));
  };
};

export const createNewBlog = (request) => {
  return async dispatch => {
    const newBlog = await blogService.createNew(request);
    dispatch(create(newBlog));
  };
};

export const removeBlog = (blog) => {
  return async dispatch => {
    let removeBlog = { ...blog }
    await blogService.remove(removeBlog).then((blogId) => {
      const response = dispatch(remove(blogId))
      if(response.payload.response.status === 204) {
        dispatch(setNotification(`Removed blog "${ blog.title }"`, 5000))
      }
      if(response.payload.response.status === 404) {
        dispatch(setNotification(`Blog "${ blog.title }" could not be found`, 5000))
      }
      if(response.payload.response.status === 403) {
        dispatch(setNotification(`${ response.payload.response.statusText }`, 5000))
      }
    })
  }
}

export default blogSlice.reducer;