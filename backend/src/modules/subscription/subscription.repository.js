import Subscription from './subscription.model.js';

export const createSubscription = (data) => {
  return Subscription.create(data);
};

export const findByUserId = (userId) => {
  return Subscription.find({ userId });
};

export const findActiveByUser = (userId) => {
  return Subscription.findOne({
    userId,
    status: 'active'
  });
};

export const updateSubscription = (id, data) => {
  return Subscription.findByIdAndUpdate(id, data, { new: true });
};