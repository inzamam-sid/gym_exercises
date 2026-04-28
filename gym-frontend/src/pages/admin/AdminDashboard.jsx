import React, { useState, useEffect } from 'react';
import { 
  UsersIcon, 
  UserGroupIcon, 
  CurrencyDollarIcon, 
  ExclamationTriangleIcon,
  MegaphoneIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { getDashboardStats } from '../../api/adminAPI';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const statsRes = await getDashboardStats();
      setStats(statsRes.data.data);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-96">Loading...</div>;
  }

  const members = [
    { name: 'Alex Wilson', plan: 'Pro Plan', status: 'Active', email: 'alex@email.com' },
    { name: 'Sophie Roberts', plan: 'Basic Plan', status: 'Active', email: 'sophie@email.com' },
    { name: 'Michael Chen', plan: 'Pro Plan', status: 'Active', email: 'michael@email.com' },
  ];

  const classes = [
    { name: 'HIIT Training', time: '6:00 PM', instructor: 'Menocinas', spots: 12 },
    { name: 'Yoga Session', time: '7:00 PM', instructor: 'Yoga Session', spots: 8 },
  ];

  const announcements = [
    'New Equipment Arriving Tomorrow!',
    'Gym Closed on Sunday for Maintenance'
  ];

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome, John!</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Members</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalUsers || 0}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <UsersIcon className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Subscriptions</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.activeSubscriptions || 0}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <UserGroupIcon className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Revenue This Month</p>
              <p className="text-2xl font-bold text-gray-900">${stats?.totalRevenue?.toLocaleString() || 0}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <CurrencyDollarIcon className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Payments</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.pendingPayments || 0}</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <ExclamationTriangleIcon className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Member Overview and Class Schedule Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Member Overview Table - Takes 2/3 */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Member Overview</h2>
              <button className="text-blue-600 text-sm hover:text-blue-700">View All &gt;</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Name</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Plan</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Status</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-6">
                      <div>
                        <p className="font-medium text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-gray-700">{member.plan}</td>
                    <td className="py-3 px-6">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                        {member.status}
                      </span>
                    </td>
                    <td className="py-3 px-6">
                      <button className="text-gray-400 hover:text-gray-600">...</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Class Schedule - Takes 1/3 */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Class Schedule</h2>
              <button className="text-blue-600 text-sm hover:text-blue-700">Manage Classes &gt;</button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {classes.map((classItem, idx) => (
              <div key={idx} className="border-b border-gray-100 pb-4 last:border-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{classItem.name}</h3>
                    <p className="text-sm text-gray-500">{classItem.instructor} • {classItem.time}</p>
                  </div>
                  <span className="text-sm text-gray-500">{classItem.spots} spots left</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Announcements and Reports Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Announcements */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Announcements</h2>
              <button className="text-blue-600 text-sm hover:text-blue-700">Post Announcement &gt;</button>
            </div>
          </div>
          <div className="p-6 space-y-3">
            {announcements.map((announcement, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <MegaphoneIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                <p className="text-gray-700">{announcement}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reports */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Reports</h2>
              <ChartBarIcon className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;








