import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';

import { Helmet } from 'react-helmet';
import { AuthContext } from '../../provider/AuthProvider';

const WorkerMySubmissions = () => {
    const { user } = useContext(AuthContext);

    const { data: submissions = [], isLoading } = useQuery({
        queryKey: ['my-submissions', user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axios.get(`http://localhost:3000/api/submissions`, {
                params: { email: user.email }, // Pass the logged-in user's email as a query parameter
            });
            return res.data;
        },
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='p-10'>
            <Helmet>
                <title>My Submissions - Micro Task Platform</title>
            </Helmet>
            <h2 className="text-4xl font-bold text-center text-indigo-700 mb-10">
                My Submissions ({submissions.length})
            </h2>
            {
                submissions.length > 0 ?
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>Task Title</th>
                                    <th>Buyer Name</th>
                                    <th>Payable Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {submissions.map(submission => (
                                    <tr key={submission._id}>
                                        <td>{submission.taskTitle}</td>
                                        <td>{submission.buyerName}</td>
                                        <td>{submission.payableAmount}</td>
                                        <td>
                                            <span className={`badge ${submission.status === 'approved' ? 'badge-success' : submission.status === 'rejected' ? 'badge-error' : 'badge-info'}`}>
                                                {submission.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    :
                    <h2 className='text-2xl text-center font-semibold'>No submissions were added</h2>
            }
        </div>
    );
};

export default WorkerMySubmissions;
