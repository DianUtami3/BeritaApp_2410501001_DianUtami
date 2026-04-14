import axios from 'axios';
import Constants from 'expo-constants';

const api = axios.create({
  baseURL: Constants.expoConfig?.extra?.newsApiBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'X-Api-Key': Constants.expoConfig?.extra?.newsApiKey,
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;