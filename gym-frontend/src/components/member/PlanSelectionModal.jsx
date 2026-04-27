import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import UPIPaymentModal from './UPIPaymentModal';
import toast from 'react-hot-toast';

const PlanSelectionModal = ({ isOpen, onClose, onPurchaseComplete }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const plans = [
    {
      id: 'plan_monthly',
      name: 'Monthly Plan',
      planType: 'Monthly',
      price: 50,
      duration: '30 days',
      features: ['Full gym access', 'Basic classes', 'Locker room access'],
      popular: false,
      color: 'blue'
    },
    {
      id: 'plan_quarterly',
      name: 'Quarterly Plan',
      planType: 'Quarterly',
      price: 135,
      duration: '90 days',
      features: ['Full gym access', 'All classes', 'Locker room access', '1 PT session/month'],
      popular: true,
      color: 'purple',
      savings: 'Save $15'
    },
    {
      id: 'plan_yearly',
      name: 'Yearly Plan',
      planType: 'Yearly',
      price: 480,
      duration: '365 days',
      features: ['Full gym access', 'All classes', 'Locker room access', '4 PT sessions/month', 'Nutrition guide'],
      popular: false,
      color: 'green',
      savings: 'Save $120'
    }
  ];

  const handleProceedToPayment = () => {
    if (!selectedPlan) {
      toast.error('Please select a plan');
      return;
    }
    setShowPaymentModal(true);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
        <div className="bg-white rounded-xl max-w-4xl w-full mx-4 my-8 max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Choose Your Plan</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan)}
                  className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all ${
                    selectedPlan?.id === plan.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary-600 text-white text-xs px-3 py-1 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900">₹{plan.price}</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  {plan.savings && (
                    <p className="text-green-600 text-sm font-medium mb-3">{plan.savings}</p>
                  )}
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className={`text-center text-sm font-medium ${
                    selectedPlan?.id === plan.id ? 'text-primary-600' : 'text-gray-400'
                  }`}>
                    {selectedPlan?.id === plan.id ? '✓ Selected' : 'Click to select'}
                  </div>
                </div>
              ))}
            </div>

            {selectedPlan && (
              <div className="border-t border-gray-200 pt-6">
                <button
                  onClick={handleProceedToPayment}
                  className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
                >
                  Proceed to Payment
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <UPIPaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        plan={selectedPlan}
        onSuccess={onPurchaseComplete}
      />
    </>
  );
};

export default PlanSelectionModal;