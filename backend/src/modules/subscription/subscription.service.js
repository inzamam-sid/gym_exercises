import * as repo from './subscription.repository.js';
import AppError from '../../utils/AppError.js';
import { addDays } from 'date-fns';

const getPlanDetails = (plan) => {
  const plans = {
    Monthly: { price: 50, duration: 30 },
    Quarterly: { price: 135, duration: 90 },
    Yearly: { price: 480, duration: 365 }
  };
  return plans[plan];
};

export const createSubscription = async (data) => {
  const existing = await repo.findActiveByUser(data.userId);
  if (existing) {
    throw new AppError('User already has active subscription', 400);
  }
  
  const planDetails = getPlanDetails(data.plan);
  const startDate = data.startDate || new Date();
  const endDate = addDays(startDate, planDetails.duration);
  
  return repo.createSubscription({
    ...data,
    price: planDetails.price,
    startDate,
    endDate,
    status: 'active'
  });
};

export const getAllSubscriptions = async () => {
  return repo.getAllSubscriptions();
};

export const getUserSubscriptions = async (userId) => {
  const subscriptions = await repo.findByUserId(userId);
  console.log(`Found ${subscriptions.length} subscriptions for user ${userId}`);
  
  // Log each subscription for debugging
  subscriptions.forEach(sub => {
    console.log(`- ${sub.plan}: ${sub.status}, ends: ${sub.endDate}`);
  });
  
  return subscriptions;
};

export const cancelSubscription = async (id) => {
  const subscription = await repo.updateSubscription(id, {
    status: 'cancelled',
    cancelledAt: new Date()
  });
  if (!subscription) throw new AppError('Subscription not found', 404);
  return subscription;
};

export const renewSubscription = async (id) => {
  const oldSubscription = await repo.findSubscriptionById(id);
  if (!oldSubscription) throw new AppError('Subscription not found', 404);
  
  const planDetails = getPlanDetails(oldSubscription.plan);
  const newEndDate = addDays(new Date(), planDetails.duration);
  
  return repo.updateSubscription(id, {
    endDate: newEndDate,
    status: 'active',
    startDate: new Date()
  });
};

export const getExpiringSubscriptions = async () => {
  const sevenDaysFromNow = addDays(new Date(), 7);
  return repo.findExpiringSubscriptions(sevenDaysFromNow);
};