import React, { useState, useEffect } from 'react';
import { UserPlus, Search, Phone, Mail, Building, Edit, Trash2, X, Save } from 'lucide-react';
import API from '../../api'

const MonitorAdmins = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dorm: '',
    password: ''
  });

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get('/admin', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAdmins(res.data)
      } catch (err) {
        console.error('Failed to load admins:', err);
      }
    };

    fetchAdmins();
  }, []);


  
  const [admins, setAdmins] = useState([]);

  const dormOptions = ['dorm1', 'dorm2', 'dorm3'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddAdmin = async () => {
    try {
      const token = localStorage.getItem('token');
      await API.post('/admin', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Admin created');
      setFormData({ name: '', email: '', phone: '', dorm: '' });
      setShowAddForm(false);
      // reload list
      const res = await API.get('/admin', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAdmins(res.data);
    } catch (err) {
      alert('Failed to create admin');
      console.error(err);
    }
  };

  

  const handleEditAdmin = (admin) => {
    setEditingAdmin(admin);
    setFormData({
      name: admin.name,
      email: admin.email,
      phone: admin.phone,
      dorm: admin.dorm
    });
  };

  const handleUpdateAdmin = async () => {
    try {
      const token = localStorage.getItem('token');
      await API.put(`/admin/${editingAdmin._id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Admin updated');
      setEditingAdmin(null);
      const res = await API.get('/admin', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAdmins(res.data);
    } catch (err) {
      alert('Failed to update admin');
      console.error(err);
    }
  };


  const handleRemoveAdmin = async (id) => {
    if (!window.confirm('Are you sure you want to remove this admin?')) return;
    try {
      const token = localStorage.getItem('token');
      await API.delete(`/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Admin removed');
      setAdmins(admins.filter(a => a._id !== id));
    } catch (err) {
      alert('Failed to remove admin');
      console.error(err);
    }
  };


  const handleCancelEdit = () => {
    setEditingAdmin(null);
    setShowAddForm(false);
    setFormData({ name: '', email: '', phone: '', dorm: '' });
  };

  const filteredAdmins = admins.filter(admin =>
    admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.dorm.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h2 className="text-2xl font-bold text-gray-800">Monitor Admins</h2>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <button 
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            <UserPlus size={16} className="mr-1" />
            Add Admin
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search admins..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Add/Edit Admin Form */}
      {(showAddForm || editingAdmin) && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {editingAdmin ? 'Edit Admin' : 'Add New Admin'}
            </h3>
            <button 
              onClick={handleCancelEdit}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter full name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter email address"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter phone number"
              />
            </div>
            
            <div>
              <label htmlFor="dorm" className="block text-sm font-medium text-gray-700 mb-1">
                Dormitory
              </label>
              <select
                id="dorm"
                name="dorm"
                value={formData.dorm}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Dormitory</option>
                {dormOptions.map((dorm) => (
                  <option key={dorm} value={dorm}>{dorm}</option>
                ))}
              </select>
            </div>

            {!editingAdmin && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Initial Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="e.g. admin123"
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
            )}
            
          </div>

         

          
          <div className="mt-6 flex space-x-3">
            <button
              onClick={editingAdmin ? handleUpdateAdmin : handleAddAdmin}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
            >
              <Save size={16} className="mr-1" />
              {editingAdmin ? 'Update Admin' : 'Add Admin'}
            </button>
            <button
              onClick={handleCancelEdit}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Admins Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAdmins.map((admin) => (
          <div key={admin.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{admin.name}</h4>
                <div className="flex items-center mb-2">
                  <Building size={16} className="text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-blue-600">{admin.dorm}</span>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail size={16} className="text-gray-400 mr-3 flex-shrink-0" />
                  <span className="truncate">{admin.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone size={16} className="text-gray-400 mr-3 flex-shrink-0" />
                  <span>{admin.phone}</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleEditAdmin(admin)}
                  className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors flex items-center justify-center"
                >
                  <Edit size={14} className="mr-1" />
                  Edit
                </button>
                <button 
                  onClick={() => handleRemoveAdmin(admin._id)}
                  className="flex-1 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors flex items-center justify-center"
                >
                  <Trash2 size={14} className="mr-1" />
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAdmins.length === 0 && (
        <div className="text-center py-12">
          <UserPlus size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No admins found</h3>
          <p className="text-gray-500">
            {searchQuery ? 'Try adjusting your search criteria.' : 'Get started by adding your first admin.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default MonitorAdmins;