import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import Lottie from "lottie-react";
import registerAnimation from "../assets/lottie/lottie-signup.json";

const Register = () => {
  const { createUser, updateUser, setUser, fetchUserCoins } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); 
  const imageHostKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;

  const handleRegister = async (event) => {
    event.preventDefault();
    setIsLoading(true); 
    const form = event.target;
    const name = form.name.value.trim();
    const photoURL = form.photoURL.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const role = form.role.value;
    const photo = form.image.files[0];

    if (!name || !email || !password || (!photoURL && !photo)) {
      toast.error("All fields are required!");
      setIsLoading(false); 
      return;
    }

    try {
      let imgResponse = null;
      if (photo) {
        const formData = new FormData();
        formData.append("image", photo);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        imgResponse = await axios.post(url, formData);

        if (!imgResponse.data.success) {
          toast.error("Image upload failed. Please try again.");
          setIsLoading(false); 
          return;
        }
      }

      const result = await createUser(email, password);
      const firebaseUser = result.user;

      await updateUser({
        displayName: name,
        photoURL: imgResponse ? imgResponse.data.data.url : photoURL,
      });

      await axios.post("https://b10-a12-server.vercel.app/api/users/register", {
        name,
        email,
        role,
        photoURL: imgResponse ? imgResponse.data.data.url : photoURL,
      });

      const coins = await fetchUserCoins(email);
      setUser({ ...firebaseUser, coins });

      toast.success("Registration successful!");
      navigate("/dashboard");
      form.reset();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("This email is already in use.");
      } else {
        toast.error(`Registration failed: ${error.message}`);
      }
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-200 to-pink-200 flex items-center justify-center px-4 py-11">
      <Toaster position="top-center" />
      <div className="flex flex-col lg:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-6xl">
        {/* Animation Section */}
        <div className="w-full lg:w-1/2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center p-8">
          <Lottie animationData={registerAnimation} loop={true} className="w-full max-w-lg" />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-10">
          <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-4">Create an Account</h1>
          <p className="text-gray-600 text-center mb-8">Start your journey with us today!</p>

          <form onSubmit={handleRegister} className="space-y-6">
            {/* Name Field */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 shadow-sm"
                required
              />
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 shadow-sm"
                required
              />
            </div>

            {/* Photo URL Field */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Photo URL</label>
              <input
                type="text"
                name="photoURL"
                placeholder="Photo URL"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 shadow-sm"
              />
            </div>

            {/* Image Upload Field */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Profile Image</label>
              <input
                type="file"
                name="image"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 shadow-sm"
              />
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 shadow-sm"
                required
              />
            </div>

            {/* Role Selection */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Role</label>
              <select
                name="role"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 shadow-sm"
                defaultValue="buyer"
                required
              >
                <option value="buyer">Buyer</option>
                <option value="worker">Worker</option>
              </select>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className={`w-full py-3 text-white bg-gradient-to-r from-purple-600 to-indigo-500 rounded-lg shadow-lg font-semibold hover:from-purple-700 hover:to-indigo-600 transition-all duration-300 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 font-bold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
