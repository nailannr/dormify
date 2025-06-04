import React from 'react';
import { Search, Filter, MessageSquare, AlertCircle } from 'lucide-react';

const Complaints: React.FC = () => {
  // Sample complaints data
  const complaints = [
    { 
      id: 'COM001', 
      student: 'Tasnim Ahmed', 
      regNo: '2019331051', 
      room: 'B-101', 
      subject: 'Water Supply Issue', 
      description: 'No water supply in bathroom for the last 2 days',
      date: '2023-05-15', 
      status: 'Pending',
      priority: 'High' 
    },
    { 
      id: 'COM002', 
      student: 'Sabrina Hossain', 
      regNo: '2019331062', 
      room: 'B-102', 
      subject: 'Electrical Problem', 
      description: 'Power outlet in room not working properly',
      date: '2023-05-14', 
      status: 'In Progress',
      priority: 'Medium' 
    },
    { 
      id: 'COM003', 
      student: 'Fariha Khan', 
      regNo: '2019331045', 
      room: 'B-103', 
      subject: 'Furniture Repair', 
      description: 'Chair in room is broken and needs replacement',
      date: '2023-05-12', 
      status: 'Resolved',
      priority: 'Low' 
    },
    { 
      id: 'COM004', 
      student: 'Nusrat Jahan', 
      regNo: '2020331028', 
      room: 'B-201', 
      subject: 'Internet Connectivity', 
      description: 'WiFi signal is very weak in our room',
      date: '2023-05-10', 
      status: 'Pending',
      priority: 'Medium' 
    },
    { 
      id: 'COM005', 
      student: 'Ayesha Rahman', 
      regNo: '2020331035', 
      room: 'B-202', 
      subject: 'Security Concern', 
      description: 'Main door lock is not working properly',
      date: '2023-05-08', 
      status: 'In Progress',
      priority: 'High' 
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h2 className="text-2xl font-bold text-gray-800">Complaints</h2>
      </div>

      {/* Filters and Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search complaints..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div>
          <div className="relative">
            <Filter size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white">
              <option value="">Filter by Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
        <div>
          <div className="relative">
            <AlertCircle size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white">
              <option value="">Filter by Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-700">Pending</p>
              <p className="text-2xl font-bold text-red-800">2</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <AlertCircle size={24} className="text-red-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-amber-700">In Progress</p>
              <p className="text-2xl font-bold text-amber-800">2</p>
            </div>
            <div className="bg-amber-100 p-3 rounded-full">
              <MessageSquare size={24} className="text-amber-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-700">Resolved</p>
              <p className="text-2xl font-bold text-green-800">1</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <MessageSquare size={24} className="text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Complaints List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Complaint ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {complaints.map((complaint) => (
                <tr key={complaint.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {complaint.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{complaint.student}</div>
                    <div className="text-xs text-gray-500">{complaint.regNo}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {complaint.room}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{complaint.subject}</div>
                    <div className="text-xs text-gray-500 max-w-xs truncate">{complaint.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(complaint.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      complaint.priority === 'High' 
                        ? 'bg-red-100 text-red-800' 
                        : complaint.priority === 'Medium'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {complaint.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      complaint.status === 'Resolved' 
                        ? 'bg-green-100 text-green-800' 
                        : complaint.status === 'In Progress'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {complaint.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    {complaint.status !== 'Resolved' && (
                      <button className="text-green-600 hover:text-green-900">
                        {complaint.status === 'Pending' ? 'Process' : 'Resolve'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">5</span> results
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-400 cursor-not-allowed">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-400 cursor-not-allowed">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complaints;