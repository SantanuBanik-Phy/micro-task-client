import React from 'react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
    return (
        <section className="py-16">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300 text-transparent mb-12 bg-clip-text">
                    How It Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Worker Section */}
                    <div className="p-8 bg-white rounded-lg shadow-xl border-t-4 border-blue-800 hover:shadow-2xl transition duration-300">
                        <h3 className="text-2xl font-bold text-blue-800 mb-6">For Workers</h3>
                        <ol className="list-decimal list-inside space-y-4 text-gray-700">
                            <li>Create an account and browse available tasks.</li>
                            <li>Complete tasks and submit them for review.</li>
                            <li>Earn coins for each approved task.</li>
                            <li>Withdraw your earnings securely.</li>
                        </ol>
                        <Link
                            to="/register"
                            className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-400 text-white font-semibold rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-600 transition duration-300"
                        >
                            Join as a Worker
                        </Link>
                    </div>

                    {/* Buyer Section */}
                    <div className="p-8 bg-white rounded-lg shadow-xl border-t-4 border-orange-500 hover:shadow-2xl transition duration-300">
                        <h3 className="text-2xl font-bold text-orange-600 mb-6">For Buyers</h3>
                        <ol className="list-decimal list-inside space-y-4 text-gray-700">
                            <li>Create an account and purchase coins.</li>
                            <li>Post tasks with clear instructions and rewards.</li>
                            <li>Review submitted tasks and approve or reject them.</li>
                            <li>Manage your tasks and track progress.</li>
                        </ol>
                        <Link
                            to="/register"
                            className="inline-block mt-6 px-6 py-3  bg-gradient-to-r  from-red-400 to-yellow-500 text-white font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 transition duration-300"
                        >
                            Join as a Buyer
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;