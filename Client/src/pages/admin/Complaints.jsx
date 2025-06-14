import React, { useEffect, useState } from 'react';
import { Search, MessageSquare, AlertCircle, X } from 'lucide-react';
import API from '../../api';

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [summary, setSummary] = useState({ pending: 0, inProgress: 0, resolved: 0 });
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editStatus, setEditStatus] = useState('');
  const [editPriority, setEditPriority] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await API.get(`/complaint/admin?page=${currentPage}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setComplaints(res.data.complaints || []);
      setTotalPages(res.data.totalPages || 1);
      setSummary(res.data.summary || {});
    } catch (err) {
      console.error('Failed to fetch complaints:', err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, [currentPage]);

  useEffect(() => {
    let data = [...complaints];
    if (statusFilter) {
      data = data.filter(c => c.status.toLowerCase() === statusFilter.toLowerCase());
    }
    if (priorityFilter) {
      data = data.filter(c => c.priority.toLowerCase() === priorityFilter.toLowerCase());
    }
    if (searchTerm) {
      data = data.filter(c =>
        c.userId?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFiltered(data);
  }, [complaints, statusFilter, priorityFilter, searchTerm]);

  const handleStatusUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await API.patch(`/complaint/${selectedComplaint._id}/update`, {
        status: editStatus,
        priority: editPriority
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setEditModalOpen(false);
      fetchComplaints();
    } catch (err) {
      console.error('Failed to update complaint:', err);
      alert('Could not update complaint.');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Complaints</h2>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search complaints..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md"
          />
        </div>
        <select onChange={(e) => setStatusFilter(e.target.value)} className="border rounded-md py-2 px-3">
          <option value="">Filter by Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
        <select onChange={(e) => setPriorityFilter(e.target.value)} className="border rounded-md py-2 px-3">
          <option value="">Filter by Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard color="red" title="Pending" count={summary.pending} icon={<AlertCircle />} />
        <SummaryCard color="amber" title="In Progress" count={summary.inProgress} icon={<MessageSquare />} />
        <SummaryCard color="green" title="Resolved" count={summary.resolved} icon={<MessageSquare />} />
      </div>

      {/* Complaints Table */}
      <div className="overflow-x-auto bg-white rounded-lg border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-6 py-3 text-left">Student</th>
              <th className="px-6 py-3 text-left">Room</th>
              <th className="px-6 py-3 text-left">Subject</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Priority</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.map(c => (
              <tr key={c._id}>
                <td className="px-6 py-4 text-sm text-gray-900">{c.userId.name}<div className="text-xs text-gray-500">{c.regNo}</div></td>
                <td className="px-6 py-4 text-sm text-gray-500">{c.room}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{c.subject}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{new Date(c.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    c.priority === 'High' ? 'bg-red-100 text-red-800' :
                    c.priority === 'Medium' ? 'bg-amber-100 text-amber-800' :
                    'bg-green-100 text-green-800'
                  }`}>{c.priority}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    c.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                    c.status === 'In Progress' ? 'bg-amber-100 text-amber-800' :
                    'bg-red-100 text-red-800'
                  }`}>{c.status}</span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <button onClick={() => { setSelectedComplaint(c); setViewModalOpen(true); }} className="text-blue-600 hover:underline mr-2">View</button>
                  <button onClick={() => {
                    setSelectedComplaint(c);
                    setEditStatus(c.status);
                    setEditPriority(c.priority);
                    setEditModalOpen(true);
                  }} className="text-indigo-600 hover:underline">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 flex justify-between items-center bg-gray-50 border-t">
        <div className="text-sm text-gray-500">Page {currentPage} of {totalPages}</div>
        <div className="space-x-2">
          <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1 border rounded">Prev</button>
          <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1 border rounded">Next</button>
        </div>
      </div>

      {/* View Modal */}
      {viewModalOpen && selectedComplaint && (
        <Modal title="Complaint Details" onClose={() => setViewModalOpen(false)}>
          <p><strong>Student:</strong> {selectedComplaint.userId.name}</p>
          <p><strong>Reg No:</strong> {selectedComplaint.regNo}</p>
          <p><strong>Room:</strong> {selectedComplaint.room}</p>
          <p><strong>Subject:</strong> {selectedComplaint.subject}</p>
          <p><strong>Description:</strong> {selectedComplaint.description}</p>
          <p><strong>Status:</strong> {selectedComplaint.status}</p>
          <p><strong>Priority:</strong> {selectedComplaint.priority}</p>
        </Modal>
      )}

      {/* Edit Modal */}
      {editModalOpen && selectedComplaint && (
        <Modal title="Update Complaint" onClose={() => setEditModalOpen(false)}>
          <label className="block mb-1 text-sm">Status</label>
          <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)} className="w-full border rounded mb-4 p-2">
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
          <label className="block mb-1 text-sm">Priority</label>
          <select value={editPriority} onChange={(e) => setEditPriority(e.target.value)} className="w-full border rounded mb-4 p-2">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button onClick={handleStatusUpdate} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">Save Changes</button>
        </Modal>
      )}
    </div>
  );
};

const SummaryCard = ({ color, title, count, icon }) => (
  <div className={`bg-${color}-50 border border-${color}-200 rounded-lg p-4`}>
    <div className="flex items-center justify-between">
      <div>
        <p className={`text-sm font-medium text-${color}-700`}>{title}</p>
        <p className={`text-2xl font-bold text-${color}-800`}>{count}</p>
      </div>
      <div className={`bg-${color}-100 p-3 rounded-full`}>
        {icon}
      </div>
    </div>
  </div>
);

const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-600"><X /></button>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  </div>
);

export default Complaints;
