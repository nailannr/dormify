import React, { useState, useEffect } from 'react';
import { UserPlus, Search, Phone, Mail, MapPin } from 'lucide-react';
import API from '../../api';


const ProvostBodyAndStaffs = () => {
  const [provostBody, setProvostBody] = useState([]);
  const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProvost = await API.get('/provosts');
        const resStaff = await API.get('/staffs');
        setProvostBody(resProvost.data);
        setStaffs(resStaff.data);
      } catch (err) {
        console.error("Fetching error", err);
      }
    };
    fetchData();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [form, setForm] = useState(null);
  // name: '',
  // role: '',
  // department: '',
  // email: '',
  // phone: '',
  // office: '',
  // type: 'provost', // or 'staff'
  // id: null, // for edit



  const handleAddClick = (type) => {
    setForm({ name: '', role: '', department: '', email: '', phone: '', office: '', type, id: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEdit = !!form.id;
    const endpoint = form.type === 'provost' ? '/provosts' : '/staffs';

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      if (isEdit) {
        // Update existing
        await API.put(`${endpoint}/${form.id}`, form, config);
      } else {
        // Create new
        await API.post(endpoint, form, config);
      }

      // Refresh data
      const resProvost = await API.get('/provosts', config);
      const resStaff = await API.get('/staffs', config);
      setProvostBody(resProvost.data);
      setStaffs(resStaff.data);
      setForm(null); // clear form
    } catch (err) {
      console.error("Save error", err);
      alert("Failed to save.");
    }
  };


  const handleEdit = (item, type) => {
    setForm({
      ...item,
      type,
      id: item._id 
    });
  };


  const handleRemove = async (id, type) => {
    try {
      const token = localStorage.getItem('token');
      const url = type === 'provost' ? `/provosts/${id}` : `/staffs/${id}`;

      await API.delete(url, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (type === 'provost') {
        setProvostBody(prev => prev.filter(item => item._id !== id));
      } else {
        setStaffs(prev => prev.filter(item => item._id !== id));
      }

      alert(`${type} deleted successfully`);
    } catch (err) {
      console.error("Delete error", err);
      alert("Failed to delete " + type);
    }
  };


  const filteredProvosts = provostBody.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStaffs = staffs.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h2 className="text-2xl font-bold text-gray-800">Provost Body and Staffs</h2>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <button
            onClick={() => setForm({ type: 'provost', name: '', role: '', department: '', email: '', phone: '', office: '' })}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            <UserPlus size={16} className="mr-1" />
            Add Provost
          </button>

          <button
            onClick={() => setForm({ type: 'staff', name: '', role: '', email: '', phone: '', office: '' })}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            <UserPlus size={16} className="mr-1" />
            Add Staff
          </button>

        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search members..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Form Section */}
      {form && (
        <div className="bg-white p-4 rounded shadow">
          <h4 className="text-lg font-semibold mb-3">{form.id ? 'Edit' : 'Add'} {form.type === 'provost' ? 'Provost' : 'Staff'}</h4>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            <input placeholder="Role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} required />
            {form.type === 'provost' && (
              <input placeholder="Department" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} />
            )}
            <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            <input placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            <input placeholder="Office" value={form.office} onChange={e => setForm({ ...form, office: e.target.value })} />
            <div className='flex space-x-2 col-span-full'>
              <button type="submit" className=" bg-blue-600 text-white px-4 py-2 rounded">
                {form.id ? 'Update' : 'Add'} Member
              </button>
              <button type="button" onClick={() => setForm(null)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </form>
        </div >
      )}

{/* Provost Body Section */ }
<div>
  <h3 className="text-xl font-semibold text-gray-800 mb-4">Provost Body</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {filteredProvosts.map((member) => (
      <div key={member.id} className="bg-white rounded-lg shadow-sm border p-6">
        <h4 className="text-lg font-semibold text-gray-900">{member.name}</h4>
        <p className="text-sm font-medium text-blue-600">{member.role}</p>
        <p className="text-xs text-gray-500 mt-1">{member.department}</p>
        <div className="mt-4 space-y-2 text-sm text-gray-600">
          <div className="flex items-center"><Mail size={16} className="mr-2" /> {member.email}</div>
          <div className="flex items-center"><Phone size={16} className="mr-2" /> {member.phone}</div>
          <div className="flex items-center"><MapPin size={16} className="mr-2" /> {member.office}</div>
        </div>
        <div className="mt-4 flex space-x-2">
          <button onClick={() => handleEdit(member, 'provost')} className="text-blue-600 bg-blue-50 px-3 py-1 rounded">Edit</button>
          <button onClick={() => handleRemove(member._id, 'provost')} className="text-red-600 bg-red-50 px-3 py-1 rounded">Remove</button>
        </div>
      </div>
    ))}
  </div>
</div>

{/* Staff Members Section */ }
<div>
  <h3 className="text-xl font-semibold text-gray-800 mb-4">Staff Members</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {filteredStaffs.map((staff) => (
      <div key={staff.id} className="bg-white rounded-lg shadow-sm border p-4 text-sm">
        <h4 className="text-md font-semibold text-gray-900">{staff.name}</h4>
        <p className="text-sm text-blue-600">{staff.role}</p>
        <div className="mt-2 text-gray-600 space-y-1">
          <div className="flex items-center"><Mail size={14} className="mr-1" /> {staff.email}</div>
          <div className="flex items-center"><Phone size={14} className="mr-1" /> {staff.phone}</div>
          <div className="flex items-center"><MapPin size={14} className="mr-1" /> {staff.office}</div>
        </div>
        <div className="mt-3 flex space-x-2">
          <button onClick={() => handleEdit(staff, 'staff')} className="text-blue-600 bg-blue-50 px-2 py-1 rounded">Edit</button>
          <button onClick={() => handleRemove(staff.id, 'staff')} className="text-red-600 bg-red-50 px-2 py-1 rounded">Remove</button>
        </div>
      </div>
    ))}
  </div>
</div>
    </div >
  );
};

export default ProvostBodyAndStaffs;
