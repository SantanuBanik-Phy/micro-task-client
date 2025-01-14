// src/pages/Shared/TaskDetails.jsx
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-hot-toast';

import { Helmet } from 'react-helmet';
import { AuthContext } from '../../provider/AuthProvider';

const TaskDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    

    const { data: task = {}, isLoading } = useQuery({
        queryKey: ['task', id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/api/tasks/${id}`);
            return res.data;
        }
    })

    const onSubmit = async (data) => {
        try {
            const submissionData = {
                taskId: id,
                submissionDetails: data.submissionDetails
            };
            const response = await axios.post('/api/submissions', submissionData);
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
        return <div>Loading...</div>
    }

    return (
        <div className="container mx-auto py-8">
            <Helmet>
                <title>Task Details - Micro Task Platform</title>
            </Helmet>
            <h2 className="text-2xl font-bold mb-4">Task Details</h2>
            <div className="card bg-base-100 shadow-xl">
                <figure><img src={task.taskImageUrl} alt="Task" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{task.title}</h2>
                    <p>{task.detail}</p>
                    <p>Required Workers: {task.requiredWorkers}</p>
                    <p>Payable Amount: {task.payableAmount}</p>
                    <p>Completion Date: {new Date(task.completionDate).toLocaleDateString()}</p>
                    <p>Submission Info: {task.submissionInfo}</p>
                </div>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Submit Task</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text">Submission Details</span>
                    </label>
                    <textarea
                        {...register("submissionDetails", { required: "Submission details are required" })}
                        className="textarea textarea-bordered w-full"
                    />
                    {errors.submissionDetails && <p className="text-red-500">{errors.submissionDetails.message}</p>}
                </div>
                <input type="submit" className="btn btn-primary" value="Submit" />
            </form>
        </div>
    );
};

export default TaskDetails;