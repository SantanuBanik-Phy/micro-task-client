import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const coinPackages = [
    { coins: 10, price: 1, image: 'https://i.ibb.co.com/rdmrTX2/coin.png' },
    { coins: 150, price: 10, image: 'https://i.ibb.co.com/rdmrTX2/coin.png' },
    { coins: 500, price: 20, image: 'https://i.ibb.co.com/rdmrTX2/coin.png' },
    { coins: 1000, price: 35, image: 'https://i.ibb.co.com/rdmrTX2/coin.png' },
];

const BuyerPurchaseCoin = () => {
    const navigate = useNavigate();

    const handlePurchase = (coins, price) => {
        navigate(`/dashboard/checkout`, { state: { coins, price } });
    };

    return (
        <div className="container mx-auto  px-4 ">
            <Helmet>
                <title>Purchase Coin - Micro Task Platform</title>
            </Helmet>
            <h2 className="text-4xl font-bold text-center text-black mb-10">Purchase Coins</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {coinPackages.map((pack, index) => (
                    <div
                        key={index}
                        className="card bg-gray-100 shadow-md rounded-lg  hover:shadow-lg transition"
                    >
                        <div className="card-body text-center">
                            {/* Coin Image */}
                            <div className="flex justify-center mb-4">
                                <img
                                    src={pack.image}
                                    alt={`${pack.coins} Coins`}
                                    className="w-16 h-16 rounded-full border border-gray-300"
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800">{pack.coins} Coins</h3>
                            <p className="text-2xl font-bold text-indigo-600">${pack.price}</p>
                            <p className="text-sm text-gray-600 mt-2">Best value for your tasks!</p>
                            <button
                                onClick={() => handlePurchase(pack.coins, pack.price)}
                                className="bg-gradient-to-r  from-red-400 to-yellow-500 text-black py-2 px-4 rounded-lg mt-4 w-full hover:bg-indigo-700 transition"
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
