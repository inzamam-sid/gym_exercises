import Payment from './payment.model.js';

export const createPayment = (data) => Payment.create(data);

export const getUserPayments = (userId) => {
  return Payment.find({ userId }).sort({ createdAt: -1 });
};

export const getAllPayments = () => {
  return Payment.find().populate('userId', 'name email');
};