import * as repo from './checkin.repository.js';
import AppError from '../../utils/AppError.js';

export const checkIn = async (userId) => {
  const today = new Date().toISOString().split('T')[0];
  
  // Check if already checked in today
  const existing = await repo.findTodayCheckin(userId, today);
  if (existing) {
    throw new AppError('Already checked in today!', 400);
  }
  
  return repo.createCheckin({ userId, date: today });
};

export const getUserCheckins = async (userId) => {
  return repo.findUserCheckins(userId);
};

export const getMonthlyCheckins = async (userId, month) => {
  return repo.findMonthlyCheckins(userId, month);
};