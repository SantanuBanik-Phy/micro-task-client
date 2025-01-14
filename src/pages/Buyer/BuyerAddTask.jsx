import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { Helmet } from 'react-helmet';
import { AuthContext } from '../../provider/AuthProvider';
import axios from 'axios';

const BuyerAddTask = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [previewImage, setPreviewImage] = useState(null); // State for image preview
    const imageHostKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const navigate = useNavigate();

    const handleImagePreview = (file) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImage(reader.result); // Set preview image URL
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data) => {
        const image = data.taskImageUrl[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then((imgData) => {
              
                if (imgData.success) {
                    const task = {
                        title: data.title,
                        detail: data.detail,
                        requiredWorkers: parseInt(data.requiredWorkers), // Convert to number
                        payableAmount: parseInt(data.payableAmount), 
                        completionDate: data.completionDate,
                        submissionInfo: data.submissionInfo,
                        taskImageUrl: imgData.data.url,
                        buyerEmail: user?.email,
                        buyerName: user?.displayName,
                        createdDate: new Date(),
                        status: 'pending',
                    };

                    axios
                        .post('http://localhost:3000/api/tasks', task)
                        .then(data => {
                            console.log(data.data);
                            if (data.data.insertedId) {
                                toast.success('Task added successfully!');
                                navigate('/dashboard/my-tasks');
                            }
                        })
                        .catch(err => {
                            console.error(err)
                            if (err.response && err.response.status === 402) {
                                toast.error('Insufficient coins. Please purchase more coins.');
                                navigate('/dashboard/purchase-coin');
                            } else {
                                toast.error('Failed to add task. Please try again.');
                            }
                        })
                }
            });
    };

    return (
        <div className="container mx-auto py-8">
            <Helmet>
                <title>Add Task - Micro Task Platform</title>
            </Helmet>
            <Toaster></Toaster>
            <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Task title */}
                <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text">Task Title</span>
                    </label>
                    <input
                        type="text"
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
                        {...register("taskImageUrl", {
                            required: "Task image is required",
                            onChange: (e) => handleImagePreview(e.target.files[0]), // Show preview on change
                        })}
                        className="file-input file-input-bordered w-full"
                    />
                    {errors.taskImageUrl && <p className="text-red-500">{errors.taskImageUrl.message}</p>}
                </div>

                {/* Image Preview */}
                {previewImage && (
                    <div className="mb-4">
                        <img
                            src={previewImage}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-lg border shadow-sm"
                        />
                    </div>
                )}

                <input type="submit" className="btn btn-primary" value="Add Task" />
            </form>
        </div>
    );
};

export default BuyerAddTask;
