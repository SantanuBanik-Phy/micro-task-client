// src/components/BestWorkers.jsx
import React from 'react';
import { motion } from 'framer-motion';

const BestWorkers = ({ workers, loading }) => {
    return (
        <div className='my-20 px-6'>
            <motion.h2 
                className="text-4xl font-bold text-center mb-10 text-gradient "
                initial={{ opacity: 0, y: -50 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6 }}
            >
                Our Best Workers
            </motion.h2>

            {loading ? (
                <div className="flex justify-center">
                    <span className="loading loading-infinity loading-lg"></span>
                </div>
            ) : (
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: {
                            opacity: 1,
                            scale: 1,
                            transition: {
                                delayChildren: 0.3,
                                staggerChildren: 0.2
                            }
                        }
                    }}
                >
                    {workers.map(worker => (
                        <motion.div 
                            key={worker._id} 
                            className="card bg-gradient-to-r from-gray-50 to-gray-100 shadow-2xl hover:shadow-lg transform hover:scale-105 transition-transform duration-300"
                            variants={{
                                hidden: { opacity: 0, y: 50 },
                                visible: { opacity: 1, y: 0 }
                            }}
                        >
                            <div className="card-body ">
                                <motion.div 
                                    className="avatar mb-4"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 1 }}
                                >
                                    <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={worker.photoURL} alt={worker.name} />
                                    </div>
                                </motion.div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">{worker.name}</h3>
                                <p className='text-lg font-medium text-gray-600'><span className='font-semibold'>Coins:</span> {worker.coins}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default BestWorkers;
