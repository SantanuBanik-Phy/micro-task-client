
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { FaTrashAlt } from 'react-icons/fa';

const ManageTasks = () => {
    const { data: tasks = [], isLoading, refetch } = useQuery({
        queryKey: ['admin-tasks'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/api/admin/tasks', {
                params: { role: 'admin' }, // Pass the role as a query parameter
            });
            return res.data;
        },
    });

    const handleDelete = async (taskId) => {
        try {
            await axios.delete(`http://localhost:3000/api/admin/tasks/${taskId}`, {
                params: { role: 'admin' }, // Pass the role as a query parameter
            });
            toast.success('Task deleted successfully!');
            refetch(); // Refetch tasks after deletion
        } catch (error) {
            console.error('Error deleting task:', error);
            toast.error('Failed to delete task.');
        }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-64">Loading...</div>;
    }

    return (
        <div className="px-4">
            <Helmet>
                <title>Manage Tasks - Micro Task Platform</title>
            </Helmet>
            <Toaster />
            <h2 className="text-4xl font-bold text-center text-black mb-10">Manage Tasks</h2>
            {
                tasks.length > 0 ? (
                    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                        <table className="table-auto w-full border border-gray-200 rounded-lg">
                            <thead className="bg-indigo-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">Image</th>
                                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">Title</th>
                                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">Details</th>
                                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">Required Workers</th>
                                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">Payable Amount</th>
                                    <th className="px-4 py-3 text-center text-sm font-bold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map(task => (
                                    <tr key={task._id} className="hover:bg-gray-50 border-t">
                                        <td className="px-4 py-3">
                                            <img
                                                src={task.taskImageUrl || "https://via.placeholder.com/64"}
                                                alt={task.title}
                                                className="w-16 h-16 object-cover rounded-lg"
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-sm">{task.title}</td>
                                        <td className="px-4 py-3 text-sm">{task.detail}</td>
                                        <td className="px-4 py-3 text-sm">{task.requiredWorkers}</td>
                                        <td className="px-4 py-3 text-sm">${task.payableAmount}</td>
                                        <td className="px-4 py-3 text-center">
                                            <button
                                                onClick={() => handleDelete(task._id)}
                                                className="flex items-center gap-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                                            >
                                                <FaTrashAlt /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <h2 className="text-2xl text-center font-semibold">No tasks found</h2>
                )
            }
        </div>
    );
};

export default ManageTasks;
