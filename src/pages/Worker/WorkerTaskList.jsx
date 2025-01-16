import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const WorkerTaskList = () => {
    const { data: tasks = [], isLoading } = useQuery({
        queryKey: ['worker-tasks'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/api/worker/tasks');
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner"></span>
            </div>
        );
    }

    return (
        <div className="p-4">
            <Helmet>
                <title>Task List - Micro Task Platform</title>
            </Helmet>
            <h2 className="text-4xl font-bold text-center text-black mb-10">
                Available Tasks ({tasks.length})
            </h2>
            {tasks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tasks.map((task) => (
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
                                    className="bg-gradient-to-r  from-red-400 to-yellow-500 text-white text-sm px-4 py-2 font-semibold rounded-md hover:bg-indigo-700 transition"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
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
