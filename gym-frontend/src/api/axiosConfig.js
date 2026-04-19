
// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1',
//   withCredentials: true,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Prevent multiple refresh token requests
// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach(prom => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });
//   failedQueue = [];
// };

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
    
//     // Don't retry if it's already a retry
//     if (originalRequest._retry) {
//       return Promise.reject(error);
//     }
    
//     // Handle 401 Unauthorized
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       // Don't retry login/register endpoints
//       if (originalRequest.url.includes('/login') || originalRequest.url.includes('/register')) {
//         return Promise.reject(error);
//       }
      
//       if (isRefreshing) {
//         // Queue the request while token is being refreshed
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then(() => axiosInstance(originalRequest))
//           .catch(err => Promise.reject(err));
//       }
      
//       originalRequest._retry = true;
//       isRefreshing = true;
      
//       try {
//         await axiosInstance.post('/auth/refresh-token');
//         processQueue(null);
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         processQueue(refreshError, null);
//         // Clear cookies and redirect to login
//         document.cookie.split(";").forEach(c => {
//           document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
//         });
//         window.location.href = '/login';
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }
    
//     // Handle 429 Too Many Requests
//     if (error.response?.status === 429) {
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       return axiosInstance(originalRequest);
//     }
    
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;




import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
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
    console.error(`❌ ${error.config?.url} -`, error.response?.status || error.message);
    
    // Handle 401 - just reject, don't auto-redirect
    if (error.response?.status === 401) {
      // Let the app handle it
      return Promise.reject(error);
    }
    
    // Handle network errors
    if (error.message === 'Network Error') {
      console.error('Network Error - Make sure backend is running on port 5000');
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;