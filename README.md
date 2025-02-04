<div align="center">
  <img height="200" src="https://github.com/SantanuBanik-Phy/micro-task-client/blob/main/src/assets/micro-task-github.png"  />
</div>

# Micro-Tasking Platform

A platform where users can complete microtasks to earn rewards or post tasks to get things done. The platform supports various roles such as Workers, Buyers, and Admins with role-based dashboards and secure payments.

## Live Site URL

[https://b10-a12.web.app/](https://b10-a12.web.app/)

## Admin Credentials

* **UserEmail:** Santanubkph@bd.com
* **Password:** Ph1234@

## Features

* **User Authentication:**
    * Secure registration and login with email/password.
    * Google authentication for quick and easy signup/login.
    * Input validation to ensure data integrity.
* **Role-Based Access:**
    * Separate dashboards for Workers, Buyers, and Admins with distinct functionalities.
    * Workers complete tasks, Buyers create tasks, and Admins manage the platform.
* **Task Management:** 
    * Buyers can create tasks with detailed descriptions, requirements, and rewards.
    * Buyers can manage their posted tasks, track progress, and review submissions.
* **Submission & Review:**
    * Workers can browse available tasks and submit completed work for review.
    * Buyers can review submissions, approve or reject them, and provide feedback.
* **Secure Payments:**
    * Integrated Stripe payment gateway for secure coin purchases by Buyers.
    * Buyers can purchase coins to fund their tasks and pay Workers.
* **Withdrawals:**
    * Workers can withdraw their earned coins through various payment methods (e.g., Bkash, Rocket, Nagad).
    * Admin approves withdrawal requests and manages payment processing.
* **Notifications:**
    * Real-time notifications for task updates, submission status, payments, and withdrawals.
    * Users can view their notifications in a dropdown menu.
* **Responsive Design:**
    * The website adapts seamlessly to various screen sizes (desktop, tablet, mobile) for optimal user experience.
* **User-Friendly Interface:**
    * Intuitive design and clear navigation for easy task management and interaction.
* **Admin Panel:**
    * Comprehensive dashboard for Admins to manage users, tasks, submissions, and withdrawals.
    * Admins can update user roles, delete users, and manage task status.

## Technologies Used

* **Frontend:**
    * React: JavaScript library for building user interfaces.
    * Tailwind CSS: Utility-first CSS framework for rapid UI development.
    * DaisyUI: Component library built on top of Tailwind CSS.
    * Headless UI: Unstyled, fully accessible UI components.
    * React Hook Form: Library for form management and validation.
    * React Query: Data fetching and state management library.
    * Axios: Promise-based HTTP client for API requests.
    * Lottie-React: Animation library for adding interactive animations.
    * React Router DOM: For routing and navigation.
    * React Icons: For adding icons to the application.
* **Backend:**
    * Node.js: JavaScript runtime environment.
    * Express.js: Minimalist web framework for Node.js.
    * MongoDB: NoSQL database for data storage.
    * JWT (JSON Web Token): For secure authentication and authorization.
    * Stripe: Payment processing platform.

## NPM Packages Used

*  `@headlessui/react`: For accessible UI components.
*  `@stripe/react-stripe-js`: For Stripe integration in React.
*  `@stripe/stripe-js`: For Stripe JavaScript integration.
*  `@tanstack/react-query`: For data fetching and state management.
*  `animate.css`: For adding pre-built animations.
*  `axios`: For making HTTP requests.
*  `firebase`: For Firebase authentication.
*  `localforage`: For offline data storage.
*  `lottie-react`: For Lottie animations in React.
*  `match-sorter`: For matching and sorting data efficiently.
*  `motion`: For adding animations to components.
*  `react-card-flip`: For flip card animations.
*  `react-countup`: For animated counters.
*  `react-dom`: For React DOM rendering.
*  `react-helmet`: For managing the document head.
*  `react-helmet-async`: For asynchronous management of the document head.
*  `react-hook-form`: For form management and validation.
*  `react-hot-toast`: For toast notifications.
*  `react-icons`: For incorporating icons in the app.
*  `react-responsive-carousel`: For creating responsive carousels.
*  `react-router-dom`: For routing and navigation.
*  `sort-by`: For sorting arrays efficiently.
*  `swiper`: For creating responsive touch sliders.

## Installation and Setup

1. Clone the repository: `git clone https://github.com/your-username/micro-tasking-platform.git`
2. Install dependencies:
    * Client-side: `cd micro-tasking-client && npm install`
    * Server-side: `cd micro-tasking-server && npm install`
3. Set up environment variables: 
    * Create `.env` files in both client and server directories.
    * Add your Firebase config, MongoDB URI, Stripe keys, and other sensitive information.
4. Run the application:
    * Start the development server (client-side): `npm start`
    * Start the server (server-side): `node index.js`

## Future Improvements

* Service Categories: Implement service categories for better organization and filtering.
* Multi-language Support: Add multilingual features to make the platform more inclusive.
* Analytics Dashboard: Enhance the admin panel with advanced analytics for service and user performance.
* SEO Optimization: Improve SEO for better discoverability on search engines.

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## Acknowledgments

* **React:** React is an open-source JavaScript library maintained by Facebook and the community.
* **Firebase:** Firebase is a platform developed by Google for creating mobile and web applications.
* **MongoDB:** MongoDB is a NoSQL database that provides high availability and scalability.
* **Stripe:** Stripe is a powerful and flexible payments platform for online transactions.

