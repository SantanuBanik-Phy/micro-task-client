import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const WorkerTaskList = () => {
    const { data: tasks = [], isLoading } = useQuery({
        queryKey: ['worker-tasks'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/api/worker/tasks');
            return res.data; // Ensure no manual filtering here
        },
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='p-8'>
            <Helmet>
                <title>Task List - Micro Task Platform</title>
            </Helmet>
            <h2 className="text-4xl font-bold text-center text-indigo-700 mb-10">Available Tasks ({tasks.length})</h2>
            {
                tasks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {tasks.map(task => (
                            <div key={task._id} className="card bg-base-100 shadow-xl">
                                <figure><img src={task.taskImageUrl} alt="Task" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{task.title}</h2>
                                    <p>{task.detail}</p>
                                    <p>Required Workers: {task.requiredWorkers}</p>
                                    <p>Payable Amount: {task.payableAmount}</p>
                                    <div className="card-actions justify-end">
                                        <Link to={`/dashboard/task-details/${task._id}`} className="btn btn-primary">View Details</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <h2 className='text-2xl text-center font-semibold'>No tasks found</h2>
                )
            }
        </div>
    );
};

export default WorkerTaskList;
