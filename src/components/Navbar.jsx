import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

// import NotificationDropdown from "./NotificationDropdown";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 

  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate("/");
  };
  // Watch for changes in user state

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold">
              MyPlatform
            </Link>
          </div>

          {/* Menu for Larger Screens */}
          <div className="hidden md:flex items-center space-x-4">
            {!user && !user?.email ? (
              <>
                <Link to="/login" className="hover:text-gray-400">
                  Login
                </Link>
                <Link to="/register" className="hover:text-gray-400">
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="hover:text-gray-400">
                  Dashboard
                </Link>
                <span className="hover:text-gray-400">Coins: {user?.coins || 0}</span>
                {/* Notification Dropdown */}
                {/* <NotificationDropdown /> */}
                {/* User Avatar Dropdown */}
                <div className="dropdown dropdown-end ml-4">
                  <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                      <img referrerPolicy="no-referrer" src={user?.photoURL || "https://via.placeholder.com/40"} alt="User" />
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50"
                  >
                    <li className="text-black">
                      <Link to="/dashboard/user-profile">Profile</Link>
                    </li>
                    <li className="text-red-500">
                      <button onClick={handleLogout} className="hover:text-red-500">
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            )}
            <a
              href="https://github.com/your-client-repo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              Join as Developer
            </a>
          </div>

          {/* Hamburger Menu for Smaller Screens */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Dropdown Menu for Smaller Screens */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-700 text-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <span className="block px-3 py-2 rounded-md text-base font-medium">
                  Coins: {user.coins || 0}
                </span>
                <Link
                  to="/dashboard/user-profile"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-600"
                >
                  Logout
                </button>
              </>
            )}
            <a
              href="https://github.com/your-client-repo"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-600"
            >
              Join as Developer
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
