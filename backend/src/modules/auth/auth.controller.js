
// import * as service from './auth.service.js';
// import AppError from '../../utils/AppError.js'; // Add this import

// const sendCookie = (res, accessToken, refreshToken) => {
//   const cookieOptions = {
//     // httpOnly: true,
//     // secure: false,
//     // sameSite: 'lax',
//     // maxAge: 7 * 24 * 60 * 60 * 1000
//     httpOnly: true,
//     secure: false,        // keep false in dev
//     sameSite: 'none',     // 🔥 CHANGE THIS (MOST IMPORTANT)
//     maxAge: 7 * 24 * 60 * 60 * 1000
//   };

//   res.cookie('accessToken', accessToken, cookieOptions);
//   res.cookie('refreshToken', refreshToken, cookieOptions);
// };

// export const register = async (req, res, next) => {
//   try {
//     const user = await service.registerUser(req.body);

//     res.status(201).json({
//       success: true,
//       message: 'User registered',
//       data: user
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// export const login = async (req, res, next) => {
//   try {
//     const { user, accessToken, refreshToken } = await service.loginUser(req.body);

//     sendCookie(res, accessToken, refreshToken);

//     res.json({
//       success: true,
//       message: 'Login successful',
//       data: user
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// export const logout = (req, res) => {
//   res.clearCookie('accessToken');
//   res.clearCookie('refreshToken');

//   res.json({ success: true, message: 'Logged out' });
// };

// export const me = async (req, res, next) => {
//   try {
//     // Fix: Use req.user._id instead of req.user.userId
//     const user = await service.getMe(req.user._id);

//     res.json({ success: true, data: user });
//   } catch (err) {
//     next(err);
//   }
// };

// export const refreshToken = async (req, res, next) => {
//   try {
//     const token = req.cookies.refreshToken;

//     if (!token) {
//       throw new AppError('No refresh token', 401);
//     }

//     const newAccessToken = await service.refreshTokenService(token);

//     res.cookie('accessToken', newAccessToken, {
//       httpOnly: true,
//       secure: false,
//       sameSite: 'lax',
//       domain: 'localhost'
//     });

//     res.json({ success: true, message: 'Token refreshed' });
//   } catch (err) {
//     next(err);
//   }
// };








import * as service from './auth.service.js';
import AppError from '../../utils/AppError.js';

const sendCookie = (res, accessToken, refreshToken) => {
  const cookieOptions = {
    httpOnly: true,
    secure: false, // Set to true in production with HTTPS
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/',
    domain: 'localhost'
  };

  res.cookie('accessToken', accessToken, cookieOptions);
  res.cookie('refreshToken', refreshToken, cookieOptions);
  
  console.log('✅ Cookies set - accessToken exists:', !!accessToken);
};

export const register = async (req, res, next) => {
  try {
    console.log('📝 Register attempt:', req.body.email);
    const user = await service.registerUser(req.body);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: user
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    console.log('🔐 Login attempt:', req.body.email);
    const { user, accessToken, refreshToken } = await service.loginUser(req.body);

    sendCookie(res, accessToken, refreshToken);

    res.json({
      success: true,
      message: 'Login successful',
      data: user
    });
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res) => {
  res.clearCookie('accessToken', { path: '/', domain: 'localhost' });
  res.clearCookie('refreshToken', { path: '/', domain: 'localhost' });

  res.json({ success: true, message: 'Logged out successfully' });
};

export const me = async (req, res, next) => {
  try {
    console.log('👤 Get me - User ID:', req.user?._id);
    const user = await service.getMe(req.user._id);

    res.json({ 
      success: true, 
      data: user 
    });
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      throw new AppError('No refresh token', 401);
    }

    const newAccessToken = await service.refreshTokenService(token);

    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      domain: 'localhost'
    });

    res.json({ success: true, message: 'Token refreshed' });
  } catch (err) {
    next(err);
  }
};