import Subscription from './subscription.model.js';

export const createSubscription = (data) => {
  return Subscription.create(data);
};

export const getAllSubscriptions = () => {
  return Subscription.find().populate('userId', 'name email phone').sort({ createdAt: -1 });
};

export const findByUserId = (userId) => {
  return Subscription.find({ userId }).populate('userId', 'name email').sort({ createdAt: -1 });
};

export const findActiveByUser = (userId) => {
  return Subscription.findOne({ 
    userId, 
    status: 'active',
    endDate: { $gte: new Date() }
  });
};

export const findSubscriptionById = (id) => {
  return Subscription.findById(id);
};

export const updateSubscription = (id, data) => {
  return Subscription.findByIdAndUpdate(id, data, { new: true });
};

export const findExpiringSubscriptions = (date) => {
  return Subscription.find({ 
    endDate: { $lte: date, $gte: new Date() },
    status: 'active'
  }).populate('userId', 'name email phone');
};