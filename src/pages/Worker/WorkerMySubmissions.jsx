import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../../provider/AuthProvider';

const WorkerMySubmissions = () => {
    const { user } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items per page

    const { data: submissions = [], isLoading } = useQuery({
        queryKey: ['my-submissions', user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axios.get(`http://localhost:3000/api/submissions`, {
                params: { email: user.email }, // Pass the logged-in user's email as a query parameter
            });
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full text-indigo-500"></div>
            </div>
        );
    }

    // Calculate pagination data
    const totalPages = Math.ceil(submissions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentSubmissions = submissions.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="px-4">
            <Helmet>
                <title>My Submissions - Micro Task Platform</title>
            </Helmet>
            <h2 className="text-4xl font-extrabold text-center text-black mb-8">
                My Submissions ({submissions.length})
            </h2>
            {currentSubmissions.length > 0 ? (
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
                            {currentSubmissions.map((submission) => (
                                <tr key={submission._id} className="hover:bg-gray-50 border-t">
                                    <td className="px-4 py-3 text-sm text-gray-700">{submission.taskTitle}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{submission.buyerName}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">${submission.payableAmount}</td>
                                    <td className="px-4 py-3 text-sm">
                                        <span
                                            className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${
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
                <h2 className="text-xl text-center font-semibold text-gray-500 mt-6">
                    No submissions found
                </h2>
            )}
            {/* Pagination */}
{totalPages > 1 && (
    <div className="flex justify-center items-center mt-6 space-x-2">
        <button
            className={`btn btn-sm ${
                currentPage === 1
                    ? 'btn-disabled'
                    : 'btn-outline bg-gradient-to-r from-red-400 to-yellow-500 text-white'
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
        >
            Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
            <button
                key={index + 1}
                className={`btn btn-sm ${
                    currentPage === index + 1
                        ? 'btn bg-gradient-to-r from-red-400 to-yellow-500  text-white'
                        : 'btn-outline'
                }`}
                onClick={() => handlePageChange(index + 1)}
            >
                {index + 1}
            </button>
        ))}
        <button
            className={`btn btn-sm ${
                currentPage === totalPages
                    ? 'btn-disabled'
                    : 'btn-outline bg-gradient-to-r from-red-400 to-yellow-500 text-white'
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
        >
            Next
        </button>
    </div>
)}
        </div>
    );
};

export default WorkerMySubmissions;
