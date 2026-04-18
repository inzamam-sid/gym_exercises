import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  HomeIcon, 
  CreditCardIcon, 
  UserGroupIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const { user } = useAuth();
  
  const adminMenus = [
    { path: '/admin/dashboard', icon: HomeIcon, label: 'Dashboard' },
    { path: '/admin/members', icon: UserGroupIcon, label: 'Members' },
    { path: '/admin/payments', icon: CreditCardIcon, label: 'Payments' },
    { path: '/admin/reports', icon: ChartBarIcon, label: 'Reports' },
  ];
  
  const memberMenus = [
    { path: '/member/dashboard', icon: HomeIcon, label: 'Dashboard' },
    { path: '/member/subscription', icon: CreditCardIcon, label: 'My Subscription' },
    { path: '/member/payments', icon: ChartBarIcon, label: 'Payments' },
  ];
  
  const menus = user?.role === 'admin' ? adminMenus : memberMenus;

  return (
    <aside className="w-64 bg-white border-r border-gray-200">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary-600">GymPro</h1>
      </div>
      <nav className="px-4 space-y-2">
        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <menu.icon className="w-5 h-5" />
            <span>{menu.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;