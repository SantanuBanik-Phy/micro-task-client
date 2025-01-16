import React from 'react';
import CountUp from 'react-countup';
import { FaTasks, FaUsers, FaCoins } from 'react-icons/fa';

const ReactCountUp = () => {
    return (
        <section className="py-16">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
                    Our Impact
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Tasks Completed */}
                    <div className="flex flex-col items-center p-8 bg-white shadow-lg rounded-lg border border-indigo-200">
                        <FaTasks className="text-indigo-600 text-5xl mb-4" />
                        <h4 className="text-lg font-semibold text-gray-700">Tasks Completed</h4>
                        <p className="text-4xl font-bold text-indigo-600 mt-4">
                            <CountUp end={5000} duration={2} />+
                        </p>
                    </div>

                    {/* Happy Workers */}
                    <div className="flex flex-col items-center p-8 bg-white shadow-lg rounded-lg border border-green-200">
                        <FaUsers className="text-green-600 text-5xl mb-4" />
                        <h4 className="text-lg font-semibold text-gray-700">Happy Workers</h4>
                        <p className="text-4xl font-bold text-green-600 mt-4">
                            <CountUp end={1000} duration={2} />+
                        </p>
                    </div>

                    {/* Coins Earned */}
                    <div className="flex flex-col items-center p-8 bg-white shadow-lg rounded-lg border border-yellow-200">
                        <FaCoins className="text-yellow-500 text-5xl mb-4" />
                        <h4 className="text-lg font-semibold text-gray-700">Coins Earned</h4>
                        <p className="text-4xl font-bold text-yellow-500 mt-4">
                            <CountUp end={100000} duration={2} />+
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReactCountUp;
