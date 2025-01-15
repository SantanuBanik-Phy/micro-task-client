import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { AuthContext } from '../provider/AuthProvider';
import { useOutletContext } from 'react-router-dom';

const CheckoutForm = ({ price, coins }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);

    // Access the refetch function from DashboardLayout
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

        const { data: clientSecretData } = await axios.post('http://localhost:3000/create-payment-intent', {
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

            await axios.post('http://localhost:3000/api/payments', paymentData);
            toast.success(`You successfully purchased ${coins} coins!`);

            // Refetch user coins after successful payment
            refetchUserCoins();
        }

        setProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Toaster></Toaster>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
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
            <button
                type="submit"
                disabled={!stripe || processing}
                className="btn btn-primary mt-4"
            >
                {processing ? 'Processing...' : `Pay $${price}`}
            </button>
        </form>
    );
};

export default CheckoutForm;
