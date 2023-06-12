import axios from "axios";

const baseUrl = "http://localhost:3001/api/login";

const login = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials)
    return response;
  }
  catch (err) {
    return err.response;
  }

};

let token = null;

const setToken = newToken => {
  token = `bearer ${ newToken }`;
};

const loginService = {
  login,
  setToken
};

export default loginService;