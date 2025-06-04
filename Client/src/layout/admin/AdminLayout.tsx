import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from '../../pages/admin/Dashboard';
import AdmissionApplications from '../../pages/admin/AdmissionApplications';
import CancellationApplications from '../../pages/admin/CancellationApplication';
import AdmittedStudents from '../../pages/admin/AdmittedStudents';
import SeatAllotment from '../../pages/admin/SeatAllotments';
import UploadNotice from '../../pages/admin/UploadNotice';
import Complaints from '../../pages/admin/Complaints';
import Profile from '../../pages/admin/Profile';
import ProvostBodyAndStaffs from '../../pages/admin/ProvostBodyAndStuffs'

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
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
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/admission-applications" element={<AdmissionApplications />} />
              <Route path="/cancellation-applications" element={<CancellationApplications />} />
              <Route path="/admitted-students" element={<AdmittedStudents />} />
              <Route path="/seat-allotment" element={<SeatAllotment />} />
              <Route path="/upload-notice" element={<UploadNotice />} />
              <Route path="/complaints" element={<Complaints />} />
              <Route path="/provost-body-and-staffs" element={<ProvostBodyAndStaffs />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;