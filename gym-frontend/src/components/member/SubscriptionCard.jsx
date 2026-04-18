import React from 'react';
import { format, differenceInDays } from 'date-fns';

const SubscriptionCard = ({ subscription }) => {
  if (!subscription) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">My Subscription</h2>
        <p className="text-gray-600">No active subscription</p>
        <button className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
          Purchase Plan
        </button>
      </div>
    );
  }

  const daysLeft = differenceInDays(new Date(subscription.endDate), new Date());

  return (
    <div className="bg-gradient-to-r from-primary-600 to-primary-500 rounded-xl shadow-sm p-6 text-white">
      <h2 className="text-lg font-semibold mb-4">My Subscription</h2>
      <div className="space-y-3">
        <div>
          <p className="text-primary-100 text-sm">Plan</p>
          <p className="text-2xl font-bold">{subscription.plan}</p>
        </div>
        <div>
          <p className="text-primary-100 text-sm">Status</p>
          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-400/20 text-green-100">
            {subscription.status}
          </span>
        </div>
        <div>
          <p className="text-primary-100 text-sm">Days Remaining</p>
          <p className="text-2xl font-bold">{daysLeft} days</p>
        </div>
        <div>
          <p className="text-primary-100 text-sm">Valid Until</p>
          <p>{format(new Date(subscription.endDate), 'MMM dd, yyyy')}</p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCard;