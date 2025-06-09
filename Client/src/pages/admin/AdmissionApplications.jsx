import React, {useEffect, useState} from 'react';
import { Search, Filter, ArrowDownUp, Download, X } from 'lucide-react';
import API from '../../api'

const AdmissionApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedApp, setSelectedApp] = useState(null);


  const formatAppId = (mongoId) => 'APP' + mongoId.slice(-6).toUpperCase();

  useEffect(() => {
    fetchApplications();
  }, [currentPage]);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await API.get(`/application?page=${currentPage}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplications(res.data.applications);
      setTotalPages(res.data.totalPages)
    } catch (err) {
      console.error('Failed to fetch applications:', err);
    }
  };

  useEffect(() => {
    let data = [...applications];

    if (searchTerm) {
      data = data.filter(app =>
        app.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.regNo?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      data = data.filter(app => app.status === statusFilter);
    }

    if (sortBy === 'name') {
      data.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'newest') {
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'oldest') {
      data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    setFiltered(data);
  }, [applications, searchTerm, statusFilter, sortBy]);

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await API.patch(`/applications/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplications(prev =>
        prev.map(app => app._id === id ? { ...app, status } : app)
      );
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const exportCSV = () => {
    const headers = 'Name,Reg No,Dept,Date,Status\n';
    const rows = applications.map(app =>
      `${app.name},${app.regNo},${app.department},${new Date(app.createdAt).toLocaleDateString()},${app.status}`
    );
    const csv = headers + rows.join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'applications.csv';
    a.click();
  };  

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleView = (application) => {
    setSelectedApplication(application);
    setShowModal(true);
  };


  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h2 className="text-2xl font-bold text-gray-800">Admission Applications</h2>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <button 
          onClick={exportCSV}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center">
            <Download size={16} className="mr-1" />
            Export
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1 md:col-span-2">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search applications..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div>
          <div className="relative">
            <Filter size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select onChange={e => setStatusFilter(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white">
              <option value="">Filter by Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
        <div>
          <div className="relative">
            <ArrowDownUp size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select onChange={e => setSortBy(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white">
              <option value="">Sort by</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied On</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filtered.map((application) => (
                <tr key={application._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{formatAppId(application._id)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{application.userId?.name || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.regNo || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(application.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      application.status === 'Approved' 
                        ? 'bg-green-100 text-green-800' 
                        : application.status === 'Rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {application.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={()=> setSelectedApp(application)} className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    {application.status === 'pending' && (
                      <>
                        <button onClick={() => updateStatus(application._id, 'approved')} className="text-green-600 hover:text-green-900 mr-3">Approve</button>
                        <button onClick={() => updateStatus(application._id, 'rejected')} className="text-red-600 hover:text-red-900">Reject</button>
                      </>
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
            Showing <span className="font-medium">Page {currentPage} of {totalPages}</span> results
          </div>
          <div className="flex space-x-2">
            <button 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-700 hover:bg-gray-50">
              Previous
            </button>
            <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
            {/* <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-700 hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-700 hover:bg-gray-50">
              3
            </button> */}
            <button 
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative">
            <button className="absolute top-2 right-2 text-gray-600" onClick={() => setSelectedApp(null)}>
              <X />
            </button>
            <h3 className="text-xl font-bold mb-4">Application Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {Object.entries(selectedApp).map(([key, value]) => (
                key !== '__v' && key !== '_id' && key !== 'photo' && (
                  <div key={key}>
                    <strong className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</strong> {value}
                  </div>
                )
              ))}
              {selectedApp.photo && (
                <div className="col-span-2">
                  <strong>Photo:</strong><br />
                  <img src={`http://localhost:5000/${selectedApp.photo}`} alt="Uploaded" className="max-h-60 mt-2 rounded" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



export default AdmissionApplications;
