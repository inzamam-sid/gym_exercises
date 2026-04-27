import axios from './axiosConfig';

export const getAvailablePlans = () => {
  return axios.get('/plans/available');
};

export const purchasePlan = (planId, paymentMethod) => {
  return axios.post('/plans/purchase', { planId, paymentMethod });
};