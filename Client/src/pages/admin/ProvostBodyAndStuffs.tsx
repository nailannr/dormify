import React from 'react';
import { UserPlus, Search, Phone, Mail, MapPin } from 'lucide-react';

const ProvostBodyAndStaffs: React.FC = () => {
  // Sample provost body data
  const provostBody = [
    { 
      id: 1, 
      name: 'Dr. Fatema Begum', 
      role: 'Provost', 
      department: 'Department of Computer Science and Engineering',
      email: 'fatema@sust.edu', 
      phone: '+880-1712-345678',
      office: 'Administrative Building, Room 201',
      image: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    { 
      id: 2, 
      name: 'Dr. Ayesha Rahman', 
      role: 'Assistant Provost', 
      department: 'Department of Electrical and Electronic Engineering',
      email: 'ayesha@sust.edu', 
      phone: '+880-1723-456789',
      office: 'Administrative Building, Room 202',
      image: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    { 
      id: 3, 
      name: 'Dr. Nasrin Akter', 
      role: 'Assistant Provost', 
      department: 'Department of Physics',
      email: 'nasrin@sust.edu', 
      phone: '+880-1734-567890',
      office: 'Administrative Building, Room 203',
      image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
  ];

  // Sample staff data
  const staffs = [
    { 
      id: 1, 
      name: 'Farida Yasmin', 
      role: 'Administrative Officer', 
      email: 'farida@sust.edu', 
      phone: '+880-1745-678901',
      office: 'Administrative Office, Ground Floor',
      image: 'https://images.pexels.com/photos/4064781/pexels-photo-4064781.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    { 
      id: 2, 
      name: 'Rahima Khatun', 
      role: 'Office Assistant', 
      email: 'rahima@sust.edu', 
      phone: '+880-1756-789012',
      office: 'Administrative Office, Ground Floor',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    { 
      id: 3, 
      name: 'Salma Begum', 
      role: 'Senior Caretaker', 
      email: 'salma@sust.edu', 
      phone: '+880-1767-890123',
      office: 'B-Block, Ground Floor',
      image: 'https://images.pexels.com/photos/4063599/pexels-photo-4063599.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    { 
      id: 4, 
      name: 'Amina Khatun', 
      role: 'Caretaker', 
      email: 'amina@sust.edu', 
      phone: '+880-1778-901234',
      office: 'C-Block, Ground Floor',
      image: 'https://images.pexels.com/photos/2962144/pexels-photo-2962144.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h2 className="text-2xl font-bold text-gray-800">Provost Body and Staffs</h2>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center">
            <UserPlus size={16} className="mr-1" />
            Add Member
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search members..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Provost Body Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Provost Body</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {provostBody.map((member) => (
            <div key={member.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{member.name}</h4>
                    <p className="text-sm font-medium text-blue-600">{member.role}</p>
                    <p className="text-xs text-gray-500 mt-1">{member.department}</p>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail size={16} className="text-gray-400 mr-2" />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone size={16} className="text-gray-400 mr-2" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin size={16} className="text-gray-400 mr-2" />
                    <span>{member.office}</span>
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-2">
                  <button className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                    Edit
                  </button>
                  <button className="px-3 py-1 text-xs font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Staff Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Staff Members</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {staffs.map((staff) => (
            <div key={staff.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4">
                <div className="flex flex-col items-center text-center mb-3">
                  <img 
                    src={staff.image} 
                    alt={staff.name}
                    className="w-16 h-16 rounded-full object-cover mb-2"
                  />
                  <h4 className="text-md font-semibold text-gray-900">{staff.name}</h4>
                  <p className="text-sm text-blue-600">{staff.role}</p>
                </div>
                
                <div className="space-y-1 text-xs">
                  <div className="flex items-center text-gray-600">
                    <Mail size={14} className="text-gray-400 mr-1 flex-shrink-0" />
                    <span className="truncate">{staff.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone size={14} className="text-gray-400 mr-1 flex-shrink-0" />
                    <span>{staff.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin size={14} className="text-gray-400 mr-1 flex-shrink-0" />
                    <span className="truncate">{staff.office}</span>
                  </div>
                </div>
                
                <div className="mt-3 flex space-x-2 justify-center">
                  <button className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                    Edit
                  </button>
                  <button className="px-2 py-1 text-xs font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProvostBodyAndStaffs;