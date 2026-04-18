import React from 'react';
import { format } from 'date-fns';

const RecentPaymentsTable = ({ payments }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Payments</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="text-left py-3 text-sm font-medium text-gray-600">Member</th>
              <th className="text-left py-3 text-sm font-medium text-gray-600">Amount</th>
              <th className="text-left py-3 text-sm font-medium text-gray-600">Method</th>
              <th className="text-left py-3 text-sm font-medium text-gray-600">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">No payments found</td>
              </tr>
            ) : (
              payments.map((payment) => (
                <tr key={payment._id} className="border-b border-gray-100">
                  <td className="py-3 text-gray-900">{payment.userId?.name || 'N/A'}</td>
                  <td className="py-3 text-gray-900">${payment.amount}</td>
                  <td className="py-3">
                    <span className="capitalize">{payment.method}</span>
                  </td>
                  <td className="py-3 text-gray-600">
                    {format(new Date(payment.createdAt), 'MMM dd, yyyy')}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentPaymentsTable;