// src/layouts/DashboardLayout.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { AuthContext } from '../provider/AuthProvider';
import useAdmin from '../hooks/useAdmin';





const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
 
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if (user?.email) {
            axios.get(`http://localhost:3000/api/users/${user.email}`)
                .then(res => {
                    setUserData(res.data)
                })
        }
    }, [user?.email])

    return (
        <div>
            <Helmet>
                <title>Dashboard - Micro Task Platform</title>
            </Helmet>

            {/* Dashboard Header */}
            <div className="navbar bg-blue-950 text-white">
                <div className="navbar-start">
                    <Link to="/" className="btn btn-ghost normal-case text-xl">
                        <img src="logo.png" alt="Logo" className="w-8 h-8 mr-2" /> 
                        Micro-Tasking Platform
                    </Link>
                </div>
                <div className="navbar-end">
                    <div className="flex items-center">
                        <span className="mr-3">Available Coins: {userData?.coins || 0}</span>
                        <div className="avatar mr-3">
                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={user?.photoURL} alt="User" />
                            </div>
                        </div>
                        <span className="mr-3">{userData?.role || 'User'} | {user?.displayName}</span> {/* Show user role */}
                        {/* <NotificationDropdown /> */}
                    </div>
                </div>
            </div>

            {/* Dashboard Content */}
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    <Outlet />
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                    {
                            isAdmin ?
                                <>
                                    <li><Link to="/dashboard/admin-home">Admin Home</Link></li>
                                    <li><Link to="/dashboard/manage-users">Manage Users</Link></li>
                                    <li><Link to="/dashboard/manage-tasks">Manage Tasks</Link></li>
                                    <li><Link to="/dashboard/manage-submissions">Manage Submissions</Link></li>
                                    <li><Link to="/dashboard/admin-withdrawals">Withdrawal Requests</Link></li>
                                </>
                                :
                                userData?.role === 'buyer' ?
                                    <>
                                        <li><Link to="/dashboard/buyer-home">Buyer Home</Link></li>
                                        <li><Link to="/dashboard/add-task">Add New Task</Link></li>
                                        <li><Link to="/dashboard/my-tasks">My Tasks</Link></li>
                                        {/* <li><Link to="/dashboard/my-submissions">My Submissions</Link></li> */}
                                        <li><Link to="/dashboard/purchase-coin">Purchase Coin</Link></li>
                                        <li><Link to="/dashboard/payment-history">Payment History</Link></li>
                                    </>
                                    :
                                    <>
                                        <li><Link to="/dashboard/worker-home">Worker Home</Link></li>
                                        <li><Link to="/dashboard/worker-task-list">Task List</Link></li>
                                        <li><Link to="/dashboard/my-submissions">My Submissions</Link></li>
                                        <li><Link to="/dashboard/withdrawals">Withdrawals</Link></li>
                                    </>
                        }
                    </ul>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default DashboardLayout;