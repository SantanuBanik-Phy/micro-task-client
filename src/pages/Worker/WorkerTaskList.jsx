import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading2 from '../../components/Loading2';
import { Link } from 'react-router-dom';

const WorkerTaskList = () => {
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const tasksPerPage = 9; // Number of tasks to display per page
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const [sortOrder, setSortOrder] = useState('asc'); // State for sorting

    const { data: tasks = [], isLoading } = useQuery({
        queryKey: ['worker-tasks'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/worker/tasks');
            return res.data;
        },
    });

    if (isLoading) {
        return <Loading2 />;
    }

    // Filter tasks based on the search term (title)
    const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort tasks by price in ascending or descending order
    const sortedTasks = filteredTasks.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.payableAmount - b.payableAmount;
        }
        return b.payableAmount - a.payableAmount;
    });

    // Calculate indices for slicing tasks
    const startIndex = (currentPage - 1) * tasksPerPage;
    const endIndex = startIndex + tasksPerPage;
    const currentTasks = sortedTasks.slice(startIndex, endIndex);
    const totalPages = Math.ceil(sortedTasks.length / tasksPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="p-4">
            <Helmet>
                <title>Task List - Micro Task Platform</title>
            </Helmet>
            <h2 className="text-4xl font-bold text-center text-black mb-10">
                Available Tasks ({filteredTasks.length})
            </h2>

            {/* Search and Sort Section */}
            <div className="flex justify-between items-center mb-6">
                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search tasks by title"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 border rounded-md w-1/2 sm:w-1/3"
                />

                {/* Sorting Options */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setSortOrder('asc')}
                        className={`px-4 py-2 rounded-md transition ${
                            sortOrder === 'asc'
                                ? 'bg-orange-500 text-white'
                                : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                    >
                        Sort by Price (Ascending)
                    </button>
                    <button
                        onClick={() => setSortOrder('desc')}
                        className={`px-4 py-2 rounded-md transition ${
                            sortOrder === 'desc'
                                ? 'bg-orange-500 text-white'
                                : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                    >
                        Sort by Price (Descending)
                    </button>
                </div>
            </div>

            {filteredTasks.length > 0 ? (
                <div>
                    {/* Tasks Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentTasks.map((task) => (
                            <div
                                key={task._id}
                                className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
                            >
                                {/* Task Image */}
                                <figure className="overflow-hidden">
                                    <img
                                        src={task.taskImageUrl || 'https://via.placeholder.com/150'}
                                        alt="Task"
                                        className="w-full h-40 object-cover"
                                    />
                                </figure>
                                {/* Task Content */}
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                                    <p className="text-gray-600 mt-2 text-sm">
                                        {task.detail.length > 100
                                            ? `${task.detail.substring(0, 100)}...`
                                            : task.detail}
                                    </p>
                                    <div className="mt-4 text-sm text-gray-700">
                                        <p>
                                            <span className="font-semibold">Required Workers:</span>{' '}
                                            {task.requiredWorkers}
                                        </p>
                                        <p>
                                            <span className="font-semibold">Payable Amount:</span> $
                                            {task.payableAmount}
                                        </p>
                                    </div>
                                </div>
                                {/* View Details Button */}
                                <div className="p-4 bg-indigo-50 flex justify-end">
                                    <Link
                                        to={`/dashboard/task-details/${task._id}`}
                                        className="bg-gradient-to-r from-red-400 to-yellow-500 text-white text-sm px-4 py-2 font-semibold rounded-md hover:bg-indigo-700 transition"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Pagination Controls */}
                    <div className="flex justify-center mt-6 space-x-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-4 py-2 rounded-md transition ${
                                    index + 1 === currentPage
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            ) : (
                <h2 className="text-2xl text-center font-semibold text-gray-500">
                    No tasks found
                </h2>
            )}
        </div>
    );
};

export default WorkerTaskList;
