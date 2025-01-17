import React from "react";

const BenefitsAndAdvantages = () => {
  return (
    <section className="py-16  dark:bg-gray-900">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-4xl font-extrabold text-white dark:text-white mb-12">
          Benefits and Advantages
        </h2>

        {/* Workers Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-semibold text-orange-400 text-center mb-8">
            Benefits for Workers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Skill Development */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex flex-col items-center hover:shadow-2xl transition duration-300">
              <div className="bg-indigo-100 dark:bg-indigo-600 p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-indigo-600 dark:text-indigo-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200 mt-4">
                Skill Development
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
                Enhance your skills and gain experience by working on diverse micro-tasks.
              </p>
            </div>

            {/* Financial Freedom */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex flex-col items-center hover:shadow-2xl transition duration-300">
              <div className="bg-green-100 dark:bg-green-600 p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-green-600 dark:text-green-100"
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
              <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200 mt-4">
                Financial Freedom
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
                Earn extra income on your own terms and achieve financial independence.
              </p>
            </div>

            {/* Career Growth */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex flex-col items-center hover:shadow-2xl transition duration-300">
              <div className="bg-yellow-100 dark:bg-yellow-600 p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-yellow-600 dark:text-yellow-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200 mt-4">
                Career Growth
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
                Build your resume and gain valuable experience for career advancement.
              </p>
            </div>
          </div>
        </div>

        {/* Buyers Section */}
        <div>
          <h3 className="text-3xl font-semibold text-orange-400 text-center mb-8">
            Advantages for Buyers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Increased Efficiency */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex flex-col items-center hover:shadow-2xl transition duration-300">
              <div className="bg-blue-100 dark:bg-blue-600 p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-blue-600 dark:text-blue-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200 mt-4">
                Increased Efficiency
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
                Delegate tasks and free up your time to focus on core business activities.
              </p>
            </div>

            {/* Cost Savings */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex flex-col items-center hover:shadow-2xl transition duration-300">
              <div className="bg-purple-100 dark:bg-purple-600 p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-purple-600 dark:text-purple-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200 mt-4">
                Cost Savings
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
                Reduce labor costs by outsourcing micro-tasks to our skilled workforce.
              </p>
            </div>

            {/* Scalability */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex flex-col items-center hover:shadow-2xl transition duration-300">
              <div className="bg-red-100 dark:bg-red-600 p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-red-600 dark:text-red-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 2-4 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
                </svg>
              </div>
              <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200 mt-4">
                Scalability
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
                Easily scale your workforce up or down based on your project needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsAndAdvantages;