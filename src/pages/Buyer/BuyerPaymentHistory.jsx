import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../../provider/AuthProvider';


const BuyerPaymentHistory = () => {
    const { user } = useContext(AuthContext);

    // Fetch payment history for the logged-in user
    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payment-history', user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axios.get(`http://localhost:3000/api/payments?email=${user.email}`);
            return res.data;
        },
    });

    if (!user) {
        return <div className="text-center text-red-500">You must be logged in to view your payment history.</div>;
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner"></span>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8">
            <Helmet>
                <title>Payment History - Micro Task Platform</title>
            </Helmet>
            <h2 className="text-4xl font-bold text-center text-indigo-700 mb-10">Payment History</h2>
            {payments.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Transaction ID</th>
                                <th>Coins Purchased</th>
                                <th>Amount Paid ($)</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => (
                                <tr key={payment.transactionId}>
                                    <td>{index + 1}</td>
                                    <td>{payment.transactionId}</td>
                                    <td>{payment.coins}</td>
                                    <td>{payment.price.toFixed(2)}</td>
                                    <td>{new Date(payment.date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <h2 className="text-2xl text-center font-semibold">No payment history found</h2>
            )}
        </div>
    );
};

export default BuyerPaymentHistory;
