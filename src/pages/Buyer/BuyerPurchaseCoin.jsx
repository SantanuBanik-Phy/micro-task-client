import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';



const coinPackages = [
    { coins: 10, price: 1 },
    { coins: 150, price: 10 },
    { coins: 500, price: 20 },
    { coins: 1000, price: 35 },
];

const BuyerPurchaseCoin = () => {
    const navigate = useNavigate();

    const handlePurchase = (coins, price) => {
        navigate(`/dashboard/checkout`, { state: { coins, price } });
    };

    return (
        <div className="container mx-auto py-8">
            <Helmet>
                <title>Purchase Coin - Micro Task Platform</title>
            </Helmet>
            <h2 className="text-4xl font-bold text-center text-indigo-700 mb-10">Purchase Coins</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {coinPackages.map((pack, index) => (
                    <div key={index} className="card bg-white shadow-lg border rounded-lg p-6">
                        <div className="card-body text-center">
                            <h3 className="text-2xl font-semibold text-gray-800">{pack.coins} Coins</h3>
                            <p className="text-3xl font-bold text-indigo-600">${pack.price}</p>
                            <p className="text-gray-500 mt-2">Best value for your tasks!</p>
                            <button
                                onClick={() => handlePurchase(pack.coins, pack.price)}
                                className="btn btn-primary mt-4 w-full"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BuyerPurchaseCoin;
