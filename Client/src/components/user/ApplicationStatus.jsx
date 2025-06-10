import React, { useEffect, useState } from 'react';
import API from '../../api';

export default function ApplicationStatus() {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/application/mine", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data) {
          setApplication(res.data);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setNotFound(true);
        } else {
          console.error("Failed to fetch application:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600">
        Fetching your application status...
      </div>
    );
  }

  if (notFound || !application) {
    return (
      <div className="max-w-xl mx-auto bg-white shadow-md p-6 rounded-lg mt-10 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">No Application Found</h2>
        <p className="text-gray-600">You have not submitted any admission application yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md p-8 rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Admission Application Status</h2>

      <div className="space-y-3 text-gray-700">
        <p><strong>Application ID:</strong> <span className="text-blue-700 font-mono">APP{application._id.slice(-6).toUpperCase()}</span></p>
        <p><strong>Name:</strong> {application.name}</p>
        <p><strong>Registration No:</strong> {application.regNo}</p>
        <p><strong>Department:</strong> {application.department}</p>
        <p><strong>Session:</strong> {application.session}</p>
        <p><strong>Status:</strong> 
          <span className={`ml-2 px-3 py-1 text-sm rounded-full font-semibold 
            ${application.status === 'approved' ? 'bg-green-100 text-green-800' :
              application.status === 'rejected' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'}`}>
            {application.status.toUpperCase()}
          </span>
        </p>
      </div>

      {application.status === 'approved' && (
        <div className="mt-6 text-center">
          <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition duration-200">
            Make Payment
          </button>
        </div>
      )}

      {application.status === 'rejected' && (
        <p className="text-red-600 mt-6 text-center font-medium">
          Unfortunately, your application has been rejected.
        </p>
      )}
    </div>
  );
}
