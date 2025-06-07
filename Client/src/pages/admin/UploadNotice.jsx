import React, { useState, useEffect } from 'react';
import { Upload, Trash2, Clock, FileText, Check } from 'lucide-react';
import API from '../../api'

const UploadNotice = () => {
  const [form, setForm] = useState({ title: '', content: '', status: 'Published' });
  const [notices, setNotices] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const [editingNotice, setEditingNotice] = useState(null);
  const [file, setFile] = useState(null);


  // Sample notices
  // const notices = [
  //   { id: 1, title: 'Admission Application Deadline Extension', date: '2023-05-15', status: 'Published' },
  //   { id: 2, title: 'Revised Hall Fee Structure for 2023-2024', date: '2023-05-10', status: 'Published' },
  //   { id: 3, title: 'Schedule for Hall Week Celebrations', date: '2023-05-05', status: 'Published' },
  //   { id: 4, title: 'Maintenance Schedule for B-Block', date: '2023-05-01', status: 'Draft' },
  // ];

  const fetchNotices = async () => {
    const token = localStorage.getItem('token');
    const res = await API.get('/notice', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setNotices(res.data);
  };

  useEffect(() => {
    fetchNotices();
  }, []);


  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file drop logic here
  };

  const handleSubmit = async (e, status) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();

    formData.append('title', form.title);
    formData.append('content', form.content);
    formData.append('status', status || 'Published');
    if (file) formData.append('file', file);

    try {
      if (editingNotice) {
        await API.put(`/notice/${editingNotice}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        alert('Notice updated');
      } else {
        await API.post('/notice', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        alert('Notice uploaded');
      }

      setForm({ title: '', content: '', status: 'Published' });
      setFile(null);
      setEditingNotice(null);
      fetchNotices();

    } catch (err) {
      alert(err.response?.data?.message || 'Error saving notice');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this notice?")) return;

    const token = localStorage.getItem('token');
    try {
      await API.delete(`/notice/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Notice deleted");
      fetchNotices();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleEdit = (notice) => {
    setEditingNotice(notice._id);
    setForm({ title: notice.title, content: notice.content, status: notice.status });
  };

  const handleView = (notice) => {
    alert(`Title: ${notice.title}\n\nDescription: ${notice.content}`);
  };





  // return (
  //   <div className="space-y-6">
  //     <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
  //       <h2 className="text-2xl font-bold text-gray-800">Upload Notice</h2>
  //     </div>

  //     {/* Upload Form */}
  //     <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
  //       <form onSubmit={(e) => handleSubmit(e,'Published')}>
  //       <h3 className="text-lg font-semibold text-gray-800 mb-4">Create New Notice</h3>

  //       <div className="space-y-4">
  //         <div>
  //           <label htmlFor="notice-title" className="block text-sm font-medium text-gray-700 mb-1">
  //             Notice Title
  //           </label>
  //           <input
  //             type="text"
  //             id="notice-title"
  //             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  //             placeholder="Enter notice title"
  //           />
  //         </div>

  //         <div>
  //           <label htmlFor="notice-description" className="block text-sm font-medium text-gray-700 mb-1">
  //             Notice Description
  //           </label>
  //           <textarea
  //             id="notice-description"
  //             rows={5}
  //             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  //             placeholder="Enter notice description"
  //           ></textarea>
  //         </div>

  //         <div>
  //           <label className="block text-sm font-medium text-gray-700 mb-1">
  //             Attachment (Optional)
  //           </label>
  //           <div
  //             className={`border-2 border-dashed rounded-md p-8 text-center ${
  //               isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
  //             }`}
  //             onDragOver={handleDragOver}
  //             onDragLeave={handleDragLeave}
  //             onDrop={handleDrop}
  //           >
  //             <Upload size={32} className="mx-auto text-gray-400 mb-2" />
  //             <p className="text-sm text-gray-600 mb-2">
  //               Drag and drop files here, or click to browse
  //             </p>
  //             <p className="text-xs text-gray-500">
  //               Supports: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
  //             </p>
  //             <input
  //               type="file"
  //               className="hidden"
  //               id="file-upload"
  //               accept=".pdf,.doc,.docx,.jpg,.png"
  //             />
  //             <button
  //               onClick={() => document.getElementById('file-upload')?.click()}
  //               className="mt-4 px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors text-sm font-medium"
  //             >
  //               Browse Files
  //             </button>
  //           </div>
  //         </div>

  //         <div className="flex items-center space-x-2">
  //           <input type="checkbox" id="publish-now" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
  //           <label htmlFor="publish-now" className="text-sm text-gray-700">
  //             Publish immediately
  //           </label>
  //         </div>

  //         <div className="flex space-x-3">
  //           <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
  //             Upload Notice
  //           </button>
  //           <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
  //             Save as Draft
  //           </button>
  //         </div>
  //       </div>
  //       </form>
  //     </div>

  //     {/* Previous Notices */}
  //     <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
  //       <h3 className="text-lg font-semibold text-gray-800 mb-4">Previous Notices</h3>

  //       <div className="overflow-x-auto">
  //         <table className="min-w-full divide-y divide-gray-200">
  //           <thead className="bg-gray-50">
  //             <tr>
  //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
  //                 Notice Title
  //               </th>
  //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
  //                 Published Date
  //               </th>
  //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
  //                 Status
  //               </th>
  //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
  //                 Action
  //               </th>
  //             </tr>
  //           </thead>
  //           <tbody className="bg-white divide-y divide-gray-200">
  //             {notices.map((notice) => (
  //               <tr key={notice.id} className="hover:bg-gray-50 transition-colors">
  //                 <td className="px-6 py-4 whitespace-nowrap">
  //                   <div className="flex items-center">
  //                     <FileText size={18} className="text-gray-400 mr-2" />
  //                     <span className="text-sm font-medium text-gray-900">{notice.title}</span>
  //                   </div>
  //                 </td>
  //                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
  //                   <div className="flex items-center">
  //                     <Clock size={16} className="mr-1 text-gray-400" />
  //                     {new Date(notice.date).toLocaleDateString()}
  //                   </div>
  //                 </td>
  //                 <td className="px-6 py-4 whitespace-nowrap">
  //                   <span className={`px-2 py-1 text-xs font-semibold rounded-full flex items-center w-fit ${
  //                     notice.status === 'Published'
  //                       ? 'bg-green-100 text-green-800'
  //                       : 'bg-yellow-100 text-yellow-800'
  //                   }`}>
  //                     {notice.status === 'Published' && <Check size={12} className="mr-1" />}
  //                     {notice.status}
  //                   </span>
  //                 </td>
  //                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
  //                   <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
  //                   <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
  //                   <button className="text-red-600 hover:text-red-900 flex items-center">
  //                     <Trash2 size={14} className="mr-1" /> Delete
  //                   </button>
  //                 </td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="space-y-6">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800">Upload Notice</h2>

      {/* Upload Form */}
      <div className="bg-white p-6 rounded shadow">
        <form onSubmit={(e) => handleSubmit(e, 'Published')}>
          <div className="mb-4">
            <label className="font-semibold text-gray-700">Notice Title</label>
            <input
              type="text"
              id="notice-title"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full border p-2 mt-1 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="font-semibold text-gray-700">Description</label>
            <textarea
              id="notice-description"
              rows={5}
              value={form.content}
              onChange={e => setForm({ ...form, content: e.target.value })}
              className="w-full border p-2 mt-1 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Attachment (Optional)
            </label>
            <div
              className={`border-2 border-dashed rounded-md p-8 text-center ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload size={32} className="mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Click to browse files
              </p>
              <p className="text-xs text-gray-500">
                Supports: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
              </p>
              <input
                type="file"
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.jpg,.png"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button
                type = "button"
                onClick={() => document.getElementById('file-upload')?.click()}
                className="mt-4 px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors text-sm font-medium"
              >
                Browse Files
              </button>
            </div>
          </div>
          <div className="flex space-x-4">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Publish</button>
            <button type="button" onClick={(e) => handleSubmit(e, 'Draft')} className="bg-gray-200 text-gray-800 px-4 py-2 rounded">Save as Draft</button>
          </div>
        </form>
      </div>

      {/* Previous Notices */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Previous Notices</h3>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notice Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Published Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {notices.map((notice) => (
                <tr key={notice.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText size={18} className="text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{notice.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1 text-gray-400" />
                      {new Date(notice.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full flex items-center w-fit ${notice.status === 'Published'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                      }`}>
                      {notice.status === 'Published' && <Check size={12} className="mr-1" />}
                      {notice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex flex-col space-y-1">
                      <button onClick={() => handleView(notice)} className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                      <button onClick={() => handleEdit(notice)} className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                      <button onClick={() => handleDelete(notice._id)} className="text-red-600 hover:text-red-900 flex items-center">
                        <Trash2 size={14} className="mr-1" /> Delete
                      </button>

                      {notice.fileUrl && (
                        <a
                          href={`http://localhost:5000${notice.fileUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-500 underline mt-2"
                        >
                          View Attachment
                        </a>
                      )}
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UploadNotice;
