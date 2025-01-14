// src/components/BestWorkers.jsx
import React from 'react';

const BestWorkers = ({ workers, loading }) => {
    return (
        <div className='my-20'>
            <h2 className="text-4xl font-bold text-center mb-10">Our Best Workers</h2>
            {loading ? (
                <div className="flex justify-center">
                    <span className="loading loading-infinity loading-lg"></span>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {workers.map(worker => (
                        <div key={worker._id} className="card bg-base-100 shadow-xl">
                            <div className="card-body text-center">
                                <div className="avatar">
                                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={worker.photoURL} alt={worker.name} />
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold">{worker.name}</h3>
                                <p className='text-xl font-semibold'>Coins: {worker.coins}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BestWorkers;