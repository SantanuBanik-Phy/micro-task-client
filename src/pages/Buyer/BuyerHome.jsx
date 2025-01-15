import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';

import { Helmet } from 'react-helmet';
import ConfirmationModal from '../../components/ConfirmationModal';
import { AuthContext } from '../../provider/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';

const BuyerHome = () => {
    const { user } = useContext(AuthContext);
    const [modalInfo, setModalInfo] = useState(null);

    // Fetch stats for the buyer
    const { data: stats = {}, isLoading: statsLoading, refetch: refetchStats } = useQuery({
        queryKey: ['buyer-stats', user?.email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/users/stats?email=${user?.email}`);
            return res.data;
        },
    });

    // Fetch tasks for review
    const { data: tasks = [], isLoading: tasksLoading, refetch: refetchTasks } = useQuery({
        queryKey: ['tasks-review', user?.email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/tasks/review`, {
                params: { email: user?.email }, // Pass the email parameter
            });
            return res.data;
        },
    });

    // Approve task submission
    const handleApprove = async (submissionId, workerEmail, payableAmount) => {
        try {
            await axios.patch(`http://localhost:3000/api/submissions/${submissionId}/approve`);
            toast.success('Task approved successfully!');
            // Refetch stats and tasks
            await Promise.all([refetchStats(), refetchTasks()]);
        } catch (error) {
            console.error('Error approving submission:', error);
            toast.error('Failed to approve the task. Please try again.');
        }
    };

    // Handle reject task submission
    const handleReject = (submission) => {
        setModalInfo(submission);
    };

    // Confirm rejection
    const handleConfirmReject = async () => {
        try {
            await axios.patch(`http://localhost:3000/api/submissions/${modalInfo._id}/reject`);
            toast.success('Task rejected successfully!');
            // Refetch stats and tasks
            await Promise.all([refetchStats(), refetchTasks()]);
            setModalInfo(null);
        } catch (error) {
            console.error('Error rejecting submission:', error);
            toast.error('Failed to reject the task. Please try again.');
        }
    };

    if (statsLoading || tasksLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-8">
            <Helmet>
                <title>Buyer Home - Micro Task Platform</title>
            </Helmet>
            <Toaster></Toaster>
            <h2 className="text-4xl font-bold text-center text-indigo-700 mb-10">
                Welcome, {user?.displayName}
            </h2>
            <div className="stats shadow w-full">
                <div className="stat">
                    <div className="stat-title">Total Tasks</div>
                    <div className="stat-value">{stats.totalTasks || 0}</div>
                </div>
                <div className="stat">
                    <div className="stat-title">Pending Tasks</div>
                    <div className="stat-value">{stats.pendingTasks || 0}</div>
                </div>
                <div className="stat">
                    <div className="stat-title">Total Payments</div>
                    <div className="stat-value">{stats.totalPayments || 0}</div>
                </div>
            </div>

            {/* Tasks to Review */}
            <div className="mt-10">
                <h3 className="text-2xl font-bold mb-4">Tasks to Review</h3>
                {tasks.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>Worker Name</th>
                                    <th>Task Title</th>
                                    <th>Payable Amount</th>
                                    <th>Submission Details</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map((task) => (
                                    <tr key={task._id}>
                                        <td>{task.workerName}</td>
                                        <td>{task.taskTitle}</td>
                                        <td>{task.payableAmount}</td>
                                        <td>{task.submissionDetails}</td>
                                        <td>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                                <button
                                                    onClick={() =>
                                                        handleApprove(
                                                            task._id,
                                                            task.workerEmail,
                                                            task.payableAmount
                                                        )
                                                    }
                                                    className="bg-green-500 text-white py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2 hover:bg-green-600 transition"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleReject(task)}
                                                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <h2 className="text-2xl text-center font-semibold">
                        No tasks to review
                    </h2>
                )}
            </div>

            {modalInfo && (
                <ConfirmationModal
                    title="Confirm Rejection"
                    message={`Are you sure you want to reject ${modalInfo.workerName}'s submission for ${modalInfo.taskTitle}?`}
                    closeModal={() => setModalInfo(null)}
                    handleConfirmation={handleConfirmReject}
                />
            )}
        </div>
    );
};

export default BuyerHome;
