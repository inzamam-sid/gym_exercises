import React, { useState, useEffect, useCallback } from 'react';
import { CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import axios from '../../api/axiosConfig';
import toast from 'react-hot-toast';

const PaymentRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [filter, setFilter] = useState('pending');
  const [stats, setStats] = useState({ pending: 0, verified: 0, rejected: 0 });

  const fetchRequests = useCallback(async () => {
    try {
      const response = await axios.get(`/payments/requests?status=${filter}`);
      setRequests(response.data.data.requests);
    } catch (error) {
      toast.error('Failed to load payment requests');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  const fetchStats = useCallback(async () => {
    try {
      const response = await axios.get('/payments/pending-count');
      setStats(prev => ({ ...prev, pending: response.data.data.count }));
    } catch (error) {
      console.error('Failed to fetch stats');
    }
  }, []);

  useEffect(() => {
    fetchRequests();
    fetchStats();
  }, [fetchRequests, fetchStats, filter]);

  const handleVerify = async (id, status) => {
    try {
      await axios.put(`/payments/requests/${id}/verify`, {
        status,
        adminNotes: adminNotes || (status === 'rejected' ? 'Payment verification failed' : null)
      });
      toast.success(`Payment ${status === 'verified' ? 'verified' : 'rejected'} successfully`);
      setSelectedRequest(null);
      setAdminNotes('');
      fetchRequests();
      fetchStats();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Verification failed');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      verified: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Payment Requests</h1>
        <p className="text-gray-600 mt-1">Verify member payments and activate subscriptions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-800">Pending</p>
              <p className="text-2xl font-bold text-yellow-900">{stats.pending}</p>
            </div>
            <ClockIcon className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-800">Verified</p>
              <p className="text-2xl font-bold text-green-900">{stats.verified}</p>
            </div>
            <CheckCircleIcon className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-800">Rejected</p>
              <p className="text-2xl font-bold text-red-900">{stats.rejected}</p>
            </div>
            <XCircleIcon className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {['pending', 'verified', 'rejected', 'all'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 text-sm font-medium transition ${
              filter === tab
                ? 'border-b-2 border-primary-600 text-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {requests.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500">No payment requests found</p>
          </div>
        ) : (
          requests.map((request) => (
            <div key={request._id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{request.userId?.name}</h3>
                  <p className="text-sm text-gray-600">{request.userId?.email}</p>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadge(request.status)}`}>
                  {request.status.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Plan</p>
                  <p className="font-medium">{request.plan}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="font-medium text-primary-600">₹{request.amount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Transaction ID</p>
                  <p className="font-mono text-sm">{request.upiTransactionId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Reference Number</p>
                  <p className="font-mono text-sm">{request.upiReference}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Requested On</p>
                  <p className="text-sm">{new Date(request.createdAt).toLocaleString()}</p>
                </div>
              </div>

              {request.status === 'pending' && (
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => setSelectedRequest(request)}
                    className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700"
                  >
                    Verify Payment
                  </button>
                </div>
              )}

              {request.adminNotes && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700">Admin Notes:</p>
                  <p className="text-sm text-gray-600">{request.adminNotes}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Verification Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-md w-full mx-4 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Verify Payment</h3>
            
            <div className="space-y-3 mb-6">
              <p><span className="font-medium">Member:</span> {selectedRequest.userId?.name}</p>
              <p><span className="font-medium">Plan:</span> {selectedRequest.plan}</p>
              <p><span className="font-medium">Amount:</span> ₹{selectedRequest.amount}</p>
              <p><span className="font-medium">Transaction ID:</span> {selectedRequest.upiTransactionId}</p>
              <p><span className="font-medium">Reference:</span> {selectedRequest.upiReference}</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Admin Notes (Optional)</label>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows="3"
                placeholder="Add any notes about verification..."
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleVerify(selectedRequest._id, 'verified')}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                <CheckCircleIcon className="w-5 h-5 inline mr-2" />
                Verify & Activate
              </button>
              <button
                onClick={() => handleVerify(selectedRequest._id, 'rejected')}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
              >
                <XCircleIcon className="w-5 h-5 inline mr-2" />
                Reject
              </button>
            </div>

            <button
              onClick={() => setSelectedRequest(null)}
              className="w-full mt-3 text-gray-500 hover:text-gray-700 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentRequests;