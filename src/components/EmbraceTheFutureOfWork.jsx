import React from 'react';
import Lottie from "lottie-react";
import futureOfWorkAnimation from '../assets/lottie/worker.json'; // Import Lottie file

const EmbraceTheFutureOfWork = () => {
    return (
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Lottie Animation */}
                    <div className="w-full lg:w-1/2">
                        <Lottie animationData={futureOfWorkAnimation} loop={true} />
                    </div>

                    {/* Text Content */}
                    <div className="w-full lg:w-1/2">
                        <h2 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-6 leading-tight">
                            Embrace the Future of Work
                        </h2>
                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                            The way we work is changing, and micro-tasking is at the forefront of this revolution. Our platform empowers you to be part of this exciting shift, offering a flexible and rewarding way to earn and contribute your skills.
                        </p>
                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 font-semibold">
                            Benefits of the Future of Work:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2">
                            <li><span className="font-bold">Work-Life Balance:</span> Integrate work seamlessly into your life, not the other way around.</li>
                            <li><span className="font-bold">Location Independence:</span> Work from anywhere with an internet connection.</li>
                            <li><span className="font-bold">Skill Diversification:</span> Develop a wider range of skills through diverse micro-tasks.</li>
                            <li><span className="font-bold">Income Control:</span> Take charge of your earnings and work as much or as little as you want.</li>
                            <li><span className="font-bold">Continuous Learning:</span> Stay relevant by constantly learning new skills and adapting to new challenges.</li>
                        </ul>
                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                            Join us and be part of the future of work, where flexibility, autonomy, and skill development are paramount.
                        </p>
                        <button className="px-6 py-3 bg-gradient-to-r from-red-400 to-yellow-400 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition duration-300">
                            Embrace the Change
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EmbraceTheFutureOfWork;
