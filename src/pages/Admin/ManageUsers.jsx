import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { FaTrashAlt } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading2 from '../../components/Loading2';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/users?role=admin');
      return res.data;
    },
  });

  const handleDelete = async (userId) => {
    try {
      await axiosSecure.delete(`/api/users/${userId}`, {
        params: { role: 'admin' },
      });
      toast.success('User deleted successfully!');
      refetch();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error(error?.response?.data?.error || 'Failed to delete user.');
    }
  };

  const handleRoleUpdate = async (userId, newRole) => {
    try {
      await axiosSecure.patch(
        `/api/users/${userId}/role`,
        { role: newRole },
        { params: { role: 'admin' } }
      );
      toast.success('User role updated successfully!');
      refetch();
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error(error?.response?.data?.error || 'Failed to update user role.');
    }
  };

  if (isLoading) {
    return (
      <Loading2></Loading2>
    );
  }

  return (
    <div className="px-4">
      <Helmet>
        <title>Manage Users - Micro Task Platform</title>
      </Helmet>
      <Toaster />
      <h2 className="lg:text-5xl text-3xl font-bold text-center text-black mb-10">
        Manage Users
      </h2>
      {users.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead className="bg-indigo-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">Image</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">Name</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">Email</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">Role</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">Coins</th>
                <th className="px-4 py-3 text-center text-sm font-bold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 border-t"
                >
                  <td className="px-4 py-3">
                    <img
                       referrerPolicy="no-referrer"
                      className="w-16 h-16 object-cover rounded-full border"
                      src={user?.photoURL || '/default-avatar.png'}
                      alt="User"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800">{user.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{user.email}</td>
                  <td className="px-4 py-3">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleUpdate(user._id, e.target.value)}
                      className="select select-bordered w-full"
                    >
                      <option value="admin">Admin</option>
                      <option value="buyer">Buyer</option>
                      <option value="worker">Worker</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800">{user.coins}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="flex items-center justify-center gap-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
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
        <h2 className="text-2xl text-center font-semibold text-gray-500">
          No users found
        </h2>
      )}
    </div>
  );
};

export default ManageUsers;