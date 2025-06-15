import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from '../../api';
import SustLogo from '../admin/SustLogo';

export default function PaymentSuccess() {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [status, setStatus] = useState("Verifying payment...");
    const navigate = useNavigate();

    useEffect(() => {
        const confirmPayment = async () => {
            try {
                const res = await API.post("/payment/confirm", { session_id: sessionId });
                if (res.data.success) {
                    setStatus("Thank you for your payment! Your room number and room key information will be available soon!");
                    setTimeout(() => navigate("/user/applicationStatus"), 5000);
                } else {
                    setStatus("Payment not completed. Please contact support.");
                }
            } catch (err) {
                setStatus("Error verifying payment. Please contact support.");
            }
        };
        if (sessionId) confirmPayment();
        else setStatus("No payment session found.");
    }, [sessionId, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-emerald-50">
            <div className="bg-white rounded-xl shadow-2xl p-10 text-center max-w-lg">
                <SustLogo />
                <h2 className="text-2xl font-bold text-emerald-700 mb-4">Payment Status</h2>
                <p className="text-lg text-gray-700 mb-4">{status}</p>
                <button
                    onClick={() => navigate("/user/applicationStatus")}
                    className="text-emerald-700 font-semibold underline mt-4"
                >
                    Go to Application Status
                </button>
            </div>
        </div>
    );
}
