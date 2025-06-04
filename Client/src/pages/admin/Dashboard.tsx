import React from 'react';
import { Users, ClipboardCheck, ClipboardX, AlertCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  // Sample statistics data
  const stats = [
    { 
      id: 1, 
      title: 'Total Students', 
      value: '356', 
      icon: <Users size={24} className="text-blue-600" />,
      change: '+12% from last month',
      color: 'bg-blue-50 border-blue-200'
    },
    { 
      id: 2, 
      title: 'New Applications', 
      value: '45', 
      icon: <ClipboardCheck size={24} className="text-green-600" />,
      change: '+5% from last week',
      color: 'bg-green-50 border-green-200'
    },
    { 
      id: 3, 
      title: 'Cancellation Requests', 
      value: '7', 
      icon: <ClipboardX size={24} className="text-amber-600" />,
      change: '-2% from last week',
      color: 'bg-amber-50 border-amber-200'
    },
    { 
      id: 4, 
      title: 'Pending Complaints', 
      value: '12', 
      icon: <AlertCircle size={24} className="text-red-600" />,
      change: '+3 new today',
      color: 'bg-red-50 border-red-200'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-sm text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div 
            key={stat.id}
            className={`${stat.color} border rounded-lg shadow-sm p-6 transition-all duration-200 hover:shadow-md`}
          >
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-2">{stat.change}</p>
              </div>
              <div className="p-2 rounded-full bg-white shadow-sm">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="rounded-full w-10 h-10 bg-blue-100 flex items-center justify-center text-blue-600">
                    {item % 2 === 0 ? <ClipboardCheck size={18} /> : <Users size={18} />}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-800">
                      {item % 2 === 0 
                        ? 'New application submitted' 
                        : 'Student profile updated'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(Date.now() - item * 3600000).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                  {item % 2 === 0 ? 'Pending' : 'Completed'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hall Occupancy */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Hall Occupancy</h3>
        <div className="h-10 w-full bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 rounded-full" 
            style={{ width: '78%' }}
          ></div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-sm text-gray-600">Total Capacity: 480</span>
          <span className="text-sm font-medium text-blue-600">78% Occupied</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;