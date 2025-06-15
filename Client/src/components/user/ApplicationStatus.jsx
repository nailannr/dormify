import React, { useEffect, useState } from 'react';
import API from '../../api';
import { loadStripe } from "@stripe/stripe-js";
import SustLogo from '../admin/SustLogo';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function ApplicationStatus() {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [paying, setPaying] = useState(false);
  const navigate = useNavigate();

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

  const handlePayment = async () => {
    setPaying(true);
    try {
      const res = await API.post("/payment/create-checkout-session", {
        studentId: application._id,
        studentName: application.name,
      });
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: res.data.id });
    } catch (err) {
      alert("Payment initiation failed.");
      setPaying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <SustLogo/>
        <h2 className="text-2xl font-extrabold text-emerald-700 mb-2 font-serif">Dormify</h2>
        <div className="text-emerald-700 text-lg font-semibold">Fetching your application status...</div>
        <div className="mt-4 animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (notFound || !application) {
    return (
      <div className="max-w-xl mx-auto bg-white shadow-md p-6 rounded-lg mt-10 text-center">
        <SustLogo/>
        <h2 className="text-2xl font-semibold text-emerald-700 mb-1 font-serif">Dormify</h2>
        <h3 className="text-xl font-bold text-gray-800 mb-3">No Application Found</h3>
        <p className="text-gray-600">You have not submitted any admission application yet.</p>
      </div>
    );
  }

  // Show thank you message if paid
  if (application.paid) {
    return (
      <div className="max-w-xl mx-auto bg-white shadow-md p-10 rounded-2xl mt-10 text-center">
        <SustLogo/>
        <h2 className="text-2xl font-semibold text-emerald-700 mb-4 font-serif">Dormify</h2>
        <h3 className="text-xl font-bold text-emerald-700 mb-6">Thanks for your payment!</h3>
        <p className="text-gray-700 text-lg">
          Your room number and room key information will be available soon!
        </p>
        <button
            className="mt-8 px-8 py-3 rounded-full bg-emerald-700 text-white font-semibold shadow-md transition hover:bg-emerald-800 active:scale-95"
            onClick={() => navigate("/user/home")}
          >
            Back to Home
          </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-2xl p-10 rounded-2xl mt-10">
      <div className="flex items-center mb-6">
        <SustLogo/>
        <span className="text-2xl font-extrabold text-emerald-700 font-serif tracking-wide">Dormify</span>
      </div>
      <h2 className="text-2xl font-bold text-emerald-700 mb-6">Admission Application Status</h2>

      <div className="space-y-3 text-gray-700 text-lg">
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
        <div className="mt-8 text-center">
          <button
            className="px-8 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full font-semibold text-lg shadow-lg transition duration-200"
            onClick={handlePayment}
            disabled={paying}
          >
            {paying ? "Processing..." : "Make Payment (2100 BDT)"}
          </button>
        </div>
      )}

      {application.status === 'rejected' && (
        <p className="text-red-600 mt-8 text-center font-medium text-lg">
          Unfortunately, your application has been rejected.
        </p>
      )}
    </div>
  );
}
