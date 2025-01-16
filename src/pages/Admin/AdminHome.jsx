import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

import { Helmet } from 'react-helmet';
import { AuthContext } from '../../provider/AuthProvider';

const AdminHome = () => {
    const { user } = useContext(AuthContext);
    const [processingIds, setProcessingIds] = useState([]); // Track which buttons are being processed
    const [successIds, setSuccessIds] = useState([]); // Track successful approvals

    // Fetch admin stats
    const { data: stats = {}, isLoading: statsLoading, refetch: refetchStats } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/api/admin/stats', {
                params: { role: 'admin' }, // Include role parameter
            });
            return res.data;
        },
    });

    // Fetch pending withdrawal requests
    const { data: withdrawals = [], isLoading: withdrawalsLoading, refetch: refetchWithdrawals } = useQuery({
        queryKey: ['admin-withdrawals'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/admin/withdrawals', {
                params: { role: 'admin' }, // Include role parameter
            });
            return res.data;
        },
    });

    // Handle approve withdrawal request
    const handleApproveWithdrawal = async (withdrawalId, workerEmail, withdrawalCoin) => {
        if (processingIds.includes(withdrawalId)) {
            return; // Prevent duplicate processing
        }

        setProcessingIds((prev) => [...prev, withdrawalId]); // Add ID to processing list

        try {
            await axios.patch(
                `http://localhost:3000/admin/withdrawals/${withdrawalId}/approve`,
                null, // No body needed
                {
                    params: { role: 'admin' }, // Include role parameter
                }
            );
            setSuccessIds((prev) => [...prev, withdrawalId]); // Mark as success
            toast.success('Withdrawal request approved!');
            await Promise.all([refetchWithdrawals(), refetchStats()]); // Refetch data for both withdrawals and stats
        } catch (error) {
            console.error('Error approving withdrawal request:', error);
            toast.error(error?.response?.data?.error || 'Failed to approve withdrawal request.');
        } finally {
            setProcessingIds((prev) => prev.filter((id) => id !== withdrawalId)); // Remove ID from processing list
        }
    };

    if (statsLoading || withdrawalsLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-8">
            <Helmet>
                <title>Admin Home - Micro Task Platform</title>
            </Helmet>
            <Toaster></Toaster>
            <h2 className="text-4xl font-bold text-center text-indigo-700 mb-10">Welcome, Admin {user?.displayName}</h2>
            {/* Stats Section */}
            <div className="stats shadow w-full">
                {/* Stats Cards */}
                <div className="stat">
                    <div className="stat-title">Total Workers</div>
                    <div className="stat-value">{stats.totalWorkers || 0}</div>
                </div>
                <div className="stat">
                    <div className="stat-title">Total Buyers</div>
                    <div className="stat-value">{stats.totalBuyers || 0}</div>
                </div>
                <div className="stat">
                    <div className="stat-title">Total Coins</div>
                    <div className="stat-value">{stats.totalCoins || 0}</div>
                </div>
                <div className="stat">
                    <div className="stat-title">Total Payments</div>
                    <div className="stat-value">{stats.totalPayments || 0}</div>
                </div>
            </div>

            {/* Withdrawal Requests */}
            <div className="mt-8">
                <h3 className="text-2xl font-bold mb-4">Withdrawal Requests</h3>
                {withdrawals.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>Worker Name</th>
                                    <th>Withdrawal Amount</th>
                                    <th>Payment System</th>
                                    <th>Account Number</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {withdrawals.map((withdrawal) => (
                                    <tr key={withdrawal._id}>
                                        <td>{withdrawal.workerName}</td>
                                        <td>{withdrawal.withdrawalAmount}</td>
                                        <td>{withdrawal.paymentSystem}</td>
                                        <td>{withdrawal.accountNumber}</td>
                                        <td>
                                            {successIds.includes(withdrawal._id) ? (
                                                <span className="badge badge-success">Success</span>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        handleApproveWithdrawal(
                                                            withdrawal._id,
                                                            withdrawal.workerEmail,
                                                            withdrawal.withdrawalCoin
                                                        )
                                                    }
                                                    className="btn btn-sm btn-success"
                                                    disabled={
                                                        processingIds.includes(withdrawal._id) ||
                                                        withdrawal.status === 'approved'
                                                    } // Disable if processing or already approved
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
