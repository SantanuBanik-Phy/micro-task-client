import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../../provider/AuthProvider';

const WorkerWithdrawals = () => {
    const { user } = useContext(AuthContext);
    const [coin, setCoin] = useState(0);
    const { register, handleSubmit, reset } = useForm();

    // Fetch worker data
    const { data: worker = {}, isLoading } = useQuery({
        queryKey: ['worker', user?.email],
        queryFn: async () => {
            if (!user?.email) return {};
            const res = await axios.get(`http://localhost:3000/api/users/${user?.email}`);
            return res.data;
        },
    });

    // Create a withdrawal request
    const { mutate: createWithdrawal, isLoading: withdrawalLoading } = useMutation({
        mutationFn: async (withdrawalData) => {
            const res = await axios.post('http://localhost:3000/api/withdrawals', withdrawalData);
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
            workerEmail: user?.email, // Pass the worker's email
            withdrawalCoin: data.withdrawalCoin,
            withdrawalAmount: coin / 20, // Calculate withdrawal amount
            paymentSystem: data.paymentSystem,
            accountNumber: data.accountNumber,
        };

        createWithdrawal(withdrawalData);
    };

    const handleCoinChange = (e) => {
        setCoin(parseInt(e.target.value));
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto py-8">
            <Helmet>
                <title>Withdrawals - Micro Task Platform</title>
            </Helmet>
            <Toaster></Toaster>
            <h2 className="text-2xl font-bold mb-4">Withdrawals</h2>

            <div className="bg-base-100 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Your Earnings</h3>
                <div className="flex items-center mb-6">
                    <div className="stat-figure text-secondary mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    </div>
                    <div>
                        <p className="text-lg font-medium">Available Coins:</p>
                        <p className="text-2xl font-bold text-primary">{worker.coins || 0}</p>
                    </div>
                </div>
                <h3 className="text-xl font-semibold mb-4">Withdrawal Form</h3>
                <form onSubmit={handleSubmit(handleWithdrawal)}>
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text">Coins to Withdraw</span>
                        </label>
                        <input
                            type="number"
                            {...register("withdrawalCoin", {
                                required: "Withdrawal coin is required",
                                min: 200,
                                max: worker.coins,
                                onChange: (e) => handleCoinChange(e),
                            })}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text">Withdrawal Amount ($)</span>
                        </label>
                        <input
                            type="number"
                            value={coin / 20}
                            readOnly
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text">Payment System</span>
                        </label>
                        <select
                            {...register("paymentSystem", { required: "Payment system is required" })}
                            className="select select-bordered w-full"
                        >
                            <option value="bkash">Bkash</option>
                            <option value="rocket">Rocket</option>
                            <option value="nagad">Nagad</option>
                        </select>
                    </div>
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text">Account Number</span>
                        </label>
                        <input
                            type="text"
                            {...register("accountNumber", { required: "Account number is required" })}
                            className="input input-bordered w-full"
                        />
                    </div>
                    {worker.coins < 200 && <p className='text-red-500 text-center'>Insufficient coin</p>}
                    <input type="submit" className="btn btn-primary w-full" value="Withdraw" disabled={withdrawalLoading || worker.coins < 200} />
                </form>
            </div>
        </div>
    );
};

export default WorkerWithdrawals;
