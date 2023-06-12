import loginService from "../services/login";
import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "loggedInUser",
  initialState: {
    name: null,
    username: null,
    token: null
  },
  reducers: {
    set(state, action) {
      return action.payload;
    }
  }
});

export const { set, show } = loginSlice.actions;

export const login = (credentials) => {
  return async dispatch => {
    const response = await loginService.login(credentials);
    if (response.status === 200) {
      dispatch(set(response.data));
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(response.data))
    }
    return response;
  };
};

export const logout = () => {
  return async dispatch => {
    dispatch(set(null));
  };
};

export default loginSlice.reducer;