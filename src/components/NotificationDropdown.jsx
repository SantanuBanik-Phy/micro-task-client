import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import axios from 'axios';
import useAxiosSecure from '../hooks/useAxiosSecure';

const NotificationDropdown = () => {
    const { user } = useContext(AuthContext);
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axiosSecure.get('/api/notifications', {
                    params: { email: user?.email },
                });
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        if (user?.email) {
            fetchNotifications();
        }
    }, [user]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleDropdownToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleNotificationClick = (notificationId) => {
        setNotifications((prevNotifications) =>
            prevNotifications.filter((notification) => notification._id !== notificationId)
        );
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={handleDropdownToggle}
                className="relative p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full text-white hover:shadow-md transition duration-300"
            >
                <div className="indicator">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                    </svg>
                    {notifications.length > 0 && (
                        <span className="absolute -top-2  right-0 left-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
                            {notifications.length}
                        </span>
                    )}
                </div>
            </button>

            {isOpen && (
                <div
                    className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg z-50"
                >
                    <div className="p-4">
                        <h3 className="font-bold text-lg text-gray-700 mb-2">
                            Notifications
                        </h3>
                        {notifications.length === 0 ? (
                            <p className="text-gray-500">No new notifications</p>
                        ) : (
                            <ul className="divide-y divide-gray-200">
                                {notifications.map((notification) => (
                                    <li
                                        key={notification._id}
                                        className="py-2 px-3 hover:bg-gray-100 rounded-lg transition duration-200"
                                        onClick={() => handleNotificationClick(notification._id)}
                                    >
                                        <Link
                                            to={notification.actionRoute}
                                            className="flex items-center space-x-3"
                                        >
                                            <div className="flex-shrink-0 bg-blue-500 text-white rounded-full p-2">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M9.293 14.707a1 1 0 001.414 0l3.536-3.536a1 1 0 00-1.414-1.414L10 12.586l-1.829-1.829a1 1 0 00-1.414 1.414l2.536 2.536z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-800">
                                                    {notification.message}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(notification.time).toLocaleString()}
                                                </p>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;
