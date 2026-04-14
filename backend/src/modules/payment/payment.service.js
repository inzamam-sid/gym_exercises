import * as repo from './payment.repository.js';

export const createPayment = async (data) => {
  return repo.createPayment(data);
};

export const getMyPayments = async (userId) => {
  return repo.getUserPayments(userId);
};

export const getAllPayments = async () => {
  return repo.getAllPayments();
};