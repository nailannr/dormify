import React, { useEffect, useState } from 'react';
import { Users, ClipboardCheck, AlertCircle } from 'lucide-react';
import API from '../../api';

const Dashboard = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [newApplications, setNewApplications] = useState(0);
  const [pendingComplaints, setPendingComplaints] = useState(0);
  const [occupied, setOccupied] = useState(0);
  const [totalSeats, setTotalSeats] = useState(0);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      try {
        //to fetch all seats (total + occupied)
        const seatRes = await API.get('/seat', { headers });
        const seats = seatRes.data || [];

        const total = seats.length;
        const occupiedSeats = seats.filter(seat => seat.status === 'occupied').length;
        setTotalSeats(total);
        setOccupied(occupiedSeats);
        setTotalStudents(occupiedSeats);

        //to fetch new applications
        const appRes = await API.get('/application', { headers });
        const pendingApps = appRes.data.applications.filter(app => app.status === 'pending');
        setNewApplications(pendingApps.length);

        //to fetch complaints summary
        const complaintRes = await API.get('/complaint/admin', { headers });
        setPendingComplaints(complaintRes.data?.summary?.pending || 0);
      } catch (err) {
        console.error('Failed to fetch dashboard stats:', err);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-sm text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg shadow-sm p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{totalStudents}</p>
            </div>
            <div className="p-2 rounded-full bg-white shadow-sm">
              <Users size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg shadow-sm p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">New Applications</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{newApplications}</p>
            </div>
            <div className="p-2 rounded-full bg-white shadow-sm">
              <ClipboardCheck size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg shadow-sm p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Complaints</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{pendingComplaints}</p>
            </div>
            <div className="p-2 rounded-full bg-white shadow-sm">
              <AlertCircle size={24} className="text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Hall Occupancy */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Hall Occupancy</h3>
        <div className="h-10 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full"
            style={{ width: totalSeats > 0 ? `${(occupied / totalSeats) * 100}%` : '0%' }}
          ></div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-sm text-gray-600">Total Capacity: {totalSeats}</span>
          <span className="text-sm font-medium text-blue-600">
            {Math.round((occupied / totalSeats) * 100)}% Occupied
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
