

// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { useAuth } from '../../hooks/useAuth';
// import { 
//   HomeIcon, 
//   CreditCardIcon, 
//   UserGroupIcon,
//   ChartBarIcon
// } from '@heroicons/react/24/outline';

// const Sidebar = () => {
//   const { user } = useAuth();
  
//   const adminMenus = [
//     { path: '/admin/dashboard', icon: HomeIcon, label: 'Dashboard' },
//     { path: '/admin/members', icon: UserGroupIcon, label: 'Members' },
//     { path: '/admin/payments', icon: CreditCardIcon, label: 'Payments' },
//     { path: '/admin/reports', icon: ChartBarIcon, label: 'Reports' },
//     { path: '/admin/payment-requests', icon: CreditCardIcon, label: 'Payment Requests' },
// { path: '/admin/payments', icon: CreditCardIcon, label: 'Payment Requests' }
//   ];
  
//   const memberMenus = [
//     { path: '/member/dashboard', icon: HomeIcon, label: 'Dashboard' },
//     { path: '/member/subscription', icon: CreditCardIcon, label: 'My Subscription' },
//     { path: '/member/payments', icon: ChartBarIcon, label: 'Payments' },
//   ];
  
//   const menus = user?.role === 'admin' ? adminMenus : memberMenus;

//   return (
//     <aside className="w-64 bg-white border-r border-gray-200">
//       <div className="p-6">
//         <h1 className="text-2xl font-bold text-primary-600">GymPro</h1>
//       </div>
//       <nav className="px-4 space-y-2">
//         {menus.map((menu) => (
//           <NavLink
//             key={menu.path}
//             to={menu.path}
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
//                 isActive
//                   ? 'bg-primary-50 text-primary-600'
//                   : 'text-gray-700 hover:bg-gray-100'
//               }`
//             }
//           >
//             <menu.icon className="w-5 h-5" />
//             <span>{menu.label}</span>
//           </NavLink>
//         ))}
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;







import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  HomeIcon, 
  UserGroupIcon, 
  CreditCardIcon,
  ChartBarIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const { user, logout } = useAuth();

  const adminMenus = [
    { path: '/admin/dashboard', icon: HomeIcon, label: 'Dashboard', id: 'dashboard' },
    { path: '/admin/members', icon: UserGroupIcon, label: 'Members', id: 'members' },
    { path: '/admin/payments', icon: CreditCardIcon, label: 'Payments', id: 'payments' },
    { path: '/admin/reports', icon: ChartBarIcon, label: 'Reports', id: 'reports' },
  ];

  const memberMenus = [
    { path: '/member/dashboard', icon: HomeIcon, label: 'Dashboard', id: 'member-dashboard' },
    { path: '/member/subscription', icon: CreditCardIcon, label: 'Subscription', id: 'subscription' },
    { path: '/member/payments', icon: CreditCardIcon, label: 'Payments', id: 'member-payments' },
  ];

  const menus = user?.role === 'admin' ? adminMenus : memberMenus;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900">GYMTRACK</h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {menus.map((menu) => (
          <NavLink
            key={menu.id}
            to={menu.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <menu.icon className="w-5 h-5" />
            <span>{menu.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-2 w-full text-red-600 hover:bg-red-50 rounded-lg transition"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;