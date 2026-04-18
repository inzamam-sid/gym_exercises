import React, { useState, useEffect } from 'react';
import { getDashboardStats, getRevenueData, getRecentPayments } from '../../api/adminAPI';
import StatsCard from '../../components/admin/StatsCard';
import RevenueChart from '../../components/admin/RevenueChart';
import RecentPaymentsTable from '../../components/admin/RecentPaymentsTable';
import { UsersIcon, UserGroupIcon, CurrencyDollarIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [revenueData, setRevenueData] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, revenueRes, paymentsRes] = await Promise.all([
        getDashboardStats(),
        getRevenueData(),
        getRecentPayments()
      ]);
      
      setStats(statsRes.data.data);
      setRevenueData(revenueRes.data.data || []);
      setRecentPayments(paymentsRes.data.data || []);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  const statCards = [
    { title: 'Total Members', value: stats?.totalUsers || 0, icon: UsersIcon, color: 'blue' },
    { title: 'Active Subscriptions', value: stats?.activeSubscriptions || 0, icon: UserGroupIcon, color: 'green' },
    { title: 'Total Revenue', value: `$${stats?.totalRevenue?.toLocaleString() || 0}`, icon: CurrencyDollarIcon, color: 'purple' },
    { title: 'Pending Payments', value: stats?.pendingPayments || 0, icon: ExclamationTriangleIcon, color: 'orange' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <StatsCard key={idx} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={revenueData} />
        <RecentPaymentsTable payments={recentPayments} />
      </div>
    </div>
  );
};

export default AdminDashboard;