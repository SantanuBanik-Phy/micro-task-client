
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';


import { Helmet } from 'react-helmet';
import ConfirmationModal from '../../components/ConfirmationModal';
import { AuthContext } from '../../provider/AuthProvider';

const BuyerHome = () => {

    const { user } = useContext(AuthContext);
    const [modalInfo, setModalInfo] = useState(null);

    const { data: stats = {}, isLoading: statsLoading } = useQuery({
        queryKey: ['buyer-stats', user?.email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/api/users/stats?email=${user?.email}`);
            return res.data;
        }
    });

    const { data: tasks = [], isLoading: tasksLoading, refetch } = useQuery({
        queryKey: ['tasks-review', user?.email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/api/tasks/review`);
            return res.data;
        }
    });

    const handleApprove = async (submissionId, workerEmail, payableAmount) => {
        try {
            await axios.patch(`http://localhost:3000/api/submissions/${submissionId}/approve`);
            refetch();
        } catch (error) {
            console.error('Error approving submission:', error);
            // Handle error, e.g., show a toast notification
        }
    };

    const handleReject = (submission) => {
        setModalInfo(submission);
    };

    const handleConfirmReject = async () => {
        try {
            await axios.patch(`http://localhost:3000/api/submissions/${modalInfo._id}/reject`);
            refetch();
            setModalInfo(null);
        } catch (error) {
            console.error('Error rejecting submission:', error);
            // Handle error, e.g., show a toast notification
        }
    };

    if (statsLoading || tasksLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className='p-8'>
            <Helmet>
                <title>Buyer Home - Micro Task Platform</title>
            </Helmet>
            <h2 className='text-4xl font-bold text-center text-indigo-700 mb-10'>Welcome, {user?.displayName}</h2>
            <div className="stats shadow w-full">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div className="stat-title">Total Tasks</div>
                    <div className="stat-value">{stats.totalTasks || 0}</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                    </div>
                    <div className="stat-title">Pending Tasks</div>
                    <div className="stat-value">{stats.pendingTasks || 0}</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                    </div>
                    <div className="stat-title">Total Payments</div>
                    <div className="stat-value">{stats.totalPayments || 0}</div>
                </div>
            </div>

            {/* Tasks to Review */}
            <div className="mt-10">
                <h3 className="text-2xl font-bold mb-4">Tasks to Review</h3>
                {
                    tasks.length > 0 ?
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
                                    {tasks.map(task => (
                                        <tr key={task._id}>
                                            <td>{task.workerName}</td>
                                            <td>{task.taskTitle}</td>
                                            <td>{task.payableAmount}</td>
                                            <td>{task.submissionDetails}</td>
                                            <td>
                                                <div className='flex flex-col sm:flex-row sm:items-center gap-2'>
                                                    <button
                                                        onClick={() => handleApprove(task._id, task.workerEmail, task.payableAmount)}
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
                        :
                        <h2 className='text-2xl text-center font-semibold'>No tasks to review</h2>
                }
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