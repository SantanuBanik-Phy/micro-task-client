import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../../provider/AuthProvider';
import { FaClipboardList, FaHourglassHalf, FaDollarSign } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Loading2 from '../../components/Loading2';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WorkerHome = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading: statsLoading } = useQuery({
        queryKey: ['worker-stats', user?.email],
        queryFn: async () => {
            if (!user?.email) return {};
            const res = await axiosSecure.get(`/api/worker/stats`, {
                params: { email: user.email },
            });
            return res.data;
        },
    });

    const { data: submissions = [], isLoading: submissionsLoading } = useQuery({
        queryKey: ['approved-submissions', user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axiosSecure.get('/api/submissions', {
                params: { email: user.email, status: 'approved' },
            });
            return res.data;
        },
    });

    if (statsLoading || submissionsLoading) {
        return <Loading2 />;
    }

    // Chart data for stats
    const chartData = {
        labels: ['Total Submissions', 'Pending Submissions', 'Total Earnings'],
        datasets: [
            {
                label: 'Stats',
                data: [
                    stats.totalSubmissions || 0,
                    stats.pendingSubmissions || 0,
                    stats.totalEarnings || 0,
                ],
                backgroundColor: ['#3182CE', '#FFA500', '#D3D3D3'],  // Blue, Orange, and Grey
                borderColor: '#fff',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,  // Ensures the chart can scale properly
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#333',
                    font: {
                        weight: 'bold',
                    },
                },
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                titleColor: '#fff',
                bodyColor: '#fff',
            },
        },
        scales: {
            x: {
                grid: {
                    color: '#e4e4e4',
                },
                ticks: {
                    color: '#333',
                },
            },
            y: {
                grid: {
                    color: '#e4e4e4',
                },
                ticks: {
                    color: '#333',
                    beginAtZero: true,
                },
            },
        },
    };

    return (
        <div className="px-4">
            <Helmet>
                <title>Worker Home - Micro Task Platform</title>
            </Helmet>
            <h2 className="text-5xl font-bold text-center text-indigo-800 mb-8">
                Welcome, {user?.displayName}
            </h2>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {/* Total Submissions */}
                <div className="shadow-xl rounded-xl p-6 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center hover:shadow-2xl transition-shadow duration-300 ease-in-out">
                    <div className="stat-icon text-white mr-6">
                        <FaClipboardList className="w-14 h-14" />
                    </div>
                    <div>
                        <div className="stat-title text-white">Total Submissions</div>
                        <div className="stat-value text-2xl text-white">{stats.totalSubmissions || 0}</div>
                    </div>
                </div>

                {/* Pending Submissions */}
                <div className="shadow-xl rounded-xl p-6 bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center hover:shadow-2xl transition-shadow duration-300 ease-in-out">
                    <div className="stat-icon text-white mr-6">
                        <FaHourglassHalf className="w-14 h-14" />
                    </div>
                    <div>
                        <div className="stat-title text-white">Pending Submissions</div>
                        <div className="stat-value text-2xl text-white">{stats.pendingSubmissions || 0}</div>
                    </div>
                </div>

                {/* Total Earnings */}
                <div className="shadow-xl rounded-xl p-6 bg-gradient-to-r from-green-500 to-teal-500 flex items-center hover:shadow-2xl transition-shadow duration-300 ease-in-out">
                    <div className="stat-icon text-white mr-6">
                        <FaDollarSign className="w-14 h-14" />
                    </div>
                    <div>
                        <div className="stat-title text-white">Total Earnings</div>
                        <div className="stat-value text-2xl text-white">${stats.totalEarnings || 0}</div>
                    </div>
                </div>
            </div>

            {/* Graphical Stats */}
            <div className="mb-10">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Stats Overview</h2>
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <div style={{ height: '300px' }}> {/* Adjusted height for large screens */}
                        <Bar data={chartData} options={chartOptions} />
                    </div>
                </div>
            </div>

            {/* Approved Submissions Section */}
            <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Approved Submissions</h2>
                {submissions.length > 0 ? (
                    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                        <table className="table-auto w-full border border-gray-200 rounded-lg min-w-[700px]">
                            <thead className="bg-indigo-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-600">Task Title</th>
                                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-600">Buyer Name</th>
                                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-600">Payable Amount</th>
                                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-600">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {submissions.map((submission) => (
                                    <tr key={submission._id} className="hover:bg-gray-50 border-t">
                                        <td className="px-6 py-3 text-sm">{submission.taskTitle}</td>
                                        <td className="px-6 py-3 text-sm">{submission.buyerName}</td>
                                        <td className="px-6 py-3 text-sm">${submission.payableAmount}</td>
                                        <td className="px-6 py-3 text-sm">
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
