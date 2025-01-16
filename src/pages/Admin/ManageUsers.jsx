
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Toaster, toast } from 'react-hot-toast';

import { Helmet } from 'react-helmet';

const ManageUsers = () => {
  

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/api/users');
            return res.data;
        }
    }); 

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:3000/api/users/${userId}`, {
                params: { role: 'admin' }, // Include role as a query parameter
            });
            toast.success('User deleted successfully!');
            refetch(); // Refetch users after deletion
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error(error?.response?.data?.error || 'Failed to delete user.');
        }
    };

    const handleRoleUpdate = async (userId, newRole) => {
        try {
            await axios.patch(
                `http://localhost:3000/api/users/${userId}/role`,
                { role: newRole }, // Pass the new role in the request body
                {
                    params: { role: 'admin' }, // Include role as a query parameter
                }
            );
            toast.success('User role updated successfully!');
            refetch(); // Refetch users after role update
        } catch (error) {
            console.error('Error updating user role:', error);
            toast.error(error?.response?.data?.error || 'Failed to update user role.');
        }
    };
    
    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className='p-8'>
            <Helmet>
                <title>Manage Users - Micro Task Platform</title>
            </Helmet>
            <Toaster></Toaster>
            <h2 className="text-4xl font-bold text-center text-indigo-700 mb-10">Manage Users</h2>
            {
                users.length > 0 ?
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Coins</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                         <td> <img  className="w-16 h-16 object-cover rounded-full " src={user?.photoURL || '/default-avatar.png'} alt="User" /></td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <select
                                                value={user.role}
                                                onChange={(e) => handleRoleUpdate(user._id, e.target.value)}
                                                className="select select-bordered w-full max-w-xs"
                                            >
                                                <option value="admin">Admin</option>
                                                <option value="buyer">Buyer</option>
                                                <option value="worker">Worker</option>
                                            </select>
                                        </td>
                                        <td>{user.coins}</td>
                                        <td>
                                            <button
                                                onClick={() => handleDelete(user._id)}
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
                    <h2 className='text-2xl text-center font-semibold'>No users found</h2>
            }
        </div>
    );
};

export default ManageUsers;