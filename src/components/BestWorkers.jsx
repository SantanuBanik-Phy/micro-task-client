import React from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaCoins } from 'react-icons/fa';

const BestWorkers = ({ workers, loading }) => {
    return (
        <div className="my-10 container mx-auto">
            <motion.h2
                className="text-4xl font-extrabold text-center mb-12 dark:text-white"
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
                            className="relative card bg-gradient-to-r from-blue-50 via-white to-blue-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 rounded-lg overflow-hidden"
                            variants={{
                                hidden: { opacity: 0, y: 50 },
                                visible: { opacity: 1, y: 0 },
                            }}
                        >
                            {/* Decorative Background SVG */}
                            <div className="absolute inset-0 opacity-10 pointer-events-none">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 1440 320"
                                    className="w-full h-full"
                                >
                                    <path
                                        fill="#00f"
                                        fillOpacity="0.2"
                                        d="M0,192L48,186.7C96,181,192,171,288,149.3C384,128,480,96,576,101.3C672,107,768,149,864,160C960,171,1056,149,1152,149.3C1248,149,1344,171,1392,181.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                                    ></path>
                                </svg>
                            </div>

                            {/* Card Content */}
                            <div className="relative card-body p-6 flex flex-col items-center text-center z-10">
                                <motion.div
                                    className="avatar mb-6"
                                    whileHover={{ scale: 1.2 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <div className="w-24 h-24 rounded-full ring ring-orange-400 ring-offset-base-100 ring-offset-4">
                                        <img src={worker.photoURL} alt={worker.name} />
                                    </div>
                                </motion.div>
                                <h3 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100 mb-2 flex items-center justify-center gap-2">
                                    <FaUser className="text-blue-500" /> {worker.name}
                                </h3>
                                <p className="text-lg font-medium text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2">
                                    <FaCoins className="text-yellow-500" />{" "}
                                    <span className="font-semibold">Coins:</span> {worker.coins}
                                </p>
                                {/* Decorative Divider */}
                                <div className="mt-4 w-20 h-1 bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 rounded"></div>

                                {/* Additional Decorative Icons */}
                                <div className="absolute -bottom-4 -right-4">
                                    <FaUser className="text-blue-500 opacity-20 text-8xl" />
                                </div>
                                <div className="absolute -top-4 -left-4">
                                    <FaCoins className="text-yellow-400 opacity-20 text-8xl" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default BestWorkers;
