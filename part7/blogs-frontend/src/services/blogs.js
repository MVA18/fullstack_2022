import axios from "axios";
import store from "../store";

const baseUrl = "http://localhost:3001/api/blogs";

const getHeaders = () => {
  return { headers: { Authorization: "bearer " + store.getState().loggedInUser.token } };
};
const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (request) => {
  const content = request.newBlog;
  const response = await axios.post(
    baseUrl,
    { newBlog: { ...content, votes: 0 }, user: request.user.id },
    getHeaders()
  );
  return response.data;
};

const like = async (blog) => {
  const response = await axios.put(baseUrl + "/" + blog.id, blog);
  return response.data;
};

const remove = async (blog) => {
  try {
    const response = await axios.delete(
      baseUrl + "/" + blog.id,
      getHeaders());
      return {'response': response, 'blog': blog};
  } catch (err) {
    return {'response': err.response};
  }

};

const getBlog = async (blogId) => {
  const response = await axios.get(baseUrl + "/" + blogId);
  return response.data;
};


const blogService = {
  getAll,
  getBlog,
  createNew,
  like,
  remove
};

export default blogService;