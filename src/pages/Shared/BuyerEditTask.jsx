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
        <div className="container mx-auto py-8 px-4 lg:px-8">
        <Helmet>
          <title>Edit Task - Micro Task Platform</title>
        </Helmet>
        <h2 className="lg:text-5xl text-3xl font-extrabold text-gray-800 mb-6 text-center">Edit Task</h2>
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
              defaultValue={task?.title}
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
              defaultValue={task?.detail}
              {...register("detail", { required: "Task details are required" })}
              className="textarea textarea-bordered w-full focus:ring focus:ring-blue-500"
              placeholder="Describe the task in detail"
            />
            {errors.detail && <p className="text-red-500 mt-2">{errors.detail.message}</p>}
          </div>
      
          {/* Submission info */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium text-gray-700">Submission Info</span>
            </label>
            <textarea
              defaultValue={task?.submissionInfo}
              {...register("submissionInfo", { required: "Submission info is required" })}
              className="textarea textarea-bordered w-full focus:ring focus:ring-blue-500"
              placeholder="Provide submission instructions"
            />
            {errors.submissionInfo && <p className="text-red-500 mt-2">{errors.submissionInfo.message}</p>}
          </div>
      
          {/* Submit Button */}
          <div className="text-center">
            <input
              type="submit"
              className={`btn w-full py-2 text-lg font-semibold tracking-wide ${
                taskLoading ? "btn-disabled" : " bg-gradient-to-r  from-red-400 to-yellow-500 "
              }`}
              value={taskLoading ? "Updating..." : "Update Task"}
              disabled={taskLoading}
            />
          </div>
        </form>
      </div>
      
    );
};

export default BuyerEditTask;
