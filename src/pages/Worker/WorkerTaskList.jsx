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

    // Calculate indices for slicing tasks
    const startIndex = (currentPage - 1) * tasksPerPage;
    const endIndex = startIndex + tasksPerPage;
    const currentTasks = tasks.slice(startIndex, endIndex);
    const totalPages = Math.ceil(tasks.length / tasksPerPage);

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
                Available Tasks ({tasks.length})
            </h2>
            {tasks.length > 0 ? (
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
