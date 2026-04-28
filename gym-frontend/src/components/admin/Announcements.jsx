import React from 'react';
import { MegaphoneIcon, PlusIcon } from '@heroicons/react/24/outline';

const Announcements = () => {
  const announcements = [
    { title: 'New Equipment Arriving Tomorrow!', date: 'Dec 15, 2024', priority: 'high' },
    { title: 'Gym Closed on Sunday for Maintenance', date: 'Dec 20, 2024', priority: 'medium' },
    { title: 'New Year Special Offer - 30% Off', date: 'Dec 25, 2024', priority: 'low' },
  ];

  const priorityColors = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-green-100 text-green-700'
  };

  return (
    <div className="card-modern p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Announcements</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Important updates</p>
        </div>
        <button className="btn-primary text-sm py-2 flex items-center gap-1">
          <PlusIcon className="w-4 h-4" /> Post
        </button>
      </div>
      
      <div className="space-y-3">
        {announcements.map((announcement, index) => (
          <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-dark-300 rounded-xl">
            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-xl flex items-center justify-center">
              <MegaphoneIcon className="w-5 h-5 text-primary-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 dark:text-white">{announcement.title}</p>
              <p className="text-sm text-gray-500 mt-1">{announcement.date}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[announcement.priority]}`}>
              {announcement.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;