import React, { useContext, useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../../provider/AuthProvider';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading2 from '../../components/Loading2';

const BuyerMyTasks = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [modalTaskId, setModalTaskId] = useState(null);
    const axiosSecure = useAxiosSecure();

    // Get refetch function from DashboardLayout
    const { refetchUserCoins } = useOutletContext();

    // Fetch buyer tasks
    const { data: tasks = [], isLoading, refetch: refetchTasks } = useQuery({
        queryKey: ['buyer-tasks', user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axiosSecure.get(`/tasks/buyer?email=${user.email}`);
            return res.data;
        },
    });

    const handleUpdate = async (taskId) => {
        navigate(`/dashboard/edit-task/${taskId}`);
    };

    const handleDelete = async () => {
        try {
            await axiosSecure.delete(`/api/tasks/${modalTaskId}`);
            toast.success('Task deleted successfully!');
            setModalTaskId(null); 

            // Refetch tasks and buyer coins
            refetchTasks();
            refetchUserCoins();
        } catch (error) {
            console.error('Error deleting task:', error);
            toast.error('Failed to delete task.');
        }
    };

    if (!user) {
        return <div className="text-center text-red-500">You must be logged in to view your tasks.</div>;
    }

    if (isLoading) {
        return (
           <Loading2></Loading2>
        );
    }

    return (
        <div className="p-4">
            <Helmet>
                <title>{tasks.length > 0 ? `My Tasks (${tasks.length})` : 'No Tasks Found'} - Micro Task Platform</title>
            </Helmet>
            <Toaster />
            <h2 className="lg:text-5xl text-3xl font-extrabold text-center text-black mb-8">My Tasks</h2>

            {tasks?.length > 0 ? (
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="table-auto w-full border border-gray-200 rounded-lg min-w-[700px]">
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
                            {tasks.map((task) => (
                                <tr key={task._id} className="hover:bg-gray-50 border-t">
                                    <td className="px-4 py-3 w-24">
                                        <img
                                            src={task.taskImageUrl || 'https://via.placeholder.com/64'}
                                            alt={`Task ${task.title}`}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                    </td>
                                    <td className="px-4 py-3 text-sm">{task.title}</td>
                                    <td className="px-4 py-3 text-sm">{task.detail}</td>
                                    <td className="px-4 py-3 text-sm">{task.requiredWorkers}</td>
                                    <td className="px-4 py-3 text-sm">${task.payableAmount}</td>
                                    <td className="px-4 py-3 text-center">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => handleUpdate(task._id)}
                                                className="flex items-center gap-1 bg-gradient-to-r  from-orange-400 to-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition"
                                            >
                                                <FaEdit /> Update
                                            </button>
                                            <button
                                                onClick={() => setModalTaskId(task._id)}
                                                className="flex items-center gap-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                                            >
                                                <FaTrashAlt /> Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <h2 className="text-2xl text-center font-semibold text-gray-500">No tasks found</h2>
            )}

            {/* Delete Confirmation Modal */}
            {modalTaskId && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Confirm Deletion</h2>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete this task? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                                onClick={() => setModalTaskId(null)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BuyerMyTasks;
