import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading2 from '../../components/Loading2';

const WorkerWithdrawals = () => {
    const { user } = useContext(AuthContext);
    const [coin, setCoin] = useState(0);
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();

    // Fetch worker data
    const { data: worker = {}, isLoading } = useQuery({
        queryKey: ['worker', user?.email],
        queryFn: async () => {
            if (!user?.email) return {};
            const res = await axiosSecure.get(`/api/users/${user?.email}`);
            return res.data;
        },
    });

    // Create a withdrawal request
    const { mutate: createWithdrawal, isLoading: withdrawalLoading } = useMutation({
        mutationFn: async (withdrawalData) => {
            const res = await axiosSecure.post('/api/withdrawals', withdrawalData);
            return res.data;
        },
        onSuccess: () => {
            toast.success('Withdrawal request submitted successfully!');
            reset();
        },
        onError: (error) => {
            console.error('Error creating withdrawal request:', error);
            toast.error(error?.response?.data?.error || 'Failed to create withdrawal request.');
        },
    });

    const handleWithdrawal = (data) => {
        const withdrawalData = {
            workerEmail: user?.email,
            withdrawalCoin: data.withdrawalCoin,
            withdrawalAmount: coin / 20,
            paymentSystem: data.paymentSystem,
            accountNumber: data.accountNumber,
        };

        createWithdrawal(withdrawalData);
    };

    const handleCoinChange = (e) => {
        setCoin(parseInt(e.target.value));
    };

    if (isLoading) {
        return (
           <Loading2></Loading2>
        );
    }

    return (
        <div className="container mx-auto px-4 ">
            <Helmet>
                <title>Withdrawals - Micro Task Platform</title>
            </Helmet>
            <Toaster />
            <h2 className="text-4xl font-bold text-center text-black mb-8">Withdrawals</h2>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-700">Your Earnings</h3>
                        <p className="text-sm text-gray-500">Manage your withdrawals efficiently</p>
                    </div>
                    <div className="bg-indigo-100 p-4 rounded-lg shadow-inner">
                        <p className="text-black-600 font-semibold">Available Coins:</p>
                        <p className="text-2xl font-bold text-orange-500">{worker.coins || 0}</p>
                    </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-700 mb-4">Withdrawal Form</h3>
                <form onSubmit={handleSubmit(handleWithdrawal)} className="space-y-4">
                    {/* Coins to Withdraw */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-gray-700 font-medium">Coins to Withdraw</span>
                        </label>
                        <input
                            type="number"
                            {...register('withdrawalCoin', {
                                required: 'Withdrawal coin is required',
                                min: 200,
                                max: worker.coins,
                                onChange: handleCoinChange,
                            })}
                            className="input input-bordered w-full"
                            placeholder="Enter coins"
                        />
                        {worker.coins < 200 && (
                            <p className="text-red-500 text-sm mt-1">Insufficient coins (min 200 required)</p>
                        )}
                    </div>

                    {/* Withdrawal Amount */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-gray-700 font-medium">Withdrawal Amount ($)</span>
                        </label>
                        <input
                            type="number"
                            value={coin / 20 || 0}
                            readOnly
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Payment System */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-gray-700 font-medium">Payment System</span>
                        </label>
                        <select
                            {...register('paymentSystem', { required: 'Payment system is required' })}
                            className="select select-bordered w-full"
                        >
                            <option value="bkash">Bkash</option>
                            <option value="rocket">Rocket</option>
                            <option value="nagad">Nagad</option>
                            <option value="upay">Upay</option>
                        </select>
                    </div>

                    {/* Account Number */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-gray-700 font-medium">Account Number</span>
                        </label>
                        <input
                            type="text"
                            {...register('accountNumber', { required: 'Account number is required' })}
                            className="input input-bordered w-full"
                            placeholder="Enter account number"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
    type="submit"
    disabled={withdrawalLoading || worker.coins < 200}
    className={`w-full font-semibold py-3 rounded-md shadow-md transition ${
        worker.coins < 200
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-red-400 to-yellow-500 text-white hover:bg-indigo-700'
    }`}
>
    {withdrawalLoading ? 'Processing...' : 'Withdraw'}
</button>
                </form>
            </div>
        </div>
    );
};

export default WorkerWithdrawals;
