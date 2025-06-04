import React, { useState } from 'react';
import { Users, Search } from 'lucide-react';

const SeatAllotment = () => {
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const blocks = [
    {
      id: 'A',
      name: 'Block A',
      rooms: [
        {
          id: 'A1',
          number: '301',
          seats: [
            {
              id: 'A1-1',
              number: 1,
              status: 'occupied',
              student: {
                name: 'Kazi Nusrat Tasneem',
                department: 'CSE',
                regNo: '2020331066'
              }
            },
            {
              id: 'A1-2',
              number: 2,
              status: 'occupied',
              student: {
                name: 'Afia Fairuz',
                department: 'BMB',
                regNo: '2020331066'
              }
            },
            {
              id: 'A1-3',
              number: 3,
              status: 'occupied',
              student: {
                name: 'Sharaf Tasnim',
                department: 'ENG',
                regNo: '2020331045'
              }
            },
            {
              id: 'A1-4',
              number: 4,
              status: 'occupied',
              student: {
                name: 'Asmaul Hosna',
                department: 'ANP',
                regNo: '2020331062'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'B',
      name: 'Block B',
      rooms: [
        {
          id: 'B1',
          number: '312',
          seats: [
            {
              id: 'B1-1',
              number: 1,
              status: 'occupied',
              student: {
                name: 'Nishamoni Sinha',
                department: 'ANP',
                regNo: '2020331028'
              }
            },
            { id: 'B1-2', number: 2, status: 'vacant' },
            { id: 'B1-3', number: 3, status: 'vacant' },
            {
              id: 'B1-4',
              number: 4,
              status: 'occupied',
              student: {
                name: 'Padma Talukdar',
                department: 'ENG',
                regNo: '2020331035'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'C',
      name: 'Block C',
      rooms: [
        {
          id: 'C1',
          number: '218',
          seats: [
            {
              id: 'C1-1',
              number: 1,
              status: 'occupied',
              student: {
                name: 'Zinnati Siddika Sumona',
                department: 'BMB',
                regNo: '2020331042'
              }
            },
            {
              id: 'C1-2',
              number: 2,
              status: 'occupied',
              student: {
                name: 'Sumaiya Islam',
                department: 'MAT',
                regNo: '2021331015'
              }
            },
            { id: 'C1-3', number: 3, status: 'vacant' },
            { id: 'C1-4', number: 4, status: 'vacant' }
          ]
        }
      ]
    },
    {
      id: 'D',
      name: 'Block D',
      rooms: [
        {
          id: 'D1',
          number: '325',
          seats: [
            {
              id: 'D1-1',
              number: 1,
              status: 'occupied',
              student: {
                name: 'Kamrun Sumaiya',
                department: 'CSE',
                regNo: '2020331020'
              }
            },
            { id: 'D1-2', number: 2, status: 'vacant' },
            {
              id: 'D1-3',
              number: 3,
              status: 'occupied',
              student: {
                name: 'Naila Nausheen Rahman',
                department: 'CSE',
                regNo: '2020331010'
              }
            },
            { id: 'D1-4', number: 4, status: 'vacant' }
          ]
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h2 className="text-2xl font-bold text-gray-800">Seat Allotment</h2>
        <div className="relative max-w-xs w-full md:w-64">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or reg no..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Block Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {blocks.map((block) => (
          <button
            key={block.id}
            onClick={() => setSelectedBlock(block.id)}
            className={`p-6 rounded-lg border ${
              selectedBlock === block.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:bg-gray-50'
            } transition-colors duration-200`}
          >
            <div className="flex items-center justify-center">
              <Users size={24} className={selectedBlock === block.id ? 'text-blue-500' : 'text-gray-400'} />
              <span className={`ml-2 font-medium ${
                selectedBlock === block.id ? 'text-blue-700' : 'text-gray-700'
              }`}>
                Block {block.id}
              </span>
            </div>
            <div className="mt-2 text-sm text-center text-gray-500">
              {block.rooms.length} Rooms
            </div>
          </button>
        ))}
      </div>

      {/* Room and Seat Display */}
      {selectedBlock && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Block {selectedBlock} Rooms
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blocks
              .find((b) => b.id === selectedBlock)
              ?.rooms.map((room) => (
                <div key={room.id} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-md font-medium text-gray-700 mb-3">
                    Room {room.number}
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {room.seats.map((seat) => (
                      <div
                        key={seat.id}
                        className={`p-3 rounded-lg ${
                          seat.status === 'occupied'
                            ? 'bg-blue-50 border border-blue-200'
                            : 'bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-600">
                            Seat {seat.number}
                          </span>
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              seat.status === 'occupied'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {seat.status === 'occupied' ? 'Occupied' : 'Vacant'}
                          </span>
                        </div>
                        {seat.student && (
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-800">
                              {seat.student.name}
                            </p>
                            <p className="text-xs text-gray-600">
                              {seat.student.department}
                            </p>
                            <p className="text-xs text-gray-500">
                              {seat.student.regNo}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatAllotment;
