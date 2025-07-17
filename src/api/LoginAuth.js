import axios from 'axios'
import url from './Endpoint'

const loginUsers = async (userData) => {
  try {
    const response = await axios.post(`${url}login`, userData);
    return { status: true, data: response.data };
  } catch (error) {
    const message = error.response?.data?.message || 'Login failed';
    return { status: false, error: message };
  }
};


export default loginUsers