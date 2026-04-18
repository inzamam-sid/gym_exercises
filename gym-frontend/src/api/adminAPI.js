import axios from './axiosConfig';

export const getDashboardStats = () => {
  return axios.get('/admin/dashboard/stats');
};

export const getRevenueData = () => {
  return axios.get('/admin/dashboard/revenue');
};

export const getRecentPayments = () => {
  return axios.get('/admin/dashboard/recent-payments');
};