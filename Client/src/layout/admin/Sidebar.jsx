import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ClipboardCheck, 
  ClipboardX, 
  Users, 
  FileUp, 
  MessageSquare, 
  Users2,
  LayoutGrid,
  UserCog
} from 'lucide-react';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const role = localStorage.getItem("role")
  
  const navItems = [
    { name: 'DASHBOARD', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'ADMISSION APPLICATIONS', path: '/admin/admission-applications', icon: <ClipboardCheck size={20} /> },
    { name: 'CANCELLATION APPLICATIONS', path: '/admin/cancellation-applications', icon: <ClipboardX size={20} /> },
    { name: 'ADMITTED STUDENTS', path: '/admin/admitted-students', icon: <Users size={20} /> },
    { name: 'SEAT ALLOTMENT', path: '/admin/seat-allotment', icon: <LayoutGrid size={20} /> },
    { name: 'UPLOAD NOTICE', path: '/admin/upload-notice', icon: <FileUp size={20} /> },
    { name: 'COMPLAINTS', path: '/admin/complaints', icon: <MessageSquare size={20} /> },
    { name: 'PROVOST BODY AND STAFFS', path: '/admin/provost-body-and-staffs', icon: <Users2 size={20} /> },
    ...(role === 'superadmin'
      ? [{ name: 'MONITOR ADMINS', path: '/admin/monitor-admins', icon: <UserCog size={20} /> }]
      : []
    )
    
  ];

  


  return (
    <div className={`md:flex flex-col bg-blue-100 w-64 text-blue-900 border-r border-gray-200 ${sidebarOpen ? 'fixed inset-y-0 left-0 z-50' : 'hidden'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}>
      {/* Close button for mobile */}
      <div className="md:hidden flex justify-end p-4">
        <button
          onClick={() => setSidebarOpen(false)}
          className="text-gray-600 focus:outline-none"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`group flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-150 ease-in-out ${
                // 
                location.pathname === item.path
                ? 'bg-blue-600 text-white'
                : 'text-blue-900 hover:bg-blue-200'
              }`}
              onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
