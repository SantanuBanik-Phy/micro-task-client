import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../../provider/AuthProvider';
import axios from 'axios';

const BuyerAddTask = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [previewImage, setPreviewImage] = useState(null); // State for image preview
    const imageHostKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const navigate = useNavigate();

    // Access the refetch function from DashboardLayout
    const { refetchUserCoins } = useOutletContext();

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
                            if (data.data.insertedId) {
                                toast.success('Task added successfully!');
                                refetchUserCoins(); // Refetch coins immediately after task addition
                                navigate('/dashboard/my-tasks');
                            }
                        })
                        .catch(err => {
                            if (err.response && err.response.status === 402) {
                                toast.error('Insufficient coins. Please purchase more coins.');
                                navigate('/dashboard/purchase-coin');
                            } else {
                                toast.error('Failed to add task. Please try again.');
                            }
                        });
                }
            })
            .catch(() => {
                toast.error('Image upload failed. Please try again.');
            });
    };

    return (
        <div className="container mx-auto  px-4 ">
        <Helmet>
          <title>Add Task - Micro Task Platform</title>
        </Helmet>
        <Toaster />
        <h2 className="lg:text-5xl text-3xl  font-extrabold text-gray-800 mb-2 text-center">Add New Task</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-lg rounded-lg p-6 space-y-6"
        >
          {/* Task title */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium text-gray-700">Task Title</span>
            </label>
            <input
              type="text"
              {...register("title", { required: "Task title is required" })}
              className="input input-bordered w-full focus:ring focus:ring-blue-500"
              placeholder="Enter task title"
            />
            {errors.title && <p className="text-red-500 mt-2">{errors.title.message}</p>}
          </div>
      
          {/* Task details */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium text-gray-700">Task Details</span>
            </label>
            <textarea
              {...register("detail", { required: "Task details are required" })}
              className="textarea textarea-bordered w-full focus:ring focus:ring-blue-500"
              placeholder="Describe the task in detail"
            />
            {errors.detail && <p className="text-red-500 mt-2">{errors.detail.message}</p>}
          </div>
      
          {/* Required workers */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium text-gray-700">Required Workers</span>
            </label>
            <input
              type="number"
              {...register("requiredWorkers", { required: "Required workers is required", min: 1 })}
              className="input input-bordered w-full focus:ring focus:ring-blue-500"
              placeholder="Enter the number of workers needed"
            />
            {errors.requiredWorkers && <p className="text-red-500 mt-2">{errors.requiredWorkers.message}</p>}
          </div>
      
          {/* Payable amount */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium text-gray-700">Payable Amount (per worker)</span>
            </label>
            <input
              type="number"
              {...register("payableAmount", { required: "Payable amount is required", min: 1 })}
              className="input input-bordered w-full focus:ring focus:ring-blue-500"
              placeholder="Enter the payable amount"
            />
            {errors.payableAmount && <p className="text-red-500 mt-2">{errors.payableAmount.message}</p>}
          </div>
      
          {/* Completion date */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium text-gray-700">Completion Date</span>
            </label>
            <input
              type="date"
              {...register("completionDate", { required: "Completion date is required" })}
              className="input input-bordered w-full focus:ring focus:ring-blue-500"
            />
            {errors.completionDate && <p className="text-red-500 mt-2">{errors.completionDate.message}</p>}
          </div>
      
          {/* Submission info */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium text-gray-700">Submission Info</span>
            </label>
            <textarea
              {...register("submissionInfo", { required: "Submission info is required" })}
              className="textarea textarea-bordered w-full focus:ring focus:ring-blue-500"
              placeholder="Provide submission instructions"
            />
            {errors.submissionInfo && <p className="text-red-500 mt-2">{errors.submissionInfo.message}</p>}
          </div>
      
          {/* Task image */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium text-gray-700">Task Image</span>
            </label>
            <input
              type="file"
              {...register("taskImageUrl", {
                required: "Task image is required",
                onChange: (e) => handleImagePreview(e.target.files[0]),
              })}
              className="file-input file-input-bordered w-full focus:ring focus:ring-blue-500"
            />
            {errors.taskImageUrl && <p className="text-red-500 mt-2">{errors.taskImageUrl.message}</p>}
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
      
          {/* Submit Button */}
          <div className="text-center">
            <input
              type="submit"
              className="btn bg-gradient-to-r  from-red-400 to-yellow-500  w-full py-2 text-lg font-semibold tracking-wide"
              value="Add Task"
            />
          </div>
        </form>
      </div>
      
    );
};

export default BuyerAddTask;
