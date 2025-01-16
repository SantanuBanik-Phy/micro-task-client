import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../../provider/AuthProvider';
import { FaClipboardList, FaHourglassHalf, FaDollarSign } from 'react-icons/fa';

const WorkerHome = () => {
    const { user } = useContext(AuthContext);

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
                params: { email: user.email, status: 'approved' },
            });
            return res.data;
        },
    });

    if (statsLoading || submissionsLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="px-4">
            <Helmet>
                <title>Worker Home - Micro Task Platform</title>
            </Helmet>
            <h2 className="text-4xl font-bold text-center text-indigo-700 mb-8">
                Welcome, {user?.displayName}
            </h2>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {/* Total Submissions */}
                <div className="shadow-lg rounded-lg p-4 bg-indigo-50 flex items-center">
                    <div className="stat-icon text-blue-500 mr-4">
                        <FaClipboardList className="w-12 h-12" />
                    </div>
                    <div>
                        <div className="stat-title text-gray-500">Total Submissions</div>
                        <div className="stat-value text-xl text-indigo-600">{stats.totalSubmissions || 0}</div>
                    </div>
                </div>

                {/* Pending Submissions */}
                <div className="shadow-lg rounded-lg p-4 bg-yellow-50 flex items-center">
                    <div className="stat-icon text-yellow-500 mr-4">
                        <FaHourglassHalf className="w-12 h-12" />
                    </div>
                    <div>
                        <div className="stat-title text-gray-500">Pending Submissions</div>
                        <div className="stat-value text-xl text-yellow-600">{stats.pendingSubmissions || 0}</div>
                    </div>
                </div>

                {/* Total Earnings */}
                <div className="shadow-lg rounded-lg p-4 bg-green-50 flex items-center">
                    <div className="stat-icon text-green-500 mr-4">
                        <FaDollarSign className="w-12 h-12" />
                    </div>
                    <div>
                        <div className="stat-title text-gray-500">Total Earnings</div>
                        <div className="stat-value text-xl text-green-600">${stats.totalEarnings || 0}</div>
                    </div>
                </div>
            </div>

            {/* Approved Submissions Section */}
            <div>
                <h2 className="text-2xl font-bold text-gray-700 mb-6">Approved Submissions</h2>
                {submissions.length > 0 ? (
                    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                        <table className="table-auto w-full border border-gray-200 rounded-lg min-w-[700px]">
                            <thead className="bg-indigo-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">Task Title</th>
                                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">Buyer Name</th>
                                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">Payable Amount</th>
                                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {submissions.map((submission) => (
                                    <tr key={submission._id} className="hover:bg-gray-50 border-t">
                                        <td className="px-4 py-3 text-sm">{submission.taskTitle}</td>
                                        <td className="px-4 py-3 text-sm">{submission.buyerName}</td>
                                        <td className="px-4 py-3 text-sm">${submission.payableAmount}</td>
                                        <td className="px-4 py-3 text-sm">
                                            <span
                                                className={`px-2 py-1 rounded-full text-white ${
                                                    submission.status === 'approved'
                                                        ? 'bg-green-500'
                                                        : submission.status === 'rejected'
                                                        ? 'bg-red-500'
                                                        : 'bg-yellow-500'
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
                    <h2 className="text-xl font-semibold text-gray-500 text-center">
                        No submissions were added
                    </h2>
                )}
            </div>
        </div>
    );
};

export default WorkerHome;