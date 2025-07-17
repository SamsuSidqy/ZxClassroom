import axios from 'axios'
import url from './Endpoint'

const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${url}register`, userData);
    return { status: true, data: response.data };
  } catch (error) {
    const message = error.response?.data?.message || 'Registration failed';
    return { status: false, error: message };
  }
};


export default registerUser