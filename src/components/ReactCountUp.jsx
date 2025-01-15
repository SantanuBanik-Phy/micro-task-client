import React from 'react';
import CountUp from 'react-countup';


const ReactCountUp = () => 
    {
        return (
            <section className="bg-white py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                        Our Impact
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="p-6 bg-indigo-100 rounded-lg shadow-md flex flex-col items-center">
                            <h4 className="text-lg font-medium text-gray-800 mt-4">
                                Tasks Completed
                            </h4>
                            <p className="text-3xl font-bold text-indigo-600 mt-2">
                                <CountUp end={5000} duration={2} />+
                            </p>
                        </div>
                        <div className="p-6 bg-green-100 rounded-lg shadow-md flex flex-col items-center">
                            <h4 className="text-lg font-medium text-gray-800 mt-4">
                                Happy Workers
                            </h4>
                            <p className="text-3xl font-bold text-green-600 mt-2">
                                <CountUp end={1000} duration={2} />+
                            </p>
                        </div>
                        <div className="p-6 bg-yellow-100 rounded-lg shadow-md flex flex-col items-center">
                            <h4 className="text-lg font-medium text-gray-800 mt-4">
                                Coins Earned
                            </h4>
                            <p className="text-3xl font-bold text-yellow-600 mt-2">
                                <CountUp end={100000} duration={2} />+
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    };

export default ReactCountUp;