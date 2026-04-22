import axios from './axiosConfig';

export const createSubscription = (subscriptionData) => {
  return axios.post('/subscriptions', subscriptionData);
};

export const getMySubscriptions = () => {
  return axios.get('/subscriptions/my');
};

export const cancelSubscription = (id) => {
  return axios.put(`/subscriptions/${id}/cancel`);
};

// Add to subscriptionAPI.js
export const getAllSubscriptions = () => axios.get('/admin/subscriptions');
export const updateSubscription = (id, data) => axios.put(`/admin/subscriptions/${id}`, data);