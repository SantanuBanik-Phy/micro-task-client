import React from "react";

const WhyChooseUs = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 py-16">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-12">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 flex flex-col items-center">
            <div className=" bg-gradient-to-r from-red-400 to-yellow-500 p-4 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6">Flexible Work</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-2">
              Work from anywhere, anytime, and choose tasks that fit your skills and interests.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 flex flex-col items-center">
            <div className="bg-gradient-to-r from-red-400 to-yellow-500 p-4 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6">Earn Rewards</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-2">
              Earn coins for every completed task and withdraw your earnings securely.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 flex flex-col items-center">
            <div className="bg-gradient-to-r from-red-400 to-yellow-500 p-4 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6">Easy to Use</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-2">
              Our platform is user-friendly and easy to navigate, making it simple to find and complete tasks.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 flex flex-col items-center">
            <div className="bg-gradient-to-r from-red-400 to-yellow-500 p-4 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6">Large Community</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-2">
              Join our growing community of workers and buyers and connect with like-minded individuals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
