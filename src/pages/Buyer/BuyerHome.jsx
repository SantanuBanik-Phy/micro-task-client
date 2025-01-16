import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import ConfirmationModal from '../../components/ConfirmationModal';
import { AuthContext } from '../../provider/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';
import { FaTasks, FaRegClock, FaMoneyBillWave } from 'react-icons/fa';

const BuyerHome = () => {
    const { user } = useContext(AuthContext);
    const [modalInfo, setModalInfo] = useState(null);

    const { data: stats = {}, isLoading: statsLoading, refetch: refetchStats } = useQuery({
        queryKey: ['buyer-stats', user?.email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/users/stats?email=${user?.email}`);
            return res.data;
        },
    });

    const { data: tasks = [], isLoading: tasksLoading, refetch: refetchTasks } = useQuery({
        queryKey: ['tasks-review', user?.email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/tasks/review`, {
                params: { email: user?.email },
            });
            return res.data;
        },
    });

    const handleApprove = async (submissionId, workerEmail, payableAmount) => {
        try {
            await axios.patch(`http://localhost:3000/api/submissions/${submissionId}/approve`);
            toast.success('Task approved successfully!');
            await Promise.all([refetchStats(), refetchTasks()]);
        } catch (error) {
            console.error('Error approving submission:', error);
            toast.error('Failed to approve the task. Please try again.');
        }
    };

    const handleReject = (submission) => {
        setModalInfo(submission);
    };

    const handleConfirmReject = async () => {
        try {
            await axios.patch(`http://localhost:3000/api/submissions/${modalInfo._id}/reject`);
            toast.success('Task rejected successfully!');
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
        <div className="p-4 lg:p-8">
            <Helmet>
                <title>Buyer Home - Micro Task Platform</title>
            </Helmet>
            <Toaster />
            <h2 className="text-4xl font-extrabold text-indigo-700 mb-10 text-center">
                Welcome, {user?.displayName}
            </h2>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                <div className="shadow-lg rounded-lg p-4 bg-indigo-50 flex items-center">
                    <FaTasks className="text-blue-500 text-4xl mr-4" />
                    <div>
                        <div className="stat-title text-gray-500">Total Tasks</div>
                        <div className="stat-value text-xl text-indigo-600">{stats.totalTasks || 0}</div>
                    </div>
                </div>

                <div className="shadow-lg rounded-lg p-4 bg-yellow-50 flex items-center">
                    <FaRegClock className="text-yellow-500 text-4xl mr-4" />
                    <div>
                        <div className="stat-title text-gray-500">Pending Tasks</div>
                        <div className="stat-value text-xl text-yellow-600">{stats.pendingTasks || 0}</div>
                    </div>
                </div>

                <div className="shadow-lg rounded-lg p-4 bg-green-50 flex items-center">
                    <FaMoneyBillWave className="text-green-500 text-4xl mr-4" />
                    <div>
                        <div className="stat-title text-gray-500">Total Payments</div>
                        <div className="stat-value text-xl text-green-600">${stats.totalPayments || 0}</div>
                    </div>
                </div>
            </div>

            {/* Tasks to Review */}
            <div className="mt-10">
                <h3 className="text-2xl font-bold text-gray-700 mb-6">Tasks to Review</h3>
                {tasks.length > 0 ? (
                    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                        <table className="table-auto w-full border border-gray-200 rounded-lg min-w-[700px]">
                            <thead className="bg-indigo-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">Worker Name</th>
                                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">Task Title</th>
                                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">Payable Amount</th>
                                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">Submission Details</th>
                                    <th className="px-4 py-3 text-center text-sm font-bold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map((task) => (
                                    <tr key={task._id} className="hover:bg-gray-50 border-t">
                                        <td className="px-4 py-3 text-sm">{task.workerName}</td>
                                        <td className="px-4 py-3 text-sm">{task.taskTitle}</td>
                                        <td className="px-4 py-3 text-sm">${task.payableAmount}</td>
                                        <td className="px-4 py-3 text-sm">{task.submissionDetails}</td>
                                        <td className="px-4 py-3 text-center">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() =>
                                                        handleApprove(task._id, task.workerEmail, task.payableAmount)
                                                    }
                                                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleReject(task)}
                                                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
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
                    <h2 className="text-xl font-semibold text-gray-500 text-center mt-6">
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
