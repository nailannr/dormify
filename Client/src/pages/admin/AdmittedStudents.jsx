import React, { useEffect, useState } from 'react';
import { Search, Filter, ArrowDownUp, Download, X } from 'lucide-react';
import API from '../../api';

const AdmittedStudents = () => {
  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    fetchStudents();
  }, [currentPage]);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await API.get(`/seat/admitted?page=${currentPage}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(res.data.students || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error('Failed to fetch admitted students:', err);
    }
  };

  useEffect(() => {
    let data = [...students];
    if (search) {
      data = data.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.regNo.toLowerCase().includes(search.toLowerCase()) ||
        s.room.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (statusFilter) {
      data = data.filter(s => s.status.toLowerCase() === statusFilter);
    }
    if (sortBy) {
      data.sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'regNo') return a.regNo.localeCompare(b.regNo);
        if (sortBy === 'room') return a.room.localeCompare(b.room);
        return new Date(b.joinDate) - new Date(a.joinDate);
      });
    }
    setFiltered(data);
  }, [students, search, statusFilter, sortBy]);

  const handleStatusUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await API.patch(`/seat/status/${selectedStudent._id}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditModalOpen(false);
      fetchStudents();
    } catch (err) {
      console.error('Status update failed:', err);
    }
  };

  const exportCSV = () => {
    const headers = 'Name,Reg No,Dept,Room,Join Date,Status\n';
    const rows = students.map(s =>
      `${s.name},${s.regNo},${s.department},${s.room},${new Date(s.joinDate).toLocaleDateString()},${s.status}`
    );
    const csv = headers + rows.join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'admitted_student_list.csv';
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Admitted Students</h2>
        <button
          onClick={exportCSV}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center"
        >
          <Download size={16} className="mr-1" />
          Export
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border rounded-md"
              placeholder="Search by name, reg no, or room..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div>
          <select onChange={(e) => setStatusFilter(e.target.value)} className="w-full border rounded-md py-2">
            <option value="">Filter by Status</option>
            <option value="active">Active</option>
            <option value="on leave">On Leave</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div>
          <select onChange={(e) => setSortBy(e.target.value)} className="w-full border rounded-md py-2">
            <option value="">Sort by</option>
            <option value="name">Name</option>
            <option value="regNo">Reg No</option>
            <option value="room">Room</option>
            <option value="joinDate">Join Date</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Name', 'Reg No', 'Dept', 'Room', 'Join Date', 'Status', 'Action'].map((col) => (
                <th key={col} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {(Array.isArray(filtered) ? filtered : []).map((student) => (
              <tr key={student._id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{student.regNo}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{student.department}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{student.room}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{new Date(student.joinDate).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
                    student.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : student.status === 'Inactive'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {student.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={() => {
                      setSelectedStudent(student);
                      setViewModalOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      setSelectedStudent(student);
                      setNewStatus(student.status);
                      setEditModalOpen(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-700 hover:bg-gray-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">Page {currentPage}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-700 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>


      {/* View Modal */}
      {viewModalOpen && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <button className="absolute top-2 right-2 text-gray-600" onClick={() => setViewModalOpen(false)}>
              <X />
            </button>
            <h3 className="text-xl font-bold mb-4">Student Details</h3>
            <p><strong>Name:</strong> {selectedStudent.name}</p>
            <p><strong>Reg No:</strong> {selectedStudent.regNo}</p>
            <p><strong>Department:</strong> {selectedStudent.department}</p>
            <p><strong>Room:</strong> {selectedStudent.room}</p>
            <p><strong>Status:</strong> {selectedStudent.status}</p>
            <p><strong>Join Date:</strong> {new Date(selectedStudent.joinDate).toLocaleDateString()}</p>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModalOpen && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-sm relative">
            <button className="absolute top-2 right-2 text-gray-600" onClick={() => setEditModalOpen(false)}>
              <X />
            </button>
            <h3 className="text-lg font-bold mb-4">Edit Status</h3>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            >
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Inactive">Inactive</option>
            </select>
            <button
              onClick={handleStatusUpdate}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdmittedStudents;


// import React from 'react';
// import { Search, Filter, ArrowDownUp, Download, UserPlus } from 'lucide-react';

// const AdmittedStudents = () => {

//   // useEffect(() => {
//   // if (localStorage.getItem('role') !== 'admin') {
//   //   navigate('/user/login');
//   // }
//   // }, []);



//   // Sample student data
//   const students = [
//     { id: 1, name: 'Kazi Nusrat Tasneem', regNo: '2019331051', dept: 'CSE', room: 'B-101', joinDate: '2020-01-15', status: 'Active' },
//     { id: 2, name: 'Naila Nausheen Rahman', regNo: '2019331062', dept: 'CSE', room: 'B-102', joinDate: '2020-01-15', status: 'Active' },
//     { id: 3, name: 'Afia Fairuz', regNo: '2019331045', dept: 'CSE', room: 'B-103', joinDate: '2020-01-16', status: 'Active' },
//     { id: 4, name: 'Kamrun Sumaiya Oishee', regNo: '2020331028', dept: 'EEE', room: 'B-201', joinDate: '2021-01-10', status: 'Active' },
//     { id: 5, name: 'Asmaul Hosna', regNo: '2020331035', dept: 'EEE', room: 'B-202', joinDate: '2021-01-10', status: 'On Leave' },
//     { id: 6, name: 'Sharaf Tasnim', regNo: '2020331042', dept: 'SWE', room: 'B-203', joinDate: '2021-01-12', status: 'Active' },
//     { id: 7, name: 'Sumaiya Islam', regNo: '2021331015', dept: 'CSE', room: 'B-301', joinDate: '2022-01-05', status: 'Active' },
//     { id: 8, name: 'Zinnati Siddika Sumona', regNo: '2021331024', dept: 'CSE', room: 'B-302', joinDate: '2022-01-05', status: 'Inactive' },
//   ];

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
//         <h2 className="text-2xl font-bold text-gray-800">Admitted Students</h2>
//         <div className="flex space-x-2 mt-4 md:mt-0">
//           <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center">
//             <UserPlus size={16} className="mr-1" />
//             Add Student
//           </button>
//           <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center">
//             <Download size={16} className="mr-1" />
//             Export
//           </button>
//         </div>
//       </div>

//       {/* Filters and Search */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <div className="col-span-1 md:col-span-2">
//           <div className="relative">
//             <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search students by name, reg no, or room..."
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//         </div>
//         <div>
//           <div className="relative">
//             <Filter size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <select className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white">
//               <option value="">Filter by Status</option>
//               <option value="active">Active</option>
//               <option value="on-leave">On Leave</option>
//               <option value="inactive">Inactive</option>
//             </select>
//           </div>
//         </div>
//         <div>
//           <div className="relative">
//             <ArrowDownUp size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <select className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white">
//               <option value="">Sort by</option>
//               <option value="name">Name (A-Z)</option>
//               <option value="regNo">Registration No.</option>
//               <option value="room">Room No.</option>
//               <option value="joinDate">Join Date</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Students Table */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Student Name
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Registration No.
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Department
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Room No.
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Join Date
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {students.map((student) => (
//                 <tr key={student.id} className="hover:bg-gray-50 transition-colors">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     {student.name}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {student.regNo}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {student.dept}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {student.room}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {new Date(student.joinDate).toLocaleDateString()}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
//                       student.status === 'Active' 
//                         ? 'bg-green-100 text-green-800' 
//                         : student.status === 'Inactive'
//                         ? 'bg-red-100 text-red-800'
//                         : 'bg-yellow-100 text-yellow-800'
//                     }`}>
//                       {student.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
//                     <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
//                     <button className="text-red-600 hover:text-red-900">Remove</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
        
//         {/* Pagination */}
//         <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
//           <div className="text-sm text-gray-500">
//             Showing <span className="font-medium">1</span> to <span className="font-medium">8</span> of <span className="font-medium">8</span> results
//           </div>
//           <div className="flex space-x-2">
//             <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-400 cursor-not-allowed">
//               Previous
//             </button>
//             <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700">
//               1
//             </button>
//             <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-400 cursor-not-allowed">
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdmittedStudents;