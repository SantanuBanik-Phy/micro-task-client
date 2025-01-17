import React from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaCoins } from 'react-icons/fa';

const BestWorkers = ({ workers, loading }) => {
    return (
        <div className='my-10 container mx-auto '>
            <motion.h2
                className="text-4xl font-bold text-center mb-10 dark:text-gray-100"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Our Best Workers
            </motion.h2>

            {loading ? (
                <div className="flex justify-center">
                    <span className="loading loading-infinity loading-lg dark:text-gray-100"></span>
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
                                staggerChildren: 0.2,
                            },
                        },
                    }}
                >
                    {workers.map((worker) => (
                        <motion.div
                            key={worker._id}
                            className="card bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 shadow-2xl hover:shadow-lg transform hover:scale-105 transition-transform duration-300 rounded-lg"
                            variants={{
                                hidden: { opacity: 0, y: 50 },
                                visible: { opacity: 1, y: 0 },
                            }}
                        >
                            <div className="card-body p-6 text-center">
                                <motion.div
                                    className="avatar mb-6"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 1 }}
                                >
                                    <div className="w-24 h-24 rounded-full ring ring-orange-400 ring-offset-base-100 ring-offset-2">
                                        <img src={worker.photoURL} alt={worker.name} />
                                    </div>
                                </motion.div>
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 flex items-center justify-center gap-2">
                                    <FaUser className="text-blue-500" /> {worker.name}
                                </h3>
                                <p className="text-lg font-medium text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2">
                                    <FaCoins className="text-yellow-500" /> <span className="font-semibold">Coins:</span> {worker.coins}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default BestWorkers;
