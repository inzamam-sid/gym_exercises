// import axios from './axiosConfig';

// export const register = (userData) => {
//   return axios.post('/auth/register', userData);
// };

// export const login = (credentials) => {
//   return axios.post('/auth/login', credentials);
// };

// export const logout = () => {
//   return axios.post('/auth/logout');
// };

// export const getMe = () => {
//   return axios.get('/auth/me');
// };

// export const refreshToken = () => {
//   return axios.post('/auth/refresh-token');
// };








import axios from './axiosConfig';

export const register = (userData) => {
  console.log('Registering user:', userData.email);
  return axios.post('/auth/register', userData);
};

export const login = (credentials) => {
  console.log('Logging in:', credentials.email);
  return axios.post('/auth/login', credentials);
};

export const logout = () => {
  console.log('Logging out');
  return axios.post('/auth/logout');
};

export const getMe = () => {
  console.log('Getting current user');
  return axios.get('/auth/me');
};

export const refreshToken = () => {
  console.log('Refreshing token');
  return axios.post('/auth/refresh-token');
};