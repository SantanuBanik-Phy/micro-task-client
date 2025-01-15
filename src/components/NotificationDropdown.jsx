import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import axios from 'axios';

const NotificationDropdown = () => {
    const { user } = useContext(AuthContext);
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/notifications', {
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

    // Close the dropdown when clicking outside
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
                className="btn btn-ghost btn-circle"
            >
                <div className="indicator">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
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
                        <span className="badge badge-xs badge-error indicator-item">
                            {notifications.length}
                        </span>
                    )}
                </div>
            </button>

            {isOpen && (
                <div
                    className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg z-50"
                >
                    <div className="p-4">
                        <span className="font-bold text-lg">
                            Notifications
                        </span>
                        {notifications.length === 0 ? (
                            <p className="text-gray-500">No new notifications</p>
                        ) : (
                            <ul className="py-3">
                                {notifications.map((notification) => (
                                    <li
                                        key={notification._id}
                                        className="py-2"
                                        onClick={() => handleNotificationClick(notification._id)}
                                    >
                                        <Link
                                            to={notification.actionRoute}
                                            className="text-blue-600 hover:underline"
                                        >
                                            {notification.message}
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
