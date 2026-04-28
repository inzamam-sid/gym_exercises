import React from 'react';
import { format } from 'date-fns';
import { EyeIcon } from '@heroicons/react/24/outline';

const RecentPaymentsTable = ({ payments }) => {
  return (
    <div className="card-modern p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Payments</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Latest transactions</p>
        </div>
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">View All →</button>
      </div>
      <div className="space-y-3">
        {payments.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No payments yet</p>
        ) : (
          payments.map((payment) => (
            <div key={payment._id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-300 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                  <span className="text-green-600 font-bold">$</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{payment.userId?.name || 'Unknown'}</p>
                  <p className="text-sm text-gray-500 capitalize">{payment.method}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900 dark:text-white">${payment.amount}</p>
                <p className="text-xs text-gray-500">
                  {format(new Date(payment.createdAt), 'MMM dd, yyyy')}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentPaymentsTable;