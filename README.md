# Micro-Tasking Platform

A platform where users can complete microtasks to earn rewards or post tasks to get things done.

## Live Site URL

[https://b10-a12.web.app/](https://b10-a12.web.app/)

## Admin Credentials

* **UserEmail:** Santanubkph@bd.com
* **Password:** Ph1234@

## Features

* **User Authentication:**
    * Secure registration and login with email/password.
    *  Google authentication for quick and easy signup/login.
    *  Input validation to ensure data integrity.
* **Role-Based Access:**
    * Separate dashboards for Workers, Buyers, and Admins with distinct functionalities.
    *  Workers complete tasks, Buyers create tasks, and Admins manage the platform.
* **Task Management:** 
    * Buyers can create tasks with detailed descriptions, requirements, and rewards.
    *  Buyers can manage their posted tasks, track progress, and review submissions.
* **Submission & Review:**
    * Workers can browse available tasks and submit completed work for review.
    *  Buyers can review submissions, approve or reject them, and provide feedback.
* **Secure Payments:**
    * Integrated Stripe payment gateway for secure coin purchases by Buyers.
    *  Buyers can purchase coins to fund their tasks and pay Workers.
* **Withdrawals:**
    * Workers can withdraw their earned coins through various payment methods (e.g., Bkash, Rocket, Nagad).
    *  Admin approves withdrawal requests and manages payment processing.
* **Notifications:**
    * Real-time notifications for task updates, submission status, payments, and withdrawals.
    *  Users can view their notifications in a dropdown menu.
* **Responsive Design:**
    *  The website adapts seamlessly to various screen sizes (desktop, tablet, mobile) for optimal user experience.
* **User-Friendly Interface:**
    *  Intuitive design and clear navigation for easy task management and interaction.
* **Admin Panel:**
    * Comprehensive dashboard for Admins to manage users, tasks, submissions, and withdrawals.
    *  Admins can update user roles, delete users, and manage task status.

## Technologies Used

* **Frontend:**
    * React: JavaScript library for building user interfaces.
    * Tailwind CSS: Utility-first CSS framework for rapid UI development.
    * DaisyUI: Component library built on top of Tailwind CSS.
    * Headless UI: Unstyled, fully accessible UI components.
    * React Hook Form: Library for form management and validation.
    * React Query:  Data fetching and state management library.
    * Axios:  Promise-based HTTP client for API requests.
* **Backend:**
    * Node.js: JavaScript runtime environment.
    * Express.js:  Minimalist web framework for Node.js.
    * MongoDB: NoSQL database for data storage.
    * JWT (JSON Web Token):  For secure authentication and authorization.
    * Stripe:  Payment processing platform.

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
