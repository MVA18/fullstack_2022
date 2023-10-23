import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/users';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getUser = async (userId) => {
  const response = await axios.get(baseUrl + '/' + userId);
  return response.data;
};

const userService = {
  getAll,
  getUser
};

export default userService;