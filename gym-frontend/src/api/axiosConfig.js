// import axios from 'axios';

// // Use the environment variable or fallback to localhost
// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';

// const axiosInstance = axios.create({
//   baseURL: API_URL,
//   withCredentials: true,
//   timeout: 30000,
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//   },
// });

// // Request interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     console.log(`🚀 ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
//     return config;
//   },
//   (error) => {
//     console.error('Request Error:', error);
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => {
//     console.log(`✅ ${response.config.url} - ${response.status}`);
//     return response;
//   },
//   (error) => {
//     console.error(`❌ Error:`, error.message);
//     if (error.code === 'ERR_NETWORK') {
//       console.error('❌ Cannot connect to backend. Make sure it\'s running on port 5000');
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;





// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/v1';

// const axiosInstance = axios.create({
//   baseURL: API_URL,
//   // Temporarily disable withCredentials to test
//   // withCredentials: true,
//   timeout: 30000,
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//   },
// });

// // Request interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     console.log(`🚀 ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
//     return config;
//   },
//   (error) => {
//     console.error('Request Error:', error);
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => {
//     console.log(`✅ ${response.config.url} - ${response.status}`);
//     return response;
//   },
//   (error) => {
//     console.error(`❌ Error:`, error.message);
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;







import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor - Add token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`🚀 ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.config.url} - ${response.status}`);
    return response;
  },
  (error) => {
    console.error(`❌ Error:`, error.response?.status, error.message);
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;