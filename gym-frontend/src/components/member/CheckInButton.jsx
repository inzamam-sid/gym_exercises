import React, { useState, useEffect } from 'react';
import { FingerPrintIcon, CalendarIcon } from '@heroicons/react/24/outline';
import axios from '../../api/axiosConfig';
import toast from 'react-hot-toast';

const CheckInButton = () => {
  const [checkedInToday, setCheckedInToday] = useState(false);
  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCheckins();
  }, []);

  const fetchCheckins = async () => {
    try {
      const response = await axios.get('/checkins/my');
      setCheckins(response.data.data);
      
      const today = new Date().toISOString().split('T')[0];
      const checkedToday = response.data.data.some(c => c.date === today);
      setCheckedInToday(checkedToday);
    } catch (error) {
      console.error('Failed to fetch checkins');
    }
  };

  const handleCheckIn = async () => {
    setLoading(true);
    try {
      await axios.post('/checkins');
      toast.success('Checked in successfully! 🎉');
      fetchCheckins();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Check-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Daily Check-in</h2>
      
      <button
        onClick={handleCheckIn}
        disabled={checkedInToday || loading}
        className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 transition ${
          checkedInToday
            ? 'bg-green-100 text-green-700 cursor-not-allowed'
            : 'bg-primary-600 text-white hover:bg-primary-700'
        }`}
      >
        <FingerPrintIcon className="w-5 h-5" />
        {loading ? 'Checking in...' : checkedInToday ? 'Checked In Today ✓' : 'Check In Now'}
      </button>

      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Recent Check-ins</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {checkins.slice(0, 10).map((checkin) => (
            <div key={checkin._id} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">
                  {new Date(checkin.checkinTime).toLocaleDateString()}
                </span>
              </div>
              <span className="text-gray-400">
                {new Date(checkin.checkinTime).toLocaleTimeString()}
              </span>
            </div>
          ))}
          {checkins.length === 0 && (
            <p className="text-gray-500 text-sm text-center py-4">No check-ins yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckInButton;