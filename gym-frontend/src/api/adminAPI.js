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

// Add to adminAPI.js
export const getMembers = () => axios.get('/admin/members');
export const createMember = (data) => axios.post('/admin/members', data);
export const updateMember = (id, data) => axios.put(`/admin/members/${id}`, data);
export const deleteMember = (id) => axios.delete(`/admin/members/${id}`);