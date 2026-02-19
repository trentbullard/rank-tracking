import axios from 'axios';
import { getConfigValue } from '../config/runtimeConfig';

let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token || null;
};

const api = axios.create({
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  config.baseURL = getConfigValue('MRANK_API_HOST', 'http://localhost:3002/api');
  if (accessToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  };
  return config;
});

export default api;
