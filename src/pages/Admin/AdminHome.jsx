import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../../provider/AuthProvider';
import { FaUsers, FaDollarSign, FaCoins, FaShoppingCart } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Pie } from 'react-chartjs-2'; // Import Pie chart component from react-chartjs-2
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';

import Loading2 from '../../components/Loading2';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale); // Register necessary chart.js components

const AdminHome = () => {
    const { user } = useContext(AuthContext);
    const [processingIds, setProcessingIds] = useState([]);
    const [successIds, setSuccessIds] = useState([]);
    const axiosSecure = useAxiosSecure();

    // Fetch admin stats
    const { data: stats = {}, isLoading: statsLoading, refetch: refetchStats } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/admin/stats', {
                params: { role: 'admin' },
            });
            return res.data;
        },
    });

    // Fetch pending withdrawal requests
    const { data: withdrawals = [], isLoading: withdrawalsLoading, refetch: refetchWithdrawals } = useQuery({
        queryKey: ['admin-withdrawals'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/withdrawals', {
                params: { role: 'admin' },
            });
            return res.data;
        },
    });

    // Handle approve withdrawal request
    const handleApproveWithdrawal = async (withdrawalId) => {
        if (processingIds.includes(withdrawalId)) {
            return;
        }

        setProcessingIds((prev) => [...prev, withdrawalId]);

        try {
            await axiosSecure.patch(`/admin/withdrawals/${withdrawalId}/approve`, null, {
                params: { role: 'admin' },
            });
            setSuccessIds((prev) => [...prev, withdrawalId]);
            toast.success('Withdrawal request approved!');
            await Promise.all([refetchWithdrawals(), refetchStats()]);
        } catch (error) {
            console.error('Error approving withdrawal request:', error);
            toast.error(error?.response?.data?.error || 'Failed to approve withdrawal request.');
        } finally {
            setProcessingIds((prev) => prev.filter((id) => id !== withdrawalId));
        }
    };

    if (statsLoading || withdrawalsLoading) {
        return <Loading2 />;
    }

    // Pie chart data
    const chartData = {
        labels: ['Workers', 'Buyers', 'Coins', 'Payments'],
        datasets: [
            {
                label: 'Admin Stats',
                data: [
                    stats.totalWorkers || 0,
                    stats.totalBuyers || 0,
                    stats.totalCoins || 0,
                    stats.totalPayments || 0,
                ],
                backgroundColor: ['#4B8F99', '#FF7043', '#F9A825', '#43A047'],
                borderColor: '#fff',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="px-4">
            <Helmet>
                <title>Admin Home - Micro Task Platform</title>
            </Helmet>
            <Toaster />
            <h2 className="lg:text-5xl text-3xl font-bold text-center text-black mb-10">
                Welcome, Admin <span className="text-blue-900">{user?.displayName}</span>
            </h2>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {/* Total Workers */}
                <div className="bg-white shadow-lg rounded-lg p-6 flex items-center hover:shadow-xl transition-all duration-300">
                    <FaUsers className="text-blue-500 w-12 h-12 mr-4" />
                    <div>
                        <p className="text-gray-500 font-medium">Total Workers</p>
                        <p className="text-xl font-bold text-indigo-600">{stats.totalWorkers || 0}</p>
                    </div>
                </div>
                {/* Total Buyers */}
                <div className="bg-white shadow-lg rounded-lg p-6 flex items-center hover:shadow-xl transition-all duration-300">
                    <FaShoppingCart className="text-green-500 w-12 h-12 mr-4" />
                    <div>
                        <p className="text-gray-500 font-medium">Total Buyers</p>
                        <p className="text-xl font-bold text-green-600">{stats.totalBuyers || 0}</p>
                    </div>
                </div>
                {/* Total Coins */}
                <div className="bg-white shadow-lg rounded-lg p-6 flex items-center hover:shadow-xl transition-all duration-300">
                    <FaCoins className="text-yellow-500 w-12 h-12 mr-4" />
                    <div>
                        <p className="text-gray-500 font-medium">Total Coins</p>
                        <p className="text-xl font-bold text-yellow-600">{stats.totalCoins || 0}</p>
                    </div>
                </div>
                {/* Total Payments */}
                <div className="bg-white shadow-lg rounded-lg p-6 flex items-center hover:shadow-xl transition-all duration-300">
                    <FaDollarSign className="text-red-500 w-12 h-12 mr-4" />
                    <div>
                        <p className="text-gray-500 font-medium">Total Payments</p>
                        <p className="text-xl font-bold text-red-600">${stats.totalPayments || 0}</p>
                    </div>
                </div>
            </div>

            {/* Pie Chart Section */}
            <div className="mb-10">
                <h3 className="text-2xl font-bold mb-4 text-center">Admin Stats Overview</h3>
                <div className="w-full h-80 bg-white shadow-lg rounded-lg p-4 mx-auto">
                    <Pie data={chartData} />
                </div>
            </div>

            {/* Withdrawal Requests */}
            <div>
                <h3 className="text-2xl font-bold mb-4">Withdrawal Requests</h3>
                {withdrawals.length > 0 ? (
                    <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                        <table className="table-auto w-full border-collapse border border-gray-200">
                            <thead className="bg-indigo-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">Worker Name</th>
                                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">Withdrawal Amount</th>
                                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">Payment System</th>
                                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">Account Number</th>
                                    <th className="px-4 py-3 text-center text-sm font-bold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {withdrawals.map((withdrawal) => (
                                    <tr key={withdrawal._id} className="hover:bg-gray-50 border-t">
                                        <td className="px-4 py-3">{withdrawal.workerName}</td>
                                        <td className="px-4 py-3">${withdrawal.withdrawalAmount}</td>
                                        <td className="px-4 py-3">{withdrawal.paymentSystem}</td>
                                        <td className="px-4 py-3">{withdrawal.accountNumber}</td>
                                        <td className="px-4 py-3 text-center">
                                            {successIds.includes(withdrawal._id) ? (
                                                <span className="badge badge-success ">Success</span>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        handleApproveWithdrawal(withdrawal._id)
                                                    }
                                                    className="btn btn-sm bg-green-500 text-white hover:bg-green-600"
                                                    disabled={
                                                        processingIds.includes(withdrawal._id) ||
                                                        withdrawal.status === 'approved'
                                                    }
                                                >
                                                    {processingIds.includes(withdrawal._id)
                                                        ? 'Processing...'
                                                        : 'Approve'}
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <h2 className="text-2xl text-center font-semibold">No withdrawal requests found</h2>
                )}
            </div>
        </div>
    );
};

export default AdminHome;
