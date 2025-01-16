// src/pages/Admin/ManageTasks.jsx
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Toaster, toast } from 'react-hot-toast';

import { Helmet } from 'react-helmet';

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
        return <div>Loading...</div>
    }

    return (
        <div className='p-8'>
            <Helmet>
                <title>Manage Tasks - Micro Task Platform</title>
            </Helmet>
            <Toaster></Toaster>
            <h2 className="text-4xl font-bold text-center text-indigo-700 mb-10">Manage Tasks</h2>
            {
                tasks.length > 0 ?
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
                                                alt={task.title}
                                                className="w-16 h-16 object-cover rounded-lg"
                                            />
                                        </td>
                                        <td>{task.title}</td>
                                        <td>{task.detail}</td>
                                        <td>{task.requiredWorkers}</td>
                                        <td>{task.payableAmount}</td>
                                        <td>
                                            <button
                                                onClick={() => handleDelete(task._id)}
                                                className="btn btn-sm btn-error"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    :
                    <h2 className='text-2xl text-center font-semibold'>No tasks found</h2>
            }
        </div>
    );
};

export default ManageTasks;