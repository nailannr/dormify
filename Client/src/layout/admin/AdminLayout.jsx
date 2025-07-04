import React, { useState } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const changePass = localStorage.getItem("changePass") === "true";
  const role = localStorage.getItem("role");
  const location = useLocation();

  if (role === "admin" && changePass && location.pathname !== "/admin/profile") {
    return <Navigate to="/admin/profile" />;
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
          <div className="container mx-auto">
            <Outlet/>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

