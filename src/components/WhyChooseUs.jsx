import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";

const WhyChooseUs = () => {
  const [flipped, setFlipped] = useState({
    card1: false,
    card2: false,
    card3: false,
    card4: false,
  });

  const handleFlip = (cardKey) => {
    setFlipped((prev) => ({ ...prev, [cardKey]: !prev[cardKey] }));
  };

  const features = [
    {
      id: "card1",
      title: "Flexible Work",
      description:
        "Work from anywhere, anytime, and choose tasks that fit your skills and interests.",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
        />
      ),
    },
    {
      id: "card2",
      title: "Earn Rewards",
      description:
        "Earn coins for every completed task and withdraw your earnings securely.",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
        />
      ),
    },
    {
      id: "card3",
      title: "Easy to Use",
      description:
        "Our platform is user-friendly and easy to navigate, making it simple to find and complete tasks.",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
    },
    {
      id: "card4",
      title: "Large Community",
      description:
        "Join our growing community of workers and buyers and connect with like-minded individuals.",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      ),
    },
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 py-16">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-12">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ id, title, description, icon }) => (
            <ReactCardFlip
              key={id}
              isFlipped={flipped[id]}
              flipDirection="horizontal"
            >
              {/* Front of the card */}
              <div
                className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex flex-col items-center justify-center cursor-pointer"
                onClick={() => handleFlip(id)}
              >
                <div className="bg-gradient-to-r from-red-400 to-yellow-500 p-4 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {icon}
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6">
                  {title}
                </h4>
              </div>

              {/* Back of the card */}
              <div
                className="p-8 bg-indigo-100 dark:bg-gray-700 rounded-xl shadow-lg flex flex-col items-center justify-center cursor-pointer"
                onClick={() => handleFlip(id)}
              >
                <p className="text-sm text-gray-800 dark:text-gray-200 text-center">
                  {description}
                </p>
              </div>
            </ReactCardFlip>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;