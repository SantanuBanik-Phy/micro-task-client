
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';

import { Helmet } from 'react-helmet';

const BuyerSubmissionList = () => {
    const { id } = useParams();


    const { data: submissions = [], isLoading } = useQuery({
        queryKey: ['buyer-task-submissions', id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/api/submissions/task/${id}`);
            return res.data;
        }
    });

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className='p-8'>
            <Helmet>
                <title>Submission List - Micro Task Platform</title>
            </Helmet>
            <h2 className="text-4xl font-bold text-center text-indigo-700 mb-10">Submission List</h2>
            {
                submissions.length > 0 ?
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>Worker Name</th>
                                    <th>Worker Email</th>
                                    <th>Submission Details</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {submissions.map(submission => (
                                    <tr key={submission._id}>
                                        <td>{submission.workerName}</td>
                                        <td>{submission.workerEmail}</td>
                                        <td>{submission.submissionDetails}</td>
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
                    <h2 className='text-2xl text-center font-semibold'>No submissions found</h2>
            }
        </div>
    );
};

export default BuyerSubmissionList;