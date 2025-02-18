import React, { useState } from 'react';
import { FaUserAlt, FaEnvelope, FaPaperPlane, FaPhoneAlt } from 'react-icons/fa';

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
    <div className="min-h-screen bg-slate-200 flex flex-col justify-center items-center p-6">
      <div className="max-w-4xl w-full text-center bg-white shadow-xl rounded-xl p-10">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Contact Us</h1>
        <p className="text-lg text-gray-600 mb-8">
          Have any questions or need assistance? We’re here to help! Reach out to us using the form below, and we'll get back to you as soon as possible.
        </p>

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

          {/* Phone Number Input (Optional) */}
          <div className="form-control mb-6 relative">
            <label className="label">
              <span className="label-text font-medium text-gray-700">Phone Number (Optional)</span>
            </label>
            <div className="flex items-center border border-gray-300 rounded-xl p-4 focus-within:ring-2 focus-within:ring-blue-500">
              <FaPhoneAlt className="text-gray-400 mr-3" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input w-full border-none focus:ring-0"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-control mb-6">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md transform hover:scale-105 transition-all duration-300"
            >
              <FaPaperPlane className="inline mr-2" />
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
