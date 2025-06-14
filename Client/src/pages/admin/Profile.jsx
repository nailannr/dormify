import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Lock, LogOut, Save } from 'lucide-react';
import API from '../../api'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem('changePass') === 'true' ? 'security' : 'profile'
  );

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    role: '',
    joinDate: '',
    lastLogin: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get("/user/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(res.data);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token");
      navigate("/user/login");
    }
  };

  const handleProfileSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await API.put("/user/profile", {
        name: userData.name
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Profile update failed", err);
      alert("Failed to update profile");
    }
  };

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      return alert("Please fill in all password fields");
    }
    if (newPassword !== confirmPassword) {
      return alert("New passwords do not match");
    }

    try {
      const token = localStorage.getItem("token");
      await API.post("/user/change-password", {
        currentPassword,
        newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Password changed successfully!");

      await API.put("/user/clear-pass-flag", {}, {
        headers: {Authorization: `Bearer ${token}`}
      })

      localStorage.removeItem("changePass")
      localStorage.removeItem("token");
      navigate("/user/login");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to change password");
    }
  };





  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="md:flex">
          {/* Sidebar */}
          <div className="bg-gray-50 p-6 md:w-64 border-b md:border-b-0 md:border-r border-gray-200">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <User size={40} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{userData.name}</h3>
              <p className="text-sm text-gray-600">{userData.role}</p>
            </div>
            
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'profile' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Profile Information
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'security' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Security Settings
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'activity' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Login Activity
              </button>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors">
                <LogOut size={16} className="mr-2" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6 flex-1">
            {activeTab === 'profile' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={userData.name}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={userData.email}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <input 
                      type="text" 
                      id="role" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none"
                      value= {userData.role}
                      readOnly
                    />
                    <p className="text-xs text-gray-500 mt-1">Role cannot be changed. Contact system administrator for role changes.</p>
                  </div>
                  
                  {/* <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input 
                      type="tel" 
                      id="phone" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={userData.phone}
                    />
                  </div> */}
                  
                  <div className="pt-4">
                    <button onClick={handleProfileSave} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center">
                      <Save size={16} className="mr-2" />
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'security' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <input 
                      type="password" 
                      id="current-password"
                      value={currentPassword} 
                      onChange={e => setCurrentPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your current password"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input 
                      type="password" 
                      id="new-password" 
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter new password"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <input 
                      type="password" 
                      id="confirm-password" 
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Confirm new password"
                    />
                  </div>
                  
                  <div className="pt-4">
                    <button 
                      onClick={handlePasswordChange}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center">
                      <Lock size={16} className="mr-2" />
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'activity' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Login Activity</h3>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
                  <p className="text-sm text-yellow-800">
                    For security reasons, we keep track of your recent login activity. If you notice any suspicious activity, please change your password immediately and contact the system administrator.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Current Session</p>
                        <p className="text-xs text-gray-500">Started on {userData.lastLogin}</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Active Now
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      <span className="font-medium">Device:</span> Chrome on Windows
                    </p>
                    <p className="text-xs text-gray-600">
                      <span className="font-medium">IP Address:</span> 192.168.1.1
                    </p>
                  </div>
                  
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="border-b border-gray-200 pb-4 last:border-0">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Previous Session</p>
                          <p className="text-xs text-gray-500">
                            {new Date(Date.now() - item * 86400000).toLocaleString()}
                          </p>
                        </div>
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                          Ended
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        <span className="font-medium">Device:</span> Chrome on Windows
                      </p>
                      <p className="text-xs text-gray-600">
                        <span className="font-medium">IP Address:</span> 192.168.1.1
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;