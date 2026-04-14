import * as repo from './subscription.repository.js';
import AppError from '../../utils/AppError.js';

export const createSubscription = async (data) => {
  const existing = await repo.findActiveByUser(data.userId);

  if (existing) {
    throw new AppError('User already has active subscription', 400);
  }

  return repo.createSubscription(data);
};

export const getUserSubscriptions = async (userId) => {
  return repo.findByUserId(userId);
};

export const cancelSubscription = async (id) => {
  return repo.updateSubscription(id, {
    status: 'cancelled',
    cancelledAt: new Date()
  });
};