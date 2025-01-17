import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FaHome, FaUsers, FaTasks, FaCoins, FaFileInvoice, FaWallet } from 'react-icons/fa';
import { MdAddTask, MdOutlineManageAccounts } from 'react-icons/md';
import { AiOutlineDashboard } from 'react-icons/ai';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../provider/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import axios from 'axios';
import NotificationDropdown from '../components/NotificationDropdown';
import logo from '../assets/mc3.png'

const DashboardLayout = () => {
    const { user,logOut } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [isAdmin] = useAdmin(user?.email);
    const navigate = useNavigate();

    const handleDropdownToggle = () => {
        setDropdownOpen((prev) => !prev);
      };
    
      const handleLogout = () => {
        logOut();
        navigate("/"); // Redirect to home page
        setDropdownOpen(false); // Close the dropdown
      };

       // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

    // Fetch user data using React Query
    const { data: userData = {}, refetch } = useQuery({
        queryKey: ['user-data', user?.email],
        queryFn: async () => {
            if (!user?.email) return {};
            const res = await axios.get(`http://localhost:3000/api/users/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email, 
    });

    return (
        <div>
            <Helmet>
                <title>Dashboard - Micro Task Platform</title>
            </Helmet>
            <div
  className="navbar bg-cover bg-no-repeat bg-center text-white"
  style={{ backgroundImage: "url('https://i.ibb.co.com/hCMPLvh/3386851.jpg')" }}
>
  <div className="relative z-10 w-full max-w-screen-xl mx-auto flex flex-wrap justify-between items-center py-4 lg:py-3 gap-y-4">
    {/* Logo */}
    <div className="flex items-center w-full sm:w-auto justify-center sm:justify-start">
      <NavLink to="/" className="btn btn-ghost normal-case text-xl flex items-center">
        <img src={logo} alt="Logo" className="w-44 h-10 object-cover" />
      </NavLink>
    </div>

    {/* User Info and Notifications */}
    <div className="flex flex-wrap items-center w-full sm:w-auto justify-center sm:justify-end gap-4">
      {/* Available Coins */}
      <span className="text-sm md:text-base order-2 sm:order-none">
        Available Coins: <span className='text-orange-500 font-bold'>{userData?.coins || 0}</span> 
      </span>

      {/* User Dropdown */}
      <div className="relative order-1 sm:order-none" ref={dropdownRef}>
        <div
          className="avatar cursor-pointer"
          onClick={handleDropdownToggle}
        >
          <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-orange-400 ring-offset-2">
            <img src={user?.photoURL || "/default-avatar.png"} alt="User" />
          </div>
        </div>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-20">
            <NavLink
              to="/profile"
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => setDropdownOpen(false)}
            >
              Profile
            </NavLink>
            <button
              className="block w-full text-left px-4 text-red-500 py-2 hover:bg-gray-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* User Name and Role */}
      <div className="text-sm md:text-base flex flex-col items-center sm:items-end">
        <span className="font-semibold">{user?.displayName || "Guest"}</span>
        <span className="text-gray-300">{userData?.role || "User"}</span>
      </div>

      {/* Notification Dropdown */}
      <div className="order-3 sm:order-none">
        <NotificationDropdown />
      </div>
    </div>
  </div>
</div>


            {/* Dashboard Content */}
            <div className="flex">
  {/* Sidebar */}
  <div className="bg-gradient-to-r from-blue-950 to-blue-500 text-white w-20 lg:w-80  flex-shrink-0">
    <ul className="menu p-4 h-full">
      {/* Admin Routes */}
      {isAdmin ? (
        <>
          <li className="group">
            <NavLink
              to="/dashboard/admin-home"
              className={({ isActive }) =>
                isActive
                  ? "bg-gradient-to-r from-red-400 to-yellow-500 text-black"
                  : "hover:bg-blue-700"
              }
            >
              <FaHome className="w-6 h-6 mx-auto lg:mx-0" />
              <span className="hidden lg:inline group-hover:inline">Admin Home</span>
            </NavLink>
          </li>
          <li className="group">
            <NavLink
              to="/dashboard/manage-users"
              className={({ isActive }) =>
                isActive
                  ? "bg-gradient-to-r from-red-400 to-yellow-500 text-black"
                  : "hover:bg-blue-700"
              }
            >
              <MdOutlineManageAccounts className="w-6 h-6 mx-auto lg:mx-0" />
              <span className="hidden lg:inline group-hover:inline">Manage Users</span>
            </NavLink>
          </li>
          <li className="group">
            <NavLink
              to="/dashboard/manage-tasks"
              className={({ isActive }) =>
                isActive
                  ? "bg-gradient-to-r from-red-400 to-yellow-500 text-black"
                  : "hover:bg-blue-700"
              }
            >
              <FaTasks className="w-6 h-6 mx-auto lg:mx-0" />
              <span className="hidden lg:inline group-hover:inline">Manage Tasks</span>
            </NavLink>
          </li>
        </>
      ) : userData?.role === "buyer" ? (
        <>
          <li className="group">
            <NavLink
              to="/dashboard/buyer-home"
              className={({ isActive }) =>
                isActive
                  ? "bg-gradient-to-r from-red-400 to-yellow-500 text-black"
                  : "hover:bg-blue-700"
              }
            >
              <FaHome className="w-6 h-6 mx-auto lg:mx-0" />
              <span className="hidden lg:inline group-hover:inline">Buyer Home</span>
            </NavLink>
          </li>
          <li className="group">
            <NavLink
              to="/dashboard/add-task"
              className={({ isActive }) =>
                isActive
                  ? "bg-gradient-to-r from-red-400 to-yellow-500 text-black"
                  : "hover:bg-blue-700"
              }
            >
              <MdAddTask className="w-6 h-6 mx-auto lg:mx-0" />
              <span className="hidden lg:inline group-hover:inline">Add New Task</span>
            </NavLink>
          </li>
          <li className="group">
            <NavLink
              to="/dashboard/my-tasks"
              className={({ isActive }) =>
                isActive
                  ? "bg-gradient-to-r from-red-400 to-yellow-500 text-black"
                  : "hover:bg-blue-700"
              }
            >
              <FaTasks className="w-6 h-6 mx-auto lg:mx-0" />
              <span className="hidden lg:inline group-hover:inline">My Tasks</span>
            </NavLink>
          </li>
          <li className="group">
            <NavLink
              to="/dashboard/purchase-coin"
              className={({ isActive }) =>
                isActive
                  ? "bg-gradient-to-r from-red-400 to-yellow-500 text-black"
                  : "hover:bg-blue-700"
              }
            >
              <FaCoins className="w-6 h-6 mx-auto lg:mx-0" />
              <span className="hidden lg:inline group-hover:inline">Purchase Coin</span>
            </NavLink>
          </li>
          <li className="group">
            <NavLink
              to="/dashboard/payment-history"
              className={({ isActive }) =>
                isActive
                  ? "bg-gradient-to-r from-red-400 to-yellow-500 text-black"
                  : "hover:bg-blue-700"
              }
            >
              <FaFileInvoice className="w-6 h-6 mx-auto lg:mx-0" />
              <span className="hidden lg:inline group-hover:inline">Payment History</span>
            </NavLink>
          </li>
        </>
      ) : (
        <>
          <li className="group">
            <NavLink
              to="/dashboard/worker-home"
              className={({ isActive }) =>
                isActive
                  ? "bg-gradient-to-r from-red-400 to-yellow-500 text-black"
                  : "hover:bg-blue-700"
              }
            >
              <FaHome className="w-6 h-6 mx-auto lg:mx-0" />
              <span className="hidden lg:inline group-hover:inline">Worker Home</span>
            </NavLink>
          </li>
          <li className="group">
            <NavLink
              to="/dashboard/worker-task-list"
              className={({ isActive }) =>
                isActive
                  ? "bg-gradient-to-r from-red-400 to-yellow-500 text-black"
                  : "hover:bg-blue-700"
              }
            >
              <AiOutlineDashboard className="w-6 h-6 mx-auto lg:mx-0" />
              <span className="hidden lg:inline group-hover:inline">Task List</span>
            </NavLink>
          </li>
          <li className="group">
            <NavLink
              to="/dashboard/my-submissions"
              className={({ isActive }) =>
                isActive
                  ? "bg-gradient-to-r from-red-400 to-yellow-500 text-black"
                  : "hover:bg-blue-700"
              }
            >
              <FaTasks className="w-6 h-6 mx-auto lg:mx-0" />
              <span className="hidden lg:inline group-hover:inline">My Submissions</span>
            </NavLink>
          </li>
          <li className="group">
            <NavLink
              to="/dashboard/withdrawals"
              className={({ isActive }) =>
                isActive
                  ? "bg-gradient-to-r from-red-400 to-yellow-500 text-black"
                  : "hover:bg-blue-700"
              }
            >
              <FaWallet className="w-6 h-6 mx-auto lg:mx-0" />
              <span className="hidden lg:inline group-hover:inline">Withdrawals</span>
            </NavLink>
          </li>
        </>
      )}
    </ul>
  </div>

  {/* Main Content */}
  <div className="flex-1">
    <div className="navbar bg-white shadow-md">
      {/* Navbar Header */}
      <h1 className="text-xl font-bold  px-4 py-2"> <span className="text-blue-900">{userData?.role || "User"}</span>  Dashboard</h1>
    </div>
    <div className="md:p-12 p-4  bg-[url('https://i.ibb.co.com/4SW6pgV/19366.jpg')] bg-cover bg-center bg-no-repeat min-h-[calc(100vh-100px)]">
      <Outlet context={{ refetchUserCoins: refetch }} />
    </div>
  </div>
</div>



            <Footer />
        </div>
    );
};

export default DashboardLayout;
