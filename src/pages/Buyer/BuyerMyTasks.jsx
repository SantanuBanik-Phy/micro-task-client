import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../../provider/AuthProvider';

const BuyerMyTasks = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // Get refetch function from DashboardLayout
    const { refetchUserCoins } = useOutletContext();

    // Fetch buyer tasks
    const { data: tasks = [], isLoading, refetch: refetchTasks } = useQuery({
        queryKey: ['buyer-tasks', user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axios.get(`http://localhost:3000/tasks/buyer?email=${user.email}`);
            return res.data;
        },
    });

    // Fetch buyer coin count
    const { data: buyerData } = useQuery({
        queryKey: ['buyer-coins', user?.email],
        queryFn: async () => {
            if (!user?.email) return { coins: 0 };
            const res = await axios.get(`http://localhost:3000/api/users/${user.email}`);
            return res.data;
        },
    });

    const handleUpdate = async (taskId) => {
        navigate(`/dashboard/edit-task/${taskId}`);
    };

    const handleDelete = async (taskId) => {
        const confirmed = window.confirm("Are you sure you want to delete this task?");
        if (!confirmed) return;

        try {
            await axios.delete(`http://localhost:3000/api/tasks/${taskId}`);
            toast.success('Task deleted successfully!');

            // Refetch tasks and buyer coins immediately
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
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner"></span>
            </div>
        );
    }

    return (
        <div className='p-8'>
            <Helmet>
                <title>{tasks.length > 0 ? `My Tasks (${tasks.length})` : 'No Tasks Found'} - Micro Task Platform</title>
            </Helmet>
            <h2 className="text-4xl font-bold text-center text-indigo-700 mb-10">My Tasks</h2>
           
            {tasks?.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Details</th>
                                <th>Required Workers</th>
                                <th>Payable Amount</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map(task => (
                                <tr key={task._id}>
                                    <td className="w-24">
                                        <img
                                            src={task.taskImageUrl || "https://via.placeholder.com/64"}
                                            alt={`Task ${task.title}`}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                    </td>
                                    <td>{task.title}</td>
                                    <td>{task.detail}</td>
                                    <td>{task.requiredWorkers}</td>
                                    <td>{task.payableAmount}</td>
                                    <td>
                                        <div className='flex flex-col sm:flex-row sm:items-center'>
                                            <Link
                                                to={`/dashboard/submission-list/${task._id}`}
                                                className="bg-green-500 text-white py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2 hover:bg-green-600 transition"
                                            >
                                                Submissions
                                            </Link>
                                            <button
                                                onClick={() => handleUpdate(task._id)}
                                                className="bg-yellow-500 text-white py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2 hover:bg-yellow-600 transition"
                                            >
                                                Update
                                            </button>
                                            <button
                                                onClick={() => handleDelete(task._id)}
                                                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <h2 className='text-2xl text-center font-semibold'>No tasks found</h2>
            )}
        </div>
    );
};

export default BuyerMyTasks;
