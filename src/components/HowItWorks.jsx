import React from 'react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
    return (
        <section className="bg-gray-100 py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">How It Works</h2>
                <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                    {/* Worker Section */}
                    <div className="w-full md:w-1/2 p-6 bg-white rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold text-indigo-600 mb-4">For Workers</h3>
                        <ol className="list-decimal list-inside space-y-2">
                            <li>Create an account and browse available tasks.</li>
                            <li>Complete tasks and submit them for review.</li>
                            <li>Earn coins for each approved task.</li>
                            <li>Withdraw your earnings securely.</li>
                        </ol>
                        <Link to="/register" className="btn btn-primary mt-4">Join as a Worker</Link>
                    </div>

                    {/* Buyer Section */}
                    <div className="w-full md:w-1/2 p-6 bg-white rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold text-indigo-600 mb-4">For Buyers</h3>
                        <ol className="list-decimal list-inside space-y-2">
                            <li>Create an account and purchase coins.</li>
                            <li>Post tasks with clear instructions and rewards.</li>
                            <li>Review submitted tasks and approve or reject them.</li>
                            <li>Manage your tasks and track progress.</li>
                        </ol>
                        <Link to="/register" className="btn btn-primary mt-4">Join as a Buyer</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;