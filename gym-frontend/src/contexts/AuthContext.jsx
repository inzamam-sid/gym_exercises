
// import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
// import { getMe, logout as logoutAPI } from '../api/authAPI';
// import toast from 'react-hot-toast';

// export const AuthContext = createContext();

// export const useAuthContext = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const authCheckDone = useRef(false);

//   useEffect(() => {
//     // Only check auth once when component mounts
//     if (!authCheckDone.current) {
//       authCheckDone.current = true;
//       checkAuth();
//     }
//   }, []);

//   const checkAuth = async () => {
//     try {
//       const response = await getMe();
//       if (response.data?.success && response.data?.data) {
//         setUser(response.data.data);
//       } else {
//         setUser(null);
//       }
//     } catch (error) {
//       // Don't show error for 401 - user just isn't logged in
//       if (error.response?.status !== 401) {
//         console.error('Auth check error:', error.response?.status);
//       }
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
//     } catch (error) {
//       console.error('Logout error:', error);
//       // Still clear local state
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
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only check auth if we're not on login/register pages
    const path = window.location.pathname;
    if (path === '/login' || path === '/register') {
      setLoading(false);
      return;
    }
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      console.log('Checking authentication...');
      const response = await getMe();
      console.log('Auth response:', response.data);
      
      if (response.data?.success && response.data?.data) {
        setUser(response.data.data);
        console.log('User authenticated:', response.data.data.email);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log('No authenticated user found');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutAPI();
      setUser(null);
      toast.success('Logged out successfully');
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
      setUser(null);
      toast.error('Logout failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};