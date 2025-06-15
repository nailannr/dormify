import React, { useEffect, useState } from 'react';
import { Users, Search } from 'lucide-react';
import API from '../../api';

const SeatAllotment = () => {
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [blocks, setBlocks] = useState({});
  const [paidApplicants, setPaidApplicants] = useState([]);
  const [selectedStudentMap, setSelectedStudentMap] = useState({});

  // Fetch paid applicants who are not assigned a seat
  const fetchPaidApplicants = async () => {
    const token = localStorage.getItem('token');

    const [paidRes, seatRes] = await Promise.all([
      API.get('/application/paid', {
        headers: { Authorization: `Bearer ${token}` },
      }),
      API.get('/seat', {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

    // Find application IDs already assigned to a seat
    const assignedApplicationIds = seatRes.data
      .filter(seat => seat.studentApplication)
      .map(seat =>
        typeof seat.studentApplication === 'object'
          ? seat.studentApplication._id?.toString()
          : seat.studentApplication?.toString()
      );

    // Only show paid applicants whose application is not assigned to a seat
    const unassigned = paidRes.data.filter(app =>
      app._id && !assignedApplicationIds.includes(app._id.toString())
    );

    setPaidApplicants(unassigned);
  };

  useEffect(() => {
    fetchPaidApplicants();
  }, []);

  // Fetch seat data and group by block/room
  useEffect(() => {
    const fetchSeats = async () => {
      const token = localStorage.getItem('token');
      const res = await API.get('/seat', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const grouped = {};
      for (let seat of res.data) {
        const block = seat.block;
        const room = seat.room;
        if (!grouped[block]) grouped[block] = {};
        if (!grouped[block][room]) grouped[block][room] = [];
        grouped[block][room].push(seat);
      }

      // Convert to array structure for UI mapping
      const structured = {};
      Object.keys(grouped).forEach((blockId) => {
        structured[blockId] = Object.keys(grouped[blockId]).map((roomNo) => ({
          number: roomNo,
          seats: grouped[blockId][roomNo],
        }));
      });

      setBlocks(structured);
    };
    fetchSeats();
  }, []);

  const assignSeat = async (seatId, applicationId) => {
    try {
      const token = localStorage.getItem('token');
      // Find the applicant object by applicationId
      const applicant = paidApplicants.find(app => app._id === applicationId);
      if (!applicant) {
        alert("Applicant not found.");
        return;
      }
      // You may need to get the userId from the application if your backend expects userId
      await API.post('/seat/assign', { seatId, studentId: applicant.userId }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Refresh seats after assignment
      const res = await API.get('/seat', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const grouped = {};
      for (let seat of res.data) {
        const block = seat.block;
        const room = seat.room;
        if (!grouped[block]) grouped[block] = {};
        if (!grouped[block][room]) grouped[block][room] = [];
        grouped[block][room].push(seat);
      }

      const structured = {};
      Object.keys(grouped).forEach((blockId) => {
        structured[blockId] = Object.keys(grouped[blockId]).map((roomNo) => ({
          number: roomNo,
          seats: grouped[blockId][roomNo],
        }));
      });

      setBlocks(structured);
      setSelectedStudentMap((prev) => ({ ...prev, [seatId]: '' }));
      // Refresh paid applicants list
      await fetchPaidApplicants();
    } catch (err) {
      alert("Failed to assign seat");
      console.error(err);
    }
  };

  const unassignSeat = async (seatId) => {
    try {
      const token = localStorage.getItem('token');
      await API.post('/seat/unassign', { seatId }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const res = await API.get('/seat', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const grouped = {};
      for (let seat of res.data) {
        const block = seat.block;
        const room = seat.room;
        if (!grouped[block]) grouped[block] = {};
        if (!grouped[block][room]) grouped[block][room] = [];
        grouped[block][room].push(seat);
      }

      const structured = {};
      Object.keys(grouped).forEach((blockId) => {
        structured[blockId] = Object.keys(grouped[blockId]).map((roomNo) => ({
          number: roomNo,
          seats: grouped[blockId][roomNo],
        }));
      });

      setBlocks(structured);

      await fetchPaidApplicants();
    } catch (err) {
      alert("Failed to remove student from seat");
      console.error(err);
    }
  };

  // Filter applicants by search query
  const filteredApplicants = paidApplicants.filter(student =>
    (student.name && student.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (student.regNo && student.regNo.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
        {Object.keys(blocks).map((blockId) => (
          <button
            key={blockId}
            onClick={() => setSelectedBlock(blockId)}
            className={`p-6 rounded-lg border ${
              selectedBlock === blockId
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center">
              <Users size={24} className={selectedBlock === blockId ? 'text-blue-500' : 'text-gray-400'} />
              <span className={`ml-2 font-medium ${
                selectedBlock === blockId ? 'text-blue-700' : 'text-gray-700'
              }`}>
                Block {blockId}
              </span>
            </div>
            <div className="mt-2 text-sm text-center text-gray-500">
              {blocks[blockId].length} Rooms
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
            {blocks[selectedBlock]?.map((room) => (
              <div key={room.number} className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-md font-medium text-gray-700 mb-3">
                  Room {room.number}
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {room.seats.map((seat) => (
                    <div
                      key={seat._id}
                      className={`p-3 rounded-lg ${
                        seat.status === 'occupied'
                          ? 'bg-blue-50 border border-blue-200'
                          : 'bg-gray-50 border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">
                          Seat {seat.seatNumber}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            seat.studentId
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {seat.studentId ? 'Occupied' : 'Vacant'}
                        </span>
                      </div>

                      {seat.studentId && (
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-gray-800">{seat.studentId.name}</p>
                          <p className="text-xs text-gray-600">{seat.studentId.department}</p>
                          <p className="text-xs text-gray-500">{seat.studentApplication?.regNo || 'N/A'}</p>
                          <button
                            onClick={() => unassignSeat(seat._id)}
                            className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      )}

                      {!seat.studentId && (
                        <>
                          <select
                            onChange={(e) =>
                              setSelectedStudentMap((prev) => ({ ...prev, [seat._id]: e.target.value }))
                            }
                            value={selectedStudentMap[seat._id] || ''}
                            className="mt-2 w-full border p-1 rounded"
                          >
                            <option value="">Select Student</option>
                            {filteredApplicants.map((student) => (
                              <option key={student._id} value={student._id}>
                                {student.name} ({student.regNo})
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => assignSeat(seat._id, selectedStudentMap[seat._id])}
                            disabled={!selectedStudentMap[seat._id]}
                            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
                          >
                            Assign
                          </button>
                        </>
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


