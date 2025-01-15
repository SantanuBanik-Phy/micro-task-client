
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';


import { Helmet } from 'react-helmet';
import { AuthContext } from '../../provider/AuthProvider';

const WorkerHome = () => {
    const { user } = useContext(AuthContext);

    // Fetch worker stats
    const { data: stats = {}, isLoading: statsLoading } = useQuery({
        queryKey: ['worker-stats', user?.email],
        queryFn: async () => {
            if (!user?.email) return {};
            const res = await axios.get(`http://localhost:3000/api/worker/stats`, {
                params: { email: user.email },
            });
            return res.data;
        },
    });

    const { data: submissions = [], isLoading: submissionsLoading } = useQuery({
        queryKey: ['approved-submissions', user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axios.get('http://localhost:3000/api/submissions', {
                params: { email: user.email, status: 'approved' }, // Pass email and status
            });
            return res.data;
        },
    });

    if (statsLoading || submissionsLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='px-5'>
            <Helmet>
                <title>Worker Home - Micro Task Platform</title>
            </Helmet>
            <h2 className='text-3xl font-bold text-center text-indigo-700'>
                Welcome, {user?.displayName}
            </h2>
            <div className="stats shadow w-full">
                <div className="stat">
                    <div className="stat-title">Total Submissions</div>
                    <div className="stat-value">{stats.totalSubmissions || 0}</div>
                </div>

                <div className="stat">
                    <div className="stat-title">Pending Submissions</div>
                    <div className="stat-value">{stats.pendingSubmissions || 0}</div>
                </div>

                <div className="stat">
                    <div className="stat-title">Total Earnings</div>
                    <div className="stat-value">{stats.totalEarnings || 0}</div>
                </div>
            </div>

            <div className='mt-10'>
                <h2 className="text-2xl font-bold mb-4">Approved Submissions</h2>
                {submissions.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>Task Title</th>
                                    <th>Buyer Name</th>
                                    <th>Payable Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {submissions.map((submission) => (
                                    <tr key={submission._id}>
                                        <td>{submission.taskTitle}</td>
                                        <td>{submission.buyerName}</td>
                                        <td>{submission.payableAmount}</td>
                                        <td>
                                            <span
                                                className={`badge ${
                                                    submission.status === 'approved'
                                                        ? 'badge-success'
                                                        : submission.status === 'rejected'
                                                        ? 'badge-error'
                                                        : 'badge-info'
                                                }`}
                                            >
                                                {submission.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <h2 className='text-2xl text-center font-semibold'>
                        No submissions were added
                    </h2>
                )}
            </div>
        </div>
    );
};

export default WorkerHome;
