import React, { useState } from 'react';
import { format, differenceInDays } from 'date-fns';
import { CreditCardIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import PlanSelectionModal from './PlanSelectionModal';

const SubscriptionCard = ({ subscription, onRefresh }) => {
  const [showPlanModal, setShowPlanModal] = useState(false);

  if (!subscription) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">My Subscription</h2>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCardIcon className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-600 mb-4">No active subscription</p>
          <button
            onClick={() => setShowPlanModal(true)}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
          >
            Purchase Plan
          </button>
        </div>
        
        <PlanSelectionModal
          isOpen={showPlanModal}
          onClose={() => setShowPlanModal(false)}
          onPurchaseComplete={onRefresh}
        />
      </div>
    );
  }

  const daysLeft = differenceInDays(new Date(subscription.endDate), new Date());
  const progress = ((subscription.price === 50 ? 30 : subscription.price === 135 ? 90 : 365) - daysLeft) / 
                   (subscription.price === 50 ? 30 : subscription.price === 135 ? 90 : 365) * 100;

  return (
    <div className="bg-gradient-to-r from-primary-600 to-primary-500 rounded-xl shadow-sm p-6 text-white">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg font-semibold">My Subscription</h2>
        <button
          onClick={() => setShowPlanModal(true)}
          className="text-sm bg-white/20 px-3 py-1 rounded-lg hover:bg-white/30 transition"
        >
          Upgrade
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-primary-100 text-sm">Current Plan</p>
          <p className="text-2xl font-bold">{subscription.plan}</p>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Days Remaining</span>
            <span className="font-semibold">{daysLeft} days</span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div>
            <p className="text-primary-100 text-sm">Valid From</p>
            <p className="font-semibold">{format(new Date(subscription.startDate), 'MMM dd, yyyy')}</p>
          </div>
          <div>
            <p className="text-primary-100 text-sm">Valid Until</p>
            <p className="font-semibold">{format(new Date(subscription.endDate), 'MMM dd, yyyy')}</p>
          </div>
        </div>
        
        <div className="pt-2">
          <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
            subscription.status === 'active' ? 'bg-green-400/20 text-green-100' : 'bg-red-400/20 text-red-100'
          }`}>
            {subscription.status.toUpperCase()}
          </span>
        </div>
      </div>

      <PlanSelectionModal
        isOpen={showPlanModal}
        onClose={() => setShowPlanModal(false)}
        onPurchaseComplete={onRefresh}
      />
    </div>
  );
};

export default SubscriptionCard;