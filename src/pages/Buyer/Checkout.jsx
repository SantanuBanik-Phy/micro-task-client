// src/pages/Buyer/Checkout.jsx
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import CheckoutForm from '../../components/CheckoutForm';


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { coins, price } = location.state || {};

    if (!coins || !price) {
        navigate('/dashboard/purchase-coin');
        return null;
    }

    return (
        <div className="container mx-auto pb-6">
            <Helmet>
                <title>Checkout - Micro Task Platform</title>
            </Helmet>
            <h2 className="lg:text-5xl text-3xl font-bold text-center mb-6">Checkout</h2>
           
            <div className="max-w-lg mx-auto">
                <Elements stripe={stripePromise}>
                    <CheckoutForm price={price} coins={coins} />
                </Elements>
            </div>
        </div>
    );
};

export default Checkout;
