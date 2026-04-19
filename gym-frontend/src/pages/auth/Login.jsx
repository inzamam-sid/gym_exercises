// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { login } from '../../api/authAPI';
// import { getMe } from '../../api/authAPI';
// import { useAuth } from '../../hooks/useAuth';
// import toast from 'react-hot-toast';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { setUser } = useAuth();

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);

//   try {
//     await login({ email, password });

//     // 🔥 NOW call /me AFTER cookie stored
//     const meRes = await getMe();

//     setUser(meRes.data.data);

//     toast.success('Login successful!');

//     if (meRes.data.data.role === 'admin') {
//       navigate('/admin/dashboard');
//     } else {
//       navigate('/member/dashboard');
//     }

//   } catch (error) {
//     toast.error(error.response?.data?.message || 'Login failed');
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Sign in to your account
//           </h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <input
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
//                 placeholder="Email address"
//               />
//             </div>
//             <div>
//               <input
//                 type="password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
//                 placeholder="Password"
//               />
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
//             >
//               {loading ? 'Signing in...' : 'Sign in'}
//             </button>
//           </div>
          
//           <div className="text-sm text-center">
//             <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
//               Don't have an account? Register
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;







import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../api/authAPI';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log('Attempting login for:', email);
      const response = await login({ email, password });
      console.log('Login response:', response.data);
      
      setUser(response.data.data);
      toast.success('Login successful!');
      
      // Small delay to ensure cookies are set
      setTimeout(() => {
        if (response.data.data.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/member/dashboard');
        }
      }, 100);
      
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Login failed. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Test credentials: admin@gympro.com / Admin123456
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
          
          <div className="text-sm text-center">
            <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
              Don't have an account? Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;