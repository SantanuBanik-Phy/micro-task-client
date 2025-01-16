import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate("/");
  };

  const activeStyle = "bg-gradient-to-r from-red-500 to-yellow-500 text-white px-4 py-2 rounded";

  return (
    <nav className="inset-0  z-10 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-2xl font-bold">
              MicroTask
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? activeStyle : "hover:text-gray-400")}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) => (isActive ? activeStyle : "hover:text-gray-400")}
                >
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) => (isActive ? activeStyle : "hover:text-gray-400")}
                >
                  Dashboard
                </NavLink>
                <span className="hover:text-gray-400">Coins: {user?.coins || 0}</span>
                {/* Profile and Logout */}
                <div className="dropdown dropdown-end ml-4">
                  <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                      <img
                        referrerPolicy="no-referrer"
                        src={user?.photoURL || "https://via.placeholder.com/40"}
                        alt="User"
                      />
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <NavLink
                        to="profile"
                        className={({ isActive }) => (isActive ? activeStyle : "text-black hover:bg-gray-200")}
                      >
                        Profile
                      </NavLink>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="text-red-500 hover:text-red-700 w-full text-left px-4 py-2"
                      >
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

          {/* Hamburger Menu */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-700 text-white">
          <div className="px-4 pt-4 pb-3 space-y-2">
            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? `${activeStyle} block` : "block px-3 py-2 rounded-md text-base hover:bg-gray-600"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? `${activeStyle} block` : "block px-3 py-2 rounded-md text-base hover:bg-gray-600"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive ? `${activeStyle} block` : "block px-3 py-2 rounded-md text-base hover:bg-gray-600"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </NavLink>
                <span className="block px-3 py-2 rounded-md text-base">
                  Coins: {user?.coins || 0}
                </span>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive ? `${activeStyle} block` : "block px-3 py-2 rounded-md text-base hover:bg-gray-600"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </NavLink>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base hover:bg-gray-600"
                >
                  Logout
                </button>
              </>
            )}
            <a
              href="https://github.com/your-client-repo"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 rounded-md text-base hover:bg-gray-600"
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
