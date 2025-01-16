import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';

import { Helmet } from 'react-helmet';
import ConfirmationModal from '../../components/ConfirmationModal';
import { AuthContext } from '../../provider/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';

const BuyerHome = () => {
    const { user } = useContext(AuthContext);
    const [modalInfo, setModalInfo] = useState(null);

    // Fetch stats for the buyer
    const { data: stats = {}, isLoading: statsLoading, refetch: refetchStats } = useQuery({
        queryKey: ['buyer-stats', user?.email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/users/stats?email=${user?.email}`);
            return res.data;
        },
    });

    // Fetch tasks for review
    const { data: tasks = [], isLoading: tasksLoading, refetch: refetchTasks } = useQuery({
        queryKey: ['tasks-review', user?.email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/tasks/review`, {
                params: { email: user?.email }, // Pass the email parameter
            });
            return res.data;
        },
    });

    // Approve task submission
    const handleApprove = async (submissionId, workerEmail, payableAmount) => {
        try {
            await axios.patch(`http://localhost:3000/api/submissions/${submissionId}/approve`);
            toast.success('Task approved successfully!');
            // Refetch stats and tasks
            await Promise.all([refetchStats(), refetchTasks()]);
        } catch (error) {
            console.error('Error approving submission:', error);
            toast.error('Failed to approve the task. Please try again.');
        }
    };

    // Handle reject task submission
    const handleReject = (submission) => {
        setModalInfo(submission);
    };

    // Confirm rejection
    const handleConfirmReject = async () => {
        try {
            await axios.patch(`http://localhost:3000/api/submissions/${modalInfo._id}/reject`);
            toast.success('Task rejected successfully!');
            // Refetch stats and tasks
            await Promise.all([refetchStats(), refetchTasks()]);
            setModalInfo(null);
        } catch (error) {
            console.error('Error rejecting submission:', error);
            toast.error('Failed to reject the task. Please try again.');
        }
    };

    if (statsLoading || tasksLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4 lg:p-8">
        <Helmet>
          <title>Buyer Home - Micro Task Platform</title>
        </Helmet>
        <Toaster />
        <h2 className="text-4xl font-extrabold text-indigo-700 mb-10 text-center">
          Welcome, {user?.displayName}
        </h2>
      
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {/* Total Tasks */}
          <div className="shadow-lg rounded-lg p-4 bg-indigo-50 flex items-center">
            <div className="stat-icon text-blue-500 mr-4">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                <path d="M12 7l-5 5h10z" />
              </svg>
            </div>
            <div>
              <div className="stat-title text-gray-500">Total Tasks</div>
              <div className="stat-value text-xl text-indigo-600">{stats.totalTasks || 0}</div>
            </div>
          </div>
      
          {/* Pending Tasks */}
          <div className="shadow-lg rounded-lg p-4 bg-yellow-50 flex items-center">
            <div className="stat-icon text-yellow-500 mr-4">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 4h16v2H4zM4 9h16v2H4zM4 14h16v2H4zM4 19h16v2H4z" />
              </svg>
            </div>
            <div>
              <div className="stat-title text-gray-500">Pending Tasks</div>
              <div className="stat-value text-xl text-yellow-600">{stats.pendingTasks || 0}</div>
            </div>
          </div>
      
          {/* Total Payments */}
          <div className="shadow-lg rounded-lg p-4 bg-green-50 flex items-center">
            <div className="stat-icon text-green-500 mr-4">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L1.8 21h20.4L12 2zm0 3.3L19.3 19H4.7L12 5.3z" />
                <path d="M11 16h2v2h-2zm0-8h2v6h-2z" />
              </svg>
            </div>
            <div>
              <div className="stat-title text-gray-500">Total Payments</div>
              <div className="stat-value text-xl text-green-600">${stats.totalPayments || 0}</div>
            </div>
          </div>
        </div>
      
        {/* Tasks to Review */}
        <div className="mt-10">
          <h3 className="text-2xl font-bold text-gray-700 mb-6">Tasks to Review</h3>
          {tasks.length > 0 ? (
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
              <table className="table-auto w-full border border-gray-200 rounded-lg min-w-[700px]">
                <thead className="bg-indigo-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">Worker Name</th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">Task Title</th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">Payable Amount</th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">Submission Details</th>
                    <th className="px-4 py-3 text-center text-sm font-bold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task._id} className="hover:bg-gray-50 border-t">
                      <td className="px-4 py-3 text-sm">{task.workerName}</td>
                      <td className="px-4 py-3 text-sm">{task.taskTitle}</td>
                      <td className="px-4 py-3 text-sm">${task.payableAmount}</td>
                      <td className="px-4 py-3 text-sm">{task.submissionDetails}</td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() =>
                              handleApprove(task._id, task.workerEmail, task.payableAmount)
                            }
                            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(task)}
                            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h2 className="text-xl font-semibold text-gray-500 text-center mt-6">
              No tasks to review
            </h2>
          )}
        </div>
      
        {modalInfo && (
          <ConfirmationModal
            title="Confirm Rejection"
            message={`Are you sure you want to reject ${modalInfo.workerName}'s submission for ${modalInfo.taskTitle}?`}
            closeModal={() => setModalInfo(null)}
            handleConfirmation={handleConfirmReject}
          />
        )}
      </div>
      
      


      
    );
};

export default BuyerHome;
