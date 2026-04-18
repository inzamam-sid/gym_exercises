import axios from './axiosConfig';

export const register = (userData) => {
  return axios.post('/auth/register', userData);
};

export const login = (credentials) => {
  return axios.post('/auth/login', credentials);
};

export const logout = () => {
  return axios.post('/auth/logout');
};

export const getMe = () => {
  return axios.get('/auth/me');
};

export const refreshToken = () => {
  return axios.post('/auth/refresh-token');
};