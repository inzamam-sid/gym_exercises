import React, { useState, useEffect } from 'react';
import { getMySubscriptions } from '../../api/subscriptionAPI';
import { getMyPayments } from '../../api/paymentAPI';
import toast from 'react-hot-toast';

const MemberDashboard = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMemberData();
  }, []);

  const fetchMemberData = async () => {
    try {
      const [subsRes] = await Promise.all([
        getMySubscriptions(),
        getMyPayments()
      ]);
      setSubscriptions(subsRes.data.data || []);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;

  const activeSubscription = subscriptions.find(s => s.status === 'active');

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Member Dashboard</h1>
      </div>

      {/* My Plan Card */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg shadow-lg p-6 mb-6 text-white">
        <h2 className="text-xl font-semibold mb-4">My Plan</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-blue-100 text-sm">Pro Membership</p>
            <p className="text-2xl font-bold mt-1">28 Days</p>
            <p className="text-blue-100 text-xs">Days Left</p>
          </div>
          <div>
            <p className="text-blue-100 text-sm">Check-ins This Month</p>
            <p className="text-2xl font-bold mt-1">12</p>
            <p className="text-blue-100 text-xs">Visits</p>
          </div>
          <div>
            <p className="text-blue-100 text-sm">Next Payment Due</p>
            <p className="text-2xl font-bold mt-1">May 15</p>
            <p className="text-blue-100 text-xs">2024</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subscription Status */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Subscription Status</h2>
          {activeSubscription ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-500">Current Plan</p>
                  <p className="text-xl font-bold text-gray-900">{activeSubscription.plan}</p>
                </div>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                  Active
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">Renews on {new Date(activeSubscription.endDate).toLocaleDateString()}</p>
              <div className="flex gap-3">
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Renew</button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Upgrade</button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No active subscription</p>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Purchase Plan</button>
            </div>
          )}
        </div>

        {/* Workout Progress */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Workout Progress</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">Workouts This Week</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Calories Burned</p>
              <p className="text-2xl font-bold text-gray-900">2,450 kcal</p>
            </div>
          </div>
          <div className="flex justify-around mt-4">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
              <div key={i} className="text-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  i < 5 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {day}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Class Bookings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Class Bookings</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">Upcoming Spin Class</p>
                <p className="text-sm text-gray-500">April 25, 6:00 PM</p>
              </div>
              <button className="text-blue-600 text-sm">Book</button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">Yoga Session</p>
                <p className="text-sm text-gray-500">April 28, 7:30 PM</p>
              </div>
              <button className="text-blue-600 text-sm">Book</button>
            </div>
          </div>
        </div>

        {/* Health Tips */}
        <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-lg shadow p-6 text-white">
          <h2 className="text-lg font-semibold mb-3">Health Tips & Guides</h2>
          <p className="text-green-100 text-sm">Stay hydrated! Drink at least 8 glasses of water daily for optimal performance.</p>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;

