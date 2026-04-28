
// import React, { createContext, useState, useEffect, useContext } from 'react';
// import { getMe, logout as logoutAPI } from '../api/authAPI';
// import toast from 'react-hot-toast';

// export const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Only check auth if we're not on login/register pages
//     const path = window.location.pathname;
//     if (path === '/login' || path === '/register') {
//       setLoading(false);
//       return;
//     }
//     checkAuth();
//   }, []);

//   const checkAuth = async () => {
//     try {
//       console.log('Checking authentication...');
//       const response = await getMe();
//       console.log('Auth response:', response.data);
      
//       if (response.data?.success && response.data?.data) {
//         setUser(response.data.data);
//         console.log('User authenticated:', response.data.data.email);
//       } else {
//         setUser(null);
//       }
//     } catch (error) {
//       console.log('No authenticated user found');
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = async () => {
//     try {
//       await logoutAPI();
//       setUser(null);
//       toast.success('Logged out successfully');
//       window.location.href = '/login';
//     } catch (error) {
//       console.error('Logout error:', error);
//       setUser(null);
//       toast.error('Logout failed');
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, loading, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };




import React, { createContext, useState, useEffect, useContext } from 'react';
import { getMe, logout as logoutAPI } from '../api/authAPI';
export const AuthContext = createContext();

//const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check localStorage for user data and token
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', authToken);
  };

  const logout = async () => {
    try {
      await logoutAPI();
    } catch (error) {
      console.error('Logout error:', error);
    }
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};