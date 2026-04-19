// import jwt from 'jsonwebtoken';
// import AppError from '../utils/AppError.js';
// import User from '../modules/user/user.model.js';

// export const protect = async (req, res, next) => {
//   let token;

//   // Check for token in cookies first
//   if (req.cookies?.accessToken) {
//     token = req.cookies.accessToken;
//   } 
//   // Then check authorization header
//   else if (req.headers.authorization?.startsWith('Bearer')) {
//     token = req.headers.authorization.split(' ')[1];
//   }

//   if (!token) {
//     return next(new AppError('Not authenticated', 401));
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    
//     // Fetch user from database
//     const user = await User.findById(decoded.userId).select('-password -refreshToken');

//     if (!user) {
//       return next(new AppError('User not found', 401));
//     }

//     if (!user.isActive) {
//       return next(new AppError('Account is deactivated', 401));
//     }

//     // Attach user to request
//     req.user = user;
//     next();
//   } catch (err) {
//     console.error('Auth middleware error:', err.message);
//     return next(new AppError('Invalid or expired token', 401));
//   }
// };





import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';
import User from '../modules/user/user.model.js';

export const protect = async (req, res, next) => {
  let token;

  console.log('🔍 Auth middleware - Checking for token...');
  console.log('   Cookies available:', Object.keys(req.cookies || {}));

  // Check for token in cookies first
  if (req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken;
    console.log('   ✅ Token found in cookies');
  } 
  // Then check authorization header
  else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    console.log('   ✅ Token found in headers');
  }

  if (!token) {
    console.log('   ❌ No token found');
    return next(new AppError('Not authenticated - No token', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    console.log('   ✅ Token decoded - UserId:', decoded.userId);
    
    // Fetch user from database
    const user = await User.findById(decoded.userId).select('-password -refreshToken');

    if (!user) {
      console.log('   ❌ User not found');
      return next(new AppError('User not found', 401));
    }

    if (!user.isActive) {
      console.log('   ❌ User inactive');
      return next(new AppError('Account is deactivated', 401));
    }

    console.log(`   ✅ User authenticated: ${user.email} (${user.role})`);
    
    // Attach user to request
    req.user = user;
    next();
  } catch (err) {
    console.error('   ❌ Auth error:', err.message);
    return next(new AppError('Invalid or expired token', 401));
  }
};