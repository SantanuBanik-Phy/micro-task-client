// src/pages/Buyer/BuyerPurchaseCoin.jsx
import React from 'react';

import { Elements } from '@stripe/react-stripe-js';

import { Helmet } from 'react-helmet';



const coinPackages = [
    { coins: 10, price: 1 },
    { coins: 150, price: 10 },
    { coins: 500, price: 20 },
    { coins: 1000, price: 35 },
];

const BuyerPurchaseCoin = () => {
    const handlePayment = (price) => {
        console.log('Payment amount:', price);
        // Implement payment logic TODO: implement
    };

    return (
        <div className="container mx-auto py-8">
            <Helmet>
                <title>Purchase Coin - Micro Task Platform</title>
            </Helmet>
            <h2 className="text-2xl font-bold mb-4">Purchase Coins</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {coinPackages.map((pack, index) => (
                    <div key={index} className="card bg-base-100 shadow-xl">
                        <div className="card-body text-center">
                            <h3 className="text-xl font-semibold">{pack.coins} Coins</h3>
                            <p className="text-2xl font-bold">${pack.price}</p>
                            <div className="card-actions justify-center">
                                <button
                                    onClick={() => handlePayment(pack.price)}
                                    className="btn btn-primary"
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Stripe Payment */}
            {/* <div className="mt-8">
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div> */}
        </div>
    );
};

export default BuyerPurchaseCoin;