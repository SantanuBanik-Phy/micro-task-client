import React, { useState } from 'react';
import { FaUserAlt, FaEnvelope, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here, like sending data to an API.
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r flex flex-col justify-center items-center p-6">
      <div className="max-w-6xl w-full text-center">
        <h1 className="text-5xl font-extrabold  mb-8">Contact Us</h1>
        <p className="text-lg  mb-6">
          Have any questions or need assistance? We’re here to help! Reach out to us using the form below, and we'll get back to you as soon as possible.
        </p>

        <div className="bg-white p-10 rounded-3xl shadow-lg w-full sm:w-3/4 lg:w-1/2 mx-auto">
          <h2 className="text-4xl font-semibold text-gray-800 text-center mb-6">Get in Touch</h2>

          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="form-control mb-6 relative">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Name</span>
              </label>
              <div className="flex items-center border border-gray-300 rounded-xl p-4 focus-within:ring-2 focus-within:ring-blue-500">
                <FaUserAlt className="text-gray-400 mr-3" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input w-full border-none focus:ring-0"
                  placeholder="Enter your name"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="form-control mb-6 relative">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Email</span>
              </label>
              <div className="flex items-center border border-gray-300 rounded-xl p-4 focus-within:ring-2 focus-within:ring-blue-500">
                <FaEnvelope className="text-gray-400 mr-3" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input w-full border-none focus:ring-0"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Message Input */}
            <div className="form-control mb-6 relative">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Message</span>
              </label>
              <div className="flex items-start border border-gray-300 rounded-xl p-4 focus-within:ring-2 focus-within:ring-blue-500">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="textarea w-full border-none focus:ring-0"
                  placeholder="Enter your message"
                  rows="4"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-control mb-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md transform hover:scale-105 transition-all duration-300"
              >
                <FaPaperPlane className="inline mr-2" />
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
