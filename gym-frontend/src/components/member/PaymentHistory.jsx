import React from 'react';
import { format } from 'date-fns';

const PaymentHistory = ({ payments }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment History</h2>
      <div className="space-y-3">
        {payments.length === 0 ? (
          <p className="text-gray-600 text-center py-4">No payments found</p>
        ) : (
          payments.map((payment) => (
            <div key={payment._id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">${payment.amount}</p>
                <p className="text-sm text-gray-600 capitalize">{payment.method}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  {format(new Date(payment.createdAt), 'MMM dd, yyyy')}
                </p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  payment.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {payment.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;