import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading2 from '../../components/Loading2';

const TaskDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { data: task = {}, isLoading } = useQuery({
        queryKey: ['task', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/tasks/${id}`);
            return res.data;
        }
    });

    const onSubmit = async (data) => {
        try {
            const submissionData = {
                taskId: id,
                submissionDetails: data.submissionDetails,
                workerEmail: user?.email,
                workerName: user?.displayName,
            };

            const response = await axiosSecure.post('/api/submissions', submissionData);
            if (response.status === 201) {
                toast.success('Submission created successfully!');
                navigate('/dashboard/my-submissions');
            }
        } catch (error) {
            console.error('Error creating submission:', error);
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.error);
            } else {
                toast.error('Failed to create submission. Please try again.');
            }
        }
    };

    if (isLoading) {
        return (
            <Loading2></Loading2>
        );
    }

    return (
        <div className="container mx-auto px-4 ">
            <Helmet>
                <title>Task Details - Micro Task Platform</title>
            </Helmet>
            <Toaster></Toaster>
            <h2 className="text-4xl font-bold text-black mb-8 text-center">Task Details</h2>

            {/* Task Card */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
                <figure className="overflow-hidden">
                    <img
                        src={task.taskImageUrl || 'https://via.placeholder.com/600'}
                        alt="Task"
                        className="w-full h-64 object-cover"
                    />
                </figure>
                <div className="p-6">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">{task.title}</h3>
                    <p className="text-gray-600 mb-2">
                        <span className="font-semibold">Details:</span> {task.detail}
                    </p>
                    <p className="text-gray-600 mb-2">
                        <span className="font-semibold">Required Workers:</span> {task.requiredWorkers}
                    </p>
                    <p className="text-gray-600 mb-2">
                        <span className="font-semibold">Payable Amount:</span> ${task.payableAmount}
                    </p>
                    <p className="text-gray-600 mb-2">
                        <span className="font-semibold">Completion Date:</span>{' '}
                        {new Date(task.completionDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Submission Info:</span> {task.submissionInfo}
                    </p>
                </div>
            </div>

            {/* Submission Form */}
            <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Submit Task</h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-md rounded-lg p-6 space-y-6"
            >
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-gray-700 font-semibold">Submission Details</span>
                    </label>
                    <textarea
                        {...register('submissionDetails', { required: 'Submission details are required' })}
                        className="textarea textarea-bordered w-full h-32 resize-none"
                    />
                    {errors.submissionDetails && (
                        <p className="text-red-500 mt-1">{errors.submissionDetails.message}</p>
                    )}
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-gradient-to-r  from-red-400 to-yellow-500 text-white font-semibold py-3 px-6 rounded-md shadow-md hover:bg-indigo-700 transition"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TaskDetails;
