import React, { useEffect, useState } from "react";
import sustLogo from "../../assets/sustLogo.png";
import propic from "../../assets/propic.jpeg";
import { Eye, EyeOff } from "lucide-react";
import API from "../../api";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
    const [tab, setTab] = useState("profile");
    const [user, setUser] = useState({});
    const [application, setApplication] = useState({});
    const [loading, setLoading] = useState(true);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [passwordTouched, setPasswordTouched] = useState(false);

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);


    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserAndApplication = async () => {
            try {
                const token = localStorage.getItem("token");
                const [userRes, appRes] = await Promise.all([
                    API.get("/user/me", { headers: { Authorization: `Bearer ${token}` } }),
                    API.get("/application/mine", { headers: { Authorization: `Bearer ${token}` } }),
                ]);
                setUser(userRes.data);
                setApplication(appRes.data);
            } catch (err) {
                console.error("Error loading user/application data:", err);
                alert("Failed to load profile data.");
            } finally {
                setLoading(false);
            }
        };
        fetchUserAndApplication();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!currentPassword || !newPassword || !confirmNewPassword) {
            return alert("Please fill in all password fields");
        }

        if (newPassword !== confirmNewPassword) {
            return alert("New passwords do not match");
        }

        try {
            const token = localStorage.getItem("token");
            await API.post(
                "/user/change-password",
                { currentPassword, newPassword },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("Password updated successfully. Please log in again.");

            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("userName");
            localStorage.removeItem("email");
            localStorage.removeItem("registrationNo");
            localStorage.removeItem("changePass");

            navigate("/user/login");
        } catch (err) {
            alert(err.response?.data?.message || "Failed to change password");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-lg text-gray-600">
                Loading profile...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-100 to-emerald-100 flex flex-col">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 flex items-center px-6 py-3">
                <img src={sustLogo} alt="SUST Logo" className="w-10 h-10 mr-3" />
                <div className="text-lg font-semibold text-emerald-700">Dormify - Student Portal</div>
            </header>

            {/* Main Content */}
            <main className="flex flex-col items-center justify-center flex-1 pt-28 pb-10">
                <div
                    className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-12 flex flex-row items-stretch border-2 border-emerald-200"
                    style={{ minHeight: "520px" }}
                >
                    {/* Profile Picture */}
                    <div className="flex-shrink-0 flex flex-col items-center mr-10">
                        <img
                            src={propic}
                            alt="Profile"
                            className="w-40 h-40 rounded-xl border-2 border-emerald-300 object-cover shadow"
                        />
                        <div className="mt-4 text-xl font-bold text-emerald-700">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.role || "student"}</div>
                    </div>

                    {/* Card Content */}
                    <div className="flex-1 flex flex-col h-full">
                        <div className="flex-1 flex flex-col">
                            {tab === "profile" && (
                                <div className="w-full max-w-md space-y-6 mx-auto pt-6">
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-emerald-700">Name:</span>
                                        <span className="text-gray-700 ml-2">{user.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-emerald-700">Registration No:</span>
                                        <span className="text-gray-700 ml-2">{application.regNo || "N/A"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-emerald-700">Email:</span>
                                        <span className="text-gray-700 ml-2">{user.email}</span>
                                    </div>
                                    <div style={{ height: "120px" }}></div>
                                </div>
                            )}

                            {tab === "security" && (
                                <form className="w-full max-w-md space-y-4 mx-auto pt-6 flex flex-col" onSubmit={handleUpdate}>
                                    {/* Current Password */}
                                    <div className="relative">
                                        <label className="block text-sm text-gray-700 mb-1">Current Password</label>
                                        <input
                                            type={showCurrent ? "text" : "password"}
                                            className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 pr-10"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            placeholder="Enter your current password"
                                            required
                                        />
                                        <span
                                            className="absolute top-9 right-3 cursor-pointer text-gray-500"
                                            onClick={() => setShowCurrent(!showCurrent)}
                                        >
                                            {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </span>
                                    </div>



                                    {/* New Password */}
                                    
                                    <div className="relative">
                                        <label className="block text-sm text-gray-700 mb-1">New Password</label>
                                        <input
                                            type={showNew ? "text" : "password"}
                                            className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 pr-10"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="Enter new password"
                                            required
                                        />
                                        <span
                                            className="absolute top-9 right-3 cursor-pointer text-gray-500"
                                            onClick={() => setShowNew(!showNew)}
                                        >
                                            {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </span>
                                    </div>


                                    {/* Confirm Password */}
                                    <div className="relative">
                                        <label className="block text-sm text-gray-700 mb-1">Confirm New Password</label>
                                        <input
                                            type={showConfirm ? "text" : "password"}
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 pr-10 ${passwordTouched && confirmNewPassword !== newPassword ? "border-red-400" : "border-emerald-200"
                                                }`}
                                            value={confirmNewPassword}
                                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                                            onBlur={() => setPasswordTouched(true)}
                                            placeholder="Re-enter new password"
                                            required
                                        />
                                        <span
                                            className="absolute top-9 right-3 cursor-pointer text-gray-500"
                                            onClick={() => setShowConfirm(!showConfirm)}
                                        >
                                            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </span>

                                        {passwordTouched && confirmNewPassword !== newPassword && (
                                            <p className="text-sm text-red-500 mt-1">Passwords do not match</p>
                                        )}
                                    </div>


                                    <button
                                        type="submit"
                                        className="mt-4 px-6 py-2 bg-emerald-700 text-white rounded-full font-semibold shadow hover:bg-emerald-800 transition self-end"
                                    >
                                        Update
                                    </button>
                                    <div style={{ height: "60px" }}></div>
                                </form>
                            )}
                        </div>

                        {/* Bottom Tab Buttons */}
                        <div className="flex gap-4 justify-start mt-auto mb-2 pl-10">
                            <button
                                className={`px-4 py-2 rounded-full font-semibold ${tab === "profile" ? "bg-emerald-700 text-white" : "bg-emerald-100 text-emerald-700"
                                    }`}
                                onClick={() => setTab("profile")}
                                type="button"
                            >
                                Profile Information
                            </button>
                            <button
                                className={`px-4 py-2 rounded-full font-semibold ${tab === "security" ? "bg-emerald-700 text-white" : "bg-emerald-100 text-emerald-700"
                                    }`}
                                onClick={() => setTab("security")}
                                type="button"
                            >
                                Security Settings
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
