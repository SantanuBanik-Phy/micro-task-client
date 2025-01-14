
import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';



import Navbar from '../components/Navbar';
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
                    console.log(userData)
                    
                })
        }
    }, [user?.email])

    return (
        <div>
            <Helmet>
                <title>Dashboard - Micro Task Platform</title>
            </Helmet>
            <Navbar />
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
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;