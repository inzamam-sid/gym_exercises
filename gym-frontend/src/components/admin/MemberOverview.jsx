import React from 'react';
import { EllipsisVerticalIcon, EyeIcon } from '@heroicons/react/24/outline';

const MemberOverview = () => {
  const members = [
    { id: 1, name: 'Alex Wilson', plan: 'Pro Plan', status: 'Active', email: 'alex@email.com', avatar: 'AW' },
    { id: 2, name: 'Sophie Roberts', plan: 'Basic Plan', status: 'Active', email: 'sophie@email.com', avatar: 'SR' },
    { id: 3, name: 'Michael Chen', plan: 'Pro Plan', status: 'Active', email: 'michael@email.com', avatar: 'MC' },
    { id: 4, name: 'Emma Davis', plan: 'Premium Plan', status: 'Expired', email: 'emma@email.com', avatar: 'ED' },
  ];

  const getStatusColor = (status) => {
    return status === 'Active' 
      ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
      : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
  };

  const getPlanColor = (plan) => {
    const colors = {
      'Basic Plan': 'bg-gray-100 text-gray-700',
      'Pro Plan': 'bg-blue-100 text-blue-700',
      'Premium Plan': 'bg-purple-100 text-purple-700'
    };
    return colors[plan] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="card-modern p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Member Overview</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Recent members activity</p>
        </div>
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1">
          View All <EyeIcon className="w-4 h-4" />
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-200 dark:border-dark-300">
            <tr>
              <th className="text-left py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Member</th>
              <th className="text-left py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Plan</th>
              <th className="text-left py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
              <th className="text-left py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id} className="border-b border-gray-100 dark:border-dark-300 hover:bg-gray-50 dark:hover:bg-dark-300 transition">
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white font-semibold">
                      {member.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{member.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{member.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-lg ${getPlanColor(member.plan)}`}>
                    {member.plan}
                  </span>
                </td>
                <td className="py-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(member.status)}`}>
                    {member.status}
                  </span>
                </td>
                <td className="py-3">
                  <button className="text-gray-400 hover:text-gray-600 transition">
                    <EllipsisVerticalIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberOverview;