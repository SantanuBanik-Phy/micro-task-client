import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query'; // TanStack Query
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const UserProfile = () => {
    const { user, updateUser } = useContext(AuthContext);
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

    // Fetch profile data with TanStack Query
    const { data: profileData = {}, refetch } = useQuery({
        queryKey: ['profileData', user?.email], // Unique key for the query
        queryFn: async () => {
            const response = await axiosSecure.get(`/users/profile?email=${user.email}`);
            return response.data;
        },
        enabled: !!user?.email, // Fetch only if the email exists
        onError: (error) => {
            console.error('Error fetching profile data:', error);
            toast.error('Failed to fetch profile data.');
        },
    });

    const onSubmit = async (data) => {
        try {
            const response = await axiosSecure.patch(`/users/profile?email=${user.email}`, data);
            if (response.status === 200) {
                // Update Firebase user profile
                await updateUser({ displayName: data.name, photoURL: data.photoURL });

                toast.success('Profile updated successfully!');
                refetch(); // Refetch data to update the UI
                reset();
                setIsModalOpen(false); // Close the modal after successful update
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <Toaster />
            {/* Profile Card */}
            <div className="w-full max-w-xl bg-white  rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                <div className="bg-gradient-to-r from-red-500 to-yellow-400 h-52  flex items-center justify-center">
                    <h2 className="text-xl font-bold text-white tracking-wide">
                        Welcome, {profileData?.name || 'User'}
                    </h2>
                </div>
                <div className="flex flex-col items-center -mt-16 p-10">
                    <img
                        referrerPolicy="no-referrer"
                        src={profileData?.photoURL || 'https://via.placeholder.com/150'}
                        alt="User Avatar"
                        className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
                    />
                    <h2 className="mt-4 text-2xl font-semibold text-gray-800">{profileData?.name || 'Name Not Found'}</h2>
                    <p className="text-gray-500 text-sm">{profileData?.email}</p>
                    <p className="text-gray-400 text-xs mt-1">
                        Last Login Time: {new Date(profileData?.lastLogin || Date.now()).toUTCString()}
                    </p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-6 btn bg-gradient-to-r from-red-500 to-yellow-500 text-white px-6 py-2 rounded-md hover:shadow-lg hover:from-red-600 hover:to-yellow-600 transition-transform transform hover:scale-105"
                    >
                        Update Profile
                    </button>
                </div>
            </div>

            {/* Update Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 animate-fade-in-down">
                        <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">Update Profile</h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control w-full mb-4">
                                <label className="label">
                                    <span className="label-text font-medium text-gray-600">Name</span>
                                </label>
                                <input
                                    type="text"
                                    defaultValue={profileData?.name}
                                    {...register('name', { required: 'Name is required' })}
                                    className="input input-bordered w-full border-gray-300 rounded-md focus:ring focus:ring-indigo-300"
                                />
                            </div>

                            <div className="form-control w-full mb-4">
                                <label className="label">
                                    <span className="label-text font-medium text-gray-600">Photo URL</span>
                                </label>
                                <input
                                    type="text"
                                    defaultValue={profileData?.photoURL}
                                    {...register('photoURL', { required: 'Photo URL is required' })}
                                    className="input input-bordered w-full border-gray-300 rounded-md focus:ring focus:ring-indigo-300"
                                />
                            </div>

                            <div className="flex items-center justify-between mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="btn bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 hover:shadow-md transition-transform transform hover:scale-105"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn bg-gradient-to-r from-red-500 to-yellow-500 text-white px-6 py-2 rounded-md hover:from-red-600 hover:to-yellow-600 hover:shadow-lg transition-transform transform hover:scale-105"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
