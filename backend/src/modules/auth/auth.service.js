import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as repo from './auth.repository.js';
import AppError from '../../utils/AppError.js';
import {
  generateAccessToken,
  generateRefreshToken
} from '../../utils/generateToken.js';

export const registerUser = async ({ name, email, password }) => {
  const existing = await repo.findByEmail(email);

  if (existing) throw new AppError('Email already exists', 400);

  const user = await repo.createUser({ name, email, password });

  // Don't send password back
  const userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;
  
  return userWithoutPassword;
};

export const loginUser = async ({ email, password }) => {
  const user = await repo.findByEmail(email);

  if (!user) throw new AppError('Invalid credentials', 401);

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new AppError('Invalid credentials', 401);

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await repo.saveUser(user);

  // Don't send password back
  const userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;
  delete userWithoutPassword.refreshToken;

  return { user: userWithoutPassword, accessToken, refreshToken };
};

export const getMe = async (userId) => {
  const user = await repo.findById(userId);
  
  if (!user) throw new AppError('User not found', 404);
  
  // Don't send password or refresh token
  const userWithoutSensitive = user.toObject();
  delete userWithoutSensitive.password;
  delete userWithoutSensitive.refreshToken;
  
  return userWithoutSensitive;
};

export const refreshTokenService = async (token) => {
  if (!token) throw new AppError('No refresh token', 401);

  const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

  const user = await repo.findById(decoded.userId);

  if (!user || user.refreshToken !== token) {
    throw new AppError('Invalid refresh token', 401);
  }

  return generateAccessToken(user._id);
};