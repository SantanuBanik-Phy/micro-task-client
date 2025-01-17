import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { AuthContext } from '../provider/AuthProvider';
import { useOutletContext } from 'react-router-dom';
import useAxiosSecure from '../hooks/useAxiosSecure';

const CheckoutForm = ({ price, coins }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { refetchUserCoins } = useOutletContext();

    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (!card) return;

        setProcessing(true);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
            billing_details: {
                name: user?.displayName || 'Anonymous',
                email: user?.email || 'anonymous@example.com',
            },
        });

        if (error) {
            toast.error(error.message);
            setProcessing(false);
            return;
        }

        const { data: clientSecretData } = await axiosSecure.post('/create-payment-intent', {
            price,
        });

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecretData.clientSecret, {
            payment_method: paymentMethod.id,
        });

        if (confirmError) {
            toast.error(confirmError.message);
            setProcessing(false);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);
            const paymentData = {
                email: user?.email,
                coins,
                price,
                transactionId: paymentIntent.id,
            };

            await axiosSecure.post('/api/payments', paymentData);
            toast.success(`You successfully purchased ${coins} coins!`);

            refetchUserCoins();
        }

        setProcessing(false);
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg mx-auto">
            <Toaster />
            <h2 className="text-2xl font-bold text-center text-indigo-700 mb-4">Complete Your Payment</h2>
            <p className="text-center text-gray-600 mb-6">
                You are purchasing <span className="font-semibold">{coins} Coins</span> for 
                <span className="font-semibold"> ${price}</span>.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border border-gray-300 rounded-lg p-3">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    fontFamily: 'Arial, sans-serif',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>
                <button
                    type="submit"
                    disabled={!stripe || processing}
                    className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
                >
                    {processing ? 'Processing...' : `Pay $${price}`}
                </button>
            </form>
            {transactionId && (
                <p className="text-green-600 text-center mt-4">
                    Payment Successful! Transaction ID: <span className="font-semibold">{transactionId}</span>
                </p>
            )}
        </div>
    );
};

export default CheckoutForm;
