import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center py-12 px-6">
      <div className="max-w-6xl w-full text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-8">
          About Micro Tasking Platform
        </h1>
        <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
          Welcome to the Micro Tasking Platform, where completing small tasks can earn you rewards, and posting tasks helps you get things done. Whether you're a Worker looking for tasks to complete, a Buyer posting tasks, or an Admin overseeing the platform, we have something for everyone.
        </p>

        {/* Roles Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Worker */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold text-white mb-4">For Workers</h2>
            <p className="text-white">
              Complete various tasks posted by Buyers to earn rewards. You can choose tasks based on your skillset and time availability. Start earning today!
            </p>
          </div>

          {/* Buyer */}
          <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold text-white mb-4">For Buyers</h2>
            <p className="text-white">
              Post tasks you need done and get them completed by Workers. Whether it’s research, data entry, or creative tasks, we’ve got you covered.
            </p>
          </div>

          {/* Admin */}
          <div className="bg-gradient-to-r from-gray-500 to-gray-300 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold text-white mb-4">For Admins</h2>
            <p className="text-white">
              Oversee the platform, manage users, approve tasks, and ensure smooth transactions. You ensure that Workers and Buyers are happy.
            </p>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-lg text-gray-700 mt-4 max-w-3xl mx-auto">
            Our platform is designed to help both Workers and Buyers achieve their goals quickly and efficiently. Whether you need small tasks completed or want to get things done, Micro Tasking is the perfect platform for you. With secure payments and a user-friendly interface, you can start completing or posting tasks right away.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
