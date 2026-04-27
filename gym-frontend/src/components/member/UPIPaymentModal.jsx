import React, { useState } from 'react';
import { XMarkIcon, DocumentDuplicateIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import axios from '../../api/axiosConfig';
import toast from 'react-hot-toast';

const UPIPaymentModal = ({ isOpen, onClose, plan, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [upiTransactionId, setUpiTransactionId] = useState('');
  const [upiReference, setUpiReference] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Add null check for plan
  if (!plan) return null;

  // Generate unique UPI QR data
  const upiQRData = {
    upiId: 'gympro@okhdfcbank',
    name: 'GymPro Fitness',
    amount: plan.price,
    note: `GymPro_${plan.planType}_${Date.now()}`
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!upiTransactionId || !upiReference) {
      toast.error('Please fill all fields');
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.post('/payments/request', {
        plan: plan.planType,
        upiTransactionId,
        upiReference
      });

      if (response.data.success) {
        toast.success('Payment request submitted! Admin will verify soon.');
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(error.response?.data?.message || 'Failed to submit payment request');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">UPI Payment</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Step Indicator */}
          <div className="flex justify-between mb-6">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1 text-center">
                <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center ${
                  step >= s ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step > s ? <CheckCircleIcon className="w-5 h-5" /> : s}
                </div>
                <p className="text-xs mt-1 text-gray-600">
                  {s === 1 ? 'Pay' : s === 2 ? 'Details' : 'Submit'}
                </p>
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-gray-600 mb-2">Scan QR Code to Pay</p>
                <p className="text-2xl font-bold text-primary-600">₹{plan.price}</p>
              </div>

              {/* UPI QR Code (Simulated) */}
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <div className="bg-white p-4 rounded-lg inline-block">
                  <div className="w-48 h-48 bg-gradient-to-br from-primary-600 to-primary-500 flex items-center justify-center text-white text-center rounded">
                    <div>
                      <p className="text-sm font-bold">SCAN ME</p>
                      <p className="text-xs mt-2 break-all">{upiQRData.upiId}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">UPI Details:</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">UPI ID:</span>
                    <div className="flex gap-2">
                      <code className="text-sm">{upiQRData.upiId}</code>
                      <button onClick={() => copyToClipboard(upiQRData.upiId)}>
                        <DocumentDuplicateIcon className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Amount:</span>
                    <span className="font-medium">₹{plan.price}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full bg-primary-600 text-white py-2 rounded-lg font-semibold hover:bg-primary-700"
              >
                I've Made the Payment
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transaction ID / UTR Number *
                </label>
                <input
                  type="text"
                  value={upiTransactionId}
                  onChange={(e) => setUpiTransactionId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter transaction ID from your bank app"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reference Number *
                </label>
                <input
                  type="text"
                  value={upiReference}
                  onChange={(e) => setUpiReference(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter reference number"
                  required
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  ⚠️ Note: After submitting, our admin will verify your payment within 24 hours.
                  Your subscription will be activated once verified.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Submit for Verification'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UPIPaymentModal;