import axios from './axiosConfig';

export const createPayment = (paymentData) => {
  return axios.post('/payments', paymentData);
};

export const getMyPayments = () => {
  return axios.get('/payments/my'); // This was 404 - now fixed
};

export const getAllPayments = () => {
  return axios.get('/payments');
};

export const createPaymentRequest = (data) => {
  return axios.post('/payments/request', data);
};

export const getMyPaymentRequests = () => {
  return axios.get('/payments/my-requests');
};