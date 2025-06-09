import React, { useEffect, useState } from 'react';
import API from '../../api';

export default function ApplicationStatus2() {
  const [application, setApplication] = useState(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/application/mine", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setApplication(res.data);
      } catch (err) {
        console.error("Failed to fetch application:", err);
      }
    };

    fetchApplication();
  }, []);

  if (!application) return <div>Loading application status...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Admission Application Status</h2>
      <p><strong>Status:</strong> {application.status}</p>

      {application.status === 'approved' && (
        <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded">
          Make Payment
        </button>
      )}
      {application.status === 'rejected' && (
        <p className="text-red-500 mt-2">Unfortunately, your application has been rejected.</p>
      )}
    </div>
  );
}
