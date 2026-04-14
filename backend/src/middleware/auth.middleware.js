import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';
import User from '../modules/user/user.model.js';

export const protect = async (req, res, next) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    return next(new AppError('Not authenticated', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    // 🔥 Fetch full user
    const user = await User.findById(decoded.userId);

    if (!user) return next(new AppError('User not found', 404));

    req.user = user; // now includes role

    next();
  } catch (err) {
    return next(new AppError('Invalid token', 401));
  }
};