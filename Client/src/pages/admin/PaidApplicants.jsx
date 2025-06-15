import React, { useEffect, useState } from 'react';
import { Search, Download, CreditCard, X } from 'lucide-react';
import API from "../../api";

const PaidApplicants = () => {
    const [payments, setPayments] = useState([]);
    const [filteredPayments, setFilteredPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPayment, setSelectedPayment] = useState(null); // For modal

    // Fetch data on mount
    useEffect(() => {
        const fetchPaidApplicants = async () => {
            try {
                const token = localStorage.getItem('token')
                const res = await API.get("/application/paid",{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const paymentsData = res.data.map(app => ({
                    id: app.stripeSessionId || app._id,
                    created: app.createdAt,
                    studentInfo: {
                        name: app.name,
                        regNo: app.regNo,
                        department: app.department,
                        session: app.session,
                        dorm: app.dorm,
                        email: app.email,
                        phone: app.phone,
                        room: app.room && app.room.block ?
                            `${app.room.block}-${app.room.room}-${app.room.seatNumber}` : "N/A"
                    },
                    paymentStatus: app.paid ? "Paid" : "Unpaid",
                    stripeSessionId: app.stripeSessionId,
                    stripePaymentIntentId: app.stripePaymentIntentId,
                }));
                setPayments(paymentsData);
                setFilteredPayments(paymentsData);
            } catch (err) {
                alert("Failed to fetch paid applicants.");
            } finally {
                setLoading(false);
            }
        };
        fetchPaidApplicants();
    }, []);

    // Search handler
    useEffect(() => {
        const filterPayments = () => {
            if (!searchQuery) {
                setFilteredPayments(payments);
                return;
            }

            const query = searchQuery.toLowerCase();
            const filtered = payments.filter(payment => {
                return (
                    payment.studentInfo.name.toLowerCase().includes(query) ||
                    payment.studentInfo.regNo.toLowerCase().includes(query) ||
                    payment.studentInfo.department.toLowerCase().includes(query) ||
                    payment.studentInfo.session.toLowerCase().includes(query) ||
                    payment.studentInfo.dorm.toLowerCase().includes(query) ||
                    payment.studentInfo.email.toLowerCase().includes(query) ||
                    payment.studentInfo.phone.toLowerCase().includes(query) ||
                    payment.id.toLowerCase().includes(query)
                );
            });

            setFilteredPayments(filtered);
        };

        filterPayments();
    }, [searchQuery, payments]);

    const handleSearchChange = (e) => setSearchQuery(e.target.value);

    const handleRefresh = async () => {
        const token = localStorage.getItem('token')
        setLoading(true);
        setSearchQuery('');
        const res = await API.get("/application/paid",{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            const paymentsData = res.data.map(app => ({
                id: app.stripeSessionId || app._id,
                created: app.createdAt,
                studentInfo: {
                    name: app.name,
                    regNo: app.regNo,
                    department: app.department,
                    session: app.session,
                    dorm: app.dorm,
                    email: app.email,
                    phone: app.phone,
                    room: app.room && app.room.block ? `${app.room.block}-${app.room.room}-${app.room.seatNumber}` : "N/A"
                },
                paymentStatus: app.paid ? "Paid" : "Unpaid",
                stripeSessionId: app.stripeSessionId,
                stripePaymentIntentId: app.stripePaymentIntentId,
            }));
            setPayments(paymentsData);
            setFilteredPayments(paymentsData);
            setLoading(false);
        });
    };

    const handleExport = () => {
        const header = [
            'Payment ID', 'Name', 'Reg No', 'Department', 'Session', 'Hall', 'Room', 'Email', 'Phone', 'Date'
        ];
        const rows = filteredPayments.map(p =>
            [
                p.id,
                p.studentInfo.name,
                p.studentInfo.regNo,
                p.studentInfo.department,
                p.studentInfo.session,
                p.studentInfo.dorm,
                p.studentInfo.room,
                p.studentInfo.email,
                p.studentInfo.phone,
                new Date(p.created).toLocaleString()
            ].join(',')
        );
        const csv = [header.join(','), ...rows].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'paid_applicants.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <h2 className="text-2xl font-bold text-gray-800">Paid Applicants</h2>
                <div className="flex space-x-2 mt-4 md:mt-0">
                    <button
                        onClick={handleRefresh}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Refresh
                    </button>
                    <button
                        onClick={handleExport}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center"
                    >
                        <Download size={16} className="mr-1" />
                        Export
                    </button>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by student name, reg no, or payment ID..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
            </div>

            {/* Payments Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Payment ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Student Details
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Session
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Hall
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredPayments.map((payment) => (
                                <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                                        {payment.id.substring(0, 20)}...
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{payment.studentInfo.name}</div>
                                        <div className="text-xs text-gray-500">{payment.studentInfo.regNo}</div>
                                        <div className="text-xs text-gray-500">{payment.studentInfo.department}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {payment.studentInfo.session}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {payment.studentInfo.dorm}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {payment.studentInfo.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(payment.created).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            className="text-blue-600 hover:text-blue-900"
                                            onClick={() => setSelectedPayment(payment)}
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredPayments.length === 0 && (
                    <div className="text-center py-12">
                        <CreditCard size={48} className="mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No payments found</h3>
                        <p className="text-gray-500">
                            {searchQuery ? 'Try adjusting your search criteria.' : 'No payments have been made yet.'}
                        </p>
                    </div>
                )}
            </div>

            {/* Modal for View Details */}
            {selectedPayment && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-7 relative">
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                            onClick={() => setSelectedPayment(null)}
                        >
                            <X size={25} />
                        </button>
                        <h3 className="text-xl font-bold text-blue-600">Payment Details</h3>
                        <div className="space-y-2 text-sm">
                            <div><b>Payment ID:</b> {selectedPayment.id}</div>
                            <div><b>Name:</b> {selectedPayment.studentInfo.name}</div>
                            <div><b>Reg No:</b> {selectedPayment.studentInfo.regNo}</div>
                            <div><b>Department:</b> {selectedPayment.studentInfo.department}</div>
                            <div><b>Session:</b> {selectedPayment.studentInfo.session}</div>
                            <div><b>Hall:</b> {selectedPayment.studentInfo.dorm}</div>
                            <div><b>Room:</b> {selectedPayment.studentInfo.room}</div>
                            <div><b>Email:</b> {selectedPayment.studentInfo.email}</div>
                            <div><b>Phone:</b> {selectedPayment.studentInfo.phone}</div>
                            <div><b>Date:</b> {new Date(selectedPayment.created).toLocaleString()}</div>
                            <div><b>Status:</b> {selectedPayment.paymentStatus}</div>
                            <div><b>Stripe Session ID:</b> {selectedPayment.stripeSessionId}</div>
                            <div><b>Stripe Payment Intent:</b> {selectedPayment.stripePaymentIntentId}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaidApplicants;