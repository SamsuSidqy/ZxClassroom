import axios from 'axios'
import url from './Endpoint'
import AsyncStorage from "@react-native-async-storage/async-storage";

const KirimTugas = async (token, refreshToken,body) => {
  try {
    // Request pertama dengan token lama
    const response = await axios.post(`${url}asigsment`, body,{
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
    });

    return { status: true, data: response.data };
  } catch (error) {

    if (error.response?.status === 401) {
      try {
        const refreshResponse = await axios.get(`${url}refresh`, {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        const newAccessToken = refreshResponse.data.token;

        const storedUser = await AsyncStorage.getItem('acounts');
        const userObj = storedUser ? JSON.parse(storedUser) : {};
        userObj.token = newAccessToken;
        await AsyncStorage.setItem('acounts',JSON.stringify(userObj))

        const retryResponse = await axios.get(`${url}asigsment`, body,{
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
            'Content-Type': 'multipart/form-data'
          },
        });

        return { status: true, data: retryResponse.data };
      } catch (refreshError) {

        return {
          status: false,
          error: 'Session expired. Please login again.',
        };
      }
    }


    const message = error.response?.data?.message || 'Request failed';
    return { status: false, error: message };
  }
};


export default KirimTugas