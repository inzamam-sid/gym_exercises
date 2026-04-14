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

  return user;
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

  return { user, accessToken, refreshToken };
};

export const getMe = async (userId) => {
  return repo.findById(userId);
};

export const refreshTokenService = async (token) => {
  if (!token) throw new AppError('No refresh token', 401);

  const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

  const user = await repo.findById(decoded.userId).select('+refreshToken');

  if (!user || user.refreshToken !== token) {
    throw new AppError('Invalid refresh token', 401);
  }

  return generateAccessToken(user._id);
};