import { Link } from "react-router-dom";
import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaPinterest,
} from "react-icons/fa";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="p-10 bg-gradient-to-l from-blue-950 to-blue-500  text-white">
            <div className="container mx-auto ">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-10">
                    {/* Company Information */}
                    <div className="space-y-4">
                        <img
                            src=""
                            alt="Company Logo"
                            className="w-16 h-16 mx-auto lg:mx-0"
                        />
                        <h1 className="text-2xl font-bold text-center lg:text-left">
                            Micro <span className="text-yellow-400">Tasks</span>{" "}
                            Platform
                        </h1>
                        <p className="text-sm text-gray-300 text-center lg:text-left">
                        Empowering individuals with opportunities to earn, learn, and grow by completing micro-tasks efficiently.
                        </p>
                        {/* Social Media Icons */}
                        <div className="flex justify-center lg:justify-start gap-4 mt-4">
                            <a
                                href="https://www.facebook.com/santanu.banik.779"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="tooltip tooltip-bottom"
                                data-tip="Facebook"
                            >
                                <FaFacebook className="text-2xl hover:text-blue-500" />
                            </a>
                            <a
                                href="https://twitter.com/your-twitter-profile"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="tooltip tooltip-bottom"
                                data-tip="Twitter"
                            >
                                <FaTwitter className="text-2xl hover:text-sky-400" />
                            </a>
                            <a
                                href="https://www.instagram.com/your-instagram-profile"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="tooltip tooltip-bottom"
                                data-tip="Instagram"
                            >
                                <FaInstagram className="text-2xl hover:text-pink-500" />
                            </a>
                            <a
                                href="https://www.linkedin.com/your-linkedin-profile"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="tooltip tooltip-bottom"
                                data-tip="LinkedIn"
                            >
                                <FaLinkedin className="text-2xl hover:text-blue-700" />
                            </a>
                            <a
                                href="https://www.pinterest.com/your-pinterest-profile"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="tooltip tooltip-bottom"
                                data-tip="Pinterest"
                            >
                                <FaPinterest className="text-2xl hover:text-red-600" />
                            </a>
                        </div>
                    </div>

                    {/* Company Section */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Company</h2>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-300 hover:text-white">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className="text-gray-300 hover:text-white"
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="text-gray-300 hover:text-white"
                                >
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links Section */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white">
                                    Terms & Conditions
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white">
                                    User's Guide
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white">
                                    Support Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white">
                                    Press Info
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">
                            Have Questions?
                        </h2>
                        <ul className="space-y-4 text-sm">
                            <li className="flex gap-2 items-start">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-yellow-500"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
                                </svg>
                                203/SouthShadebpur,Feni <br /> Dhaka,Bangladesh
                            </li>
                            <li className="flex gap-2 items-start">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-yellow-500"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 100 2h-1a1 1 0 100-2zm-2-5a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zm3 4a1 1 0 100 2h-1a1 1 0 100-2zm-2-5a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zm4.5-.5a3 3 0 11-6 0 3 3 0 016 0zm-6 7a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                +880192932999
                            </li>
                            <li className="flex gap-2 items-start">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-yellow-500"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                                </svg>
                                info@emirotask.com
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="border-t border-gray-700 my-6"></div>
                <div className="text-center text-gray-400 text-sm">
                    <p>
                        © {currentYear} MicroTasks. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;