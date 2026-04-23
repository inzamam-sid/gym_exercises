import React, { useState, useEffect } from 'react';
import { getMySubscriptions } from '../../api/subscriptionAPI';
import { getMyPayments } from '../../api/paymentAPI';
import SubscriptionCard from '../../components/member/SubscriptionCard';
import PaymentHistory from '../../components/member/PaymentHistory';
import CheckInButton from '../../components/member/CheckInButton';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const MemberDashboard = () => {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMemberData();
  }, []);

  const fetchMemberData = async () => {
    try {
      const [subsRes, paymentsRes] = await Promise.all([
        getMySubscriptions(),
        getMyPayments()
      ]);
      setSubscriptions(subsRes.data.data || []);
      setPayments(paymentsRes.data.data || []);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  const activeSubscription = subscriptions.find(s => s.status === 'active');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}!</h1>
        <p className="text-gray-600 mt-1">Track your fitness journey</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SubscriptionCard subscription={activeSubscription} />
          <PaymentHistory payments={payments} />
        </div>
        <div>
          <CheckInButton />
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;