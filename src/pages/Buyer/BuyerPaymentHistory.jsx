import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../../provider/AuthProvider';

const BuyerPaymentHistory = () => {
    const { user } = useContext(AuthContext);

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
        <div className="container mx-auto  px-4 ">
            <Helmet>
                <title>Payment History - Micro Task Platform</title>
            </Helmet>
            <h2 className="text-4xl font-bold text-center text-black mb-10">Payment History</h2>
            {payments.length > 0 ? (
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="table-auto w-full border border-gray-200 rounded-lg min-w-[700px]">
                        <thead className="bg-indigo-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">#</th>
                                <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">Transaction ID</th>
                                <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">Coins Purchased</th>
                                <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">Amount Paid ($)</th>
                                <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => (
                                <tr key={payment.transactionId} className="hover:bg-gray-50 border-t">
                                    <td className="px-4 py-3 text-sm">{index + 1}</td>
                                    <td className="px-4 py-3 text-sm text-indigo-600 font-medium">{payment.transactionId}</td>
                                    <td className="px-4 py-3 text-sm">{payment.coins}</td>
                                    <td className="px-4 py-3 text-sm">${payment.price.toFixed(2)}</td>
                                    <td className="px-4 py-3 text-sm">{new Date(payment.date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <h2 className="text-2xl text-center font-semibold text-gray-500">No payment history found</h2>
            )}
        </div>
    );
};

export default BuyerPaymentHistory;
