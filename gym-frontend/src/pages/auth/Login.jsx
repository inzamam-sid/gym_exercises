

// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { login } from '../../api/authAPI';
// import { useAuth } from '../../contexts/AuthContext';
// import toast from 'react-hot-toast';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { setUser } = useAuth();

//   // Log the API URL on component mount
//   React.useEffect(() => {
//     console.log('API URL:', process.env.REACT_APP_API_URL);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     console.log('Attempting login with:', { email, password: '***' });
    
//     try {
//       const response = await login({ email, password });
//       console.log('Login response:', response.data);
      
//       if (response.data.success) {
//         setUser(response.data.data);
//         toast.success('Login successful!');
        
//         if (response.data.data.role === 'admin') {
//           navigate('/admin/dashboard');
//         } else {
//           navigate('/member/dashboard');
//         }
//       }
//     } catch (error) {
//       console.error('Login error details:', error);
//       console.error('Error code:', error.code);
//       console.error('Error message:', error.message);
      
//       if (error.code === 'ERR_NETWORK') {
//         toast.error('Cannot connect to backend at localhost:5000. Please start the backend server.');
//       } else if (error.response?.data?.message) {
//         toast.error(error.response.data.message);
//       } else {
//         toast.error('Login failed: ' + error.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="text-center text-3xl font-bold text-gray-900">Sign in to your account</h2>
//           <p className="text-center text-sm text-gray-600 mt-2">
//             Test: admin@gympro.com / Admin123456
//           </p>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <input
//               type="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Email address"
//             />
//           </div>
//           <div>
//             <input
//               type="password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Password"
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
//           >
//             {loading ? 'Signing in...' : 'Sign in'}
//           </button>
//         </form>
//         <div className="text-center">
//           <Link to="/register" className="text-blue-600 hover:text-blue-700">
//             Don't have an account? Register
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;








import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../api/authAPI';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Clear any old tokens
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    console.log('Attempting login for:', email);
    
    try {
      const response = await login({ email, password });
      console.log('Login response:', response.data);
      
      if (response.data.success) {
        const token = response.data.token;
        console.log('Token received:', token ? 'Yes' : 'No', 'Length:', token?.length);
        
        if (!token) {
          console.error('No token in response!');
          toast.error('Login failed: No token received');
          return;
        }
        
        authLogin(response.data.data, token);
        toast.success('Login successful!');
        
        setTimeout(() => {
          if (response.data.data.role === 'admin') {
            navigate('/admin/dashboard');
          } else {
            navigate('/member/dashboard');
          }
        }, 100);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">Sign in to your account</h2>
          <p className="text-center text-sm text-gray-600 mt-2">
            Test: admin@gympro.com / Admin123456
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email address"
            />
          </div>
          <div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <div className="text-center">
          <Link to="/register" className="text-blue-600 hover:text-blue-700">
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;