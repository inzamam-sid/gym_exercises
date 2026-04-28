import React from 'react';
import { ClockIcon, UserGroupIcon, PlusIcon } from '@heroicons/react/24/outline';

const ClassSchedule = () => {
  const classes = [
    { name: 'HIIT Training', time: '6:00 PM', instructor: 'Sarah Johnson', spots: 12, total: 20, color: 'orange' },
    { name: 'Yoga Session', time: '7:00 PM', instructor: 'Mike Ross', spots: 8, total: 25, color: 'green' },
    { name: 'Spin Class', time: '8:00 PM', instructor: 'Emma Wilson', spots: 15, total: 20, color: 'blue' },
  ];

  const colorClasses = {
    orange: 'bg-orange-100 text-orange-700',
    green: 'bg-green-100 text-green-700',
    blue: 'bg-blue-100 text-blue-700'
  };

  return (
    <div className="card-modern p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Class Schedule</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Today's classes</p>
        </div>
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1">
          <PlusIcon className="w-4 h-4" /> Manage
        </button>
      </div>
      
      <div className="space-y-4">
        {classes.map((classItem, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-300 rounded-xl hover:shadow-md transition">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white">{classItem.name}</h3>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                  <ClockIcon className="w-4 h-4" />
                  <span>{classItem.time}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                  <UserGroupIcon className="w-4 h-4" />
                  <span>{classItem.instructor}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${colorClasses[classItem.color]}`}>
                {classItem.spots} spots left
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassSchedule;