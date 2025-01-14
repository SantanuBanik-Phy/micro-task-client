
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';


import { Helmet } from 'react-helmet';
import { AuthContext } from '../../provider/AuthProvider';

const BuyerPaymentHistory = () => {
   
    const { user } = useContext(AuthContext);

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payment-history', user?.email],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/api/payments');
            return res.data;
        }
    });

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className='p-10'>
            <Helmet>
                <title>Payment History - Micro Task Platform</title>
            </Helmet>
            <h2 className="text-4xl font-bold text-center text-indigo-700 mb-10">
                Payment History ({payments.length})
            </h2>
            {
                payments.length > 0 ?
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>Amount</th>
                                    <th>Payment Date</th>
                                    <th>Transaction ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map(payment => (
                                    <tr key={payment._id}>
                                        <td>${payment.amount}</td>
                                        <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
                                        <td>{payment.transactionId}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    :
                    <h2 className='text-2xl text-center font-semibold'>No payments were added</h2>
            }
        </div>
    );
};

export default BuyerPaymentHistory;