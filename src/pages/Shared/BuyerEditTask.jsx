import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../../provider/AuthProvider';

const BuyerEditTask = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    // Get refetch function from DashboardLayout
    const { refetchUserCoins } = useOutletContext();

    // Fetch the task data
    const { data: task = {}, isLoading } = useQuery({
        queryKey: ['task', id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/api/tasks/${id}`);
            return res.data;
        },
    });

    // Mutation to update the task
    const { mutate: updateTask, isLoading: taskLoading } = useMutation({
        mutationFn: async (updatedData) => {
            const res = await axios.put(`http://localhost:3000/api/tasks/${id}`, updatedData);
            return res.data;
        },
        onSuccess: () => {
            toast.success('Task updated successfully!');
            refetchUserCoins(); // Refetch coins in DashboardLayout
            navigate('/dashboard/my-tasks');
        },
        onError: (error) => {
            console.error('Error updating task:', error);
            toast.error('Failed to update task. Please try again.');
        },
    });

    const onSubmit = (data) => {
        const updatedTask = {
            title: data.title,
            detail: data.detail,
            submissionInfo: data.submissionInfo, // Only these fields are updated
        };
        updateTask(updatedTask); // Update the task
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto py-8">
            <Helmet>
                <title>Edit Task - Micro Task Platform</title>
            </Helmet>
            <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Task title */}
                <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text">Task Title</span>
                    </label>
                    <input
                        type="text"
                        defaultValue={task?.title}
                        {...register("title", { required: "Task title is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                </div>

                {/* Task details */}
                <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text">Task Details</span>
                    </label>
                    <textarea
                        defaultValue={task?.detail}
                        {...register("detail", { required: "Task details are required" })}
                        className="textarea textarea-bordered w-full"
                    />
                    {errors.detail && <p className="text-red-500">{errors.detail.message}</p>}
                </div>

                {/* Submission info */}
                <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text">Submission Info</span>
                    </label>
                    <textarea
                        defaultValue={task?.submissionInfo}
                        {...register("submissionInfo", { required: "Submission info is required" })}
                        className="textarea textarea-bordered w-full"
                    />
                    {errors.submissionInfo && <p className="text-red-500">{errors.submissionInfo.message}</p>}
                </div>

                <input type="submit" className="btn btn-primary" value="Update Task" disabled={taskLoading} />
            </form>
        </div>
    );
};

export default BuyerEditTask;
