import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query'; // TanStack Query
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const UserProfile = () => {
    const { user, updateUser } = useContext(AuthContext);
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();

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
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <Toaster />
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h2 className="text-3xl font-bold text-center text-black mb-6">My Profile</h2>
                <div className="flex justify-center mb-6">
                    <img
                        referrerPolicy="no-referrer"
                        src={profileData?.photoURL || 'https://via.placeholder.com/150'}
                        alt="User Avatar"
                        className="w-24 h-24 rounded-full border shadow"
                    />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text font-medium text-gray-600">Name</span>
                        </label>
                        <input
                            type="text"
                            defaultValue={profileData?.name}
                            {...register('name', { required: 'Name is required' })}
                            className="input input-bordered w-full border-gray-300 rounded-md"
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
                            className="input input-bordered w-full border-gray-300 rounded-md"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn bg-gradient-to-r from-red-400 to-yellow-500 w-full py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserProfile;
