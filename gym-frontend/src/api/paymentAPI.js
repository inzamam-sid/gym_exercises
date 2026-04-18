import axios from './axiosConfig';

export const createPayment = (paymentData) => {
  return axios.post('/payments', paymentData);
};

export const getMyPayments = () => {
  return axios.get('/payments/my');
};

export const getAllPayments = () => {
  return axios.get('/payments');
};