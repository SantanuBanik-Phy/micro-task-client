
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-hot-toast';

import { Helmet } from 'react-helmet';
import { AuthContext } from '../../provider/AuthProvider';

const BuyerEditTask = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageHostKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const navigate = useNavigate();
  

    const { data: task = {}, isLoading } = useQuery({
        queryKey: ['task', id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/api/tasks/${id}`);
            return res.data;
        }
    })

    const { mutate: updateTask, isLoading: taskLoading } = useMutation({
        mutationFn: async (updatedData) => {
            const res = await axiosSecure.put(`/api/tasks/${id}`, updatedData);
            return res.data;
        },
        onSuccess: () => {
            toast.success('Task updated successfully!');
            navigate('/dashboard/my-tasks');
        },
        onError: (error) => {
            console.error('Error updating task:', error);
            toast.error('Failed to update task. Please try again.');
        }
    });

    const onSubmit = async (data) => {
        const image = data.taskImageUrl[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const updatedTask = {
                        title: data.title,
                        detail: data.detail,
                        requiredWorkers: data.requiredWorkers,
                        payableAmount: data.payableAmount,
                        completionDate: data.completionDate,
                        submissionInfo: data.submissionInfo,
                        taskImageUrl: imgData.data.url
                    }

                    updateTask(updatedTask);
                }
            })
            .catch(err => {
                console.error(err)
                toast.error('Failed to update task image. Please try again.');
            })
    };

    if (isLoading) {
        return <div>Loading...</div>
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

                {/* Required workers */}
                <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text">Required Workers</span>
                    </label>
                    <input
                        type="number"
                        defaultValue={task?.requiredWorkers}
                        {...register("requiredWorkers", { required: "Required workers is required", min: 1 })}
                        className="input input-bordered w-full"
                    />
                    {errors.requiredWorkers && <p className="text-red-500">{errors.requiredWorkers.message}</p>}
                </div>

                {/* Payable amount */}
                <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text">Payable Amount (per worker)</span>
                    </label>
                    <input
                        type="number"
                        defaultValue={task?.payableAmount}
                        {...register("payableAmount", { required: "Payable amount is required", min: 1 })}
                        className="input input-bordered w-full"
                    />
                    {errors.payableAmount && <p className="text-red-500">{errors.payableAmount.message}</p>}
                </div>

                {/* Completion date */}
                <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text">Completion Date</span>
                    </label>
                    <input
                        type="date"
                        defaultValue={task?.completionDate}
                        {...register("completionDate", { required: "Completion date is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.completionDate && <p className="text-red-500">{errors.completionDate.message}</p>}
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

                {/* Task image URL */}
                <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text">Task Image</span>
                    </label>
                    <input
                        type="file"
                        {...register("taskImageUrl", { required: "Task image is required" })}
                        className="file-input file-input-bordered w-full"
                    />
                    {errors.taskImageUrl && <p className="text-red-500">{errors.taskImageUrl.message}</p>}
                </div>

                <input type="submit" className="btn btn-primary" value="Update Task" disabled={taskLoading} />
            </form>
        </div>
    );
};

export default BuyerEditTask;