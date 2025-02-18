import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";
import { Toaster, toast } from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import Lottie from "lottie-react";
import loginAnimation from "../assets/lottie/lottie-login.json"; // Update this path to your Lottie file
import googleImage from "../assets/google.png"; // Update this path to your Google logo image

const Login = () => {
  const { signIn, googleSignIn, setUser, fetchUserCoins } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [role, setRole] = useState('worker');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const googleProvider = new GoogleAuthProvider();
  // Handle role tab click (worker, buyer, admin)
  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    switch (selectedRole) {
      case 'worker':
        setEmail('workeremail@gmail.com...@example.com');
        break;
      case 'buyer':
        setEmail('buyeremail@gmail.com...@example.com ');
        break;
      case 'admin':
        setEmail('adminemail@gmail.com...@example.com');
        break;
      default:
        setEmail('');
        break;
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setIsLoading(true); 
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        fetchUserCoins(user.email).then((coins) => {
          setUser({ ...user, coins });
          toast.success("Login successful!");
          navigate(from, { replace: true });
        });
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false); 
      });
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true); 
    try {
      const result = await googleSignIn(googleProvider);
      const user = result.user;

      // Check if the user exists in the database
      const response = await axios.get(`https://b10-a12-server.vercel.app/users?email=${user.email}`);
      if (!response.data.exists) {
        // Save the new user to the database
        await axios.post("https://b10-a12-server.vercel.app/api/users/register", {
          name: user.displayName,
          email: user.email,
          role: "worker",
          photoURL: user.photoURL,
        });
      }

      // Fetch coins and update user state
      const coins = await fetchUserCoins(user.email);
      setUser({ ...user, coins });

      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
      setError(error.message);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-300 via-blue-200 to-indigo-400 flex flex-col justify-center items-center">
      <Toaster position="top-center" />
      <div className="flex flex-col lg:flex-row justify-between items-center w-full max-w-6xl px-6">
        <div className="w-full lg:w-1/2 flex justify-center mb-10 lg:mb-0">
          <Lottie animationData={loginAnimation} loop={true} className="max-w-md lg:max-w-lg" />
        </div>

        {/* Login Form */}
        <div className="w-full lg:w-1/2 bg-white rounded-3xl shadow-2xl p-10">
          <h1 className="text-5xl font-extrabold text-gray-800 text-center mb-6">Welcome Back!</h1>
          <p className="text-gray-600 text-center mb-8 text-lg">
            Log in to your account and explore all features.
          </p>

          {/* Credential Selection Tabs */}
          <div className="flex justify-center space-x-6 mb-6">
            <button
              onClick={() => handleRoleChange('worker')}
              className={`px-6 py-2 rounded-xl transition ${role === 'worker' ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}
            >
              Worker
            </button>
            <button
              onClick={() => handleRoleChange('buyer')}
              className={`px-6 py-2 rounded-xl transition ${role === 'buyer' ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}
            >
              Buyer
            </button>
            <button
              onClick={() => handleRoleChange('admin')}
              className={`px-6 py-2 rounded-xl transition ${role === 'admin' ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}
            >
              Admin
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Email <span className="text-red-500">*</span></span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-xl p-4 text-gray-500"
                required
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Password <span className="text-red-500">*</span></span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-xl p-4 text-gray-500"
                required
              />
              {error && (
                <p className="text-red-600 text-sm mt-2">
                  {error.replace("auth/", "").replace("-", " ")}
                </p>
              )}
            </div>

            <div className="form-control">
              <button
                type="submit"
                className={`btn w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 ${
                  isLoading ? "opacity-70 cursor-not-allowed text-black" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Logging In..." : "Log In"}
              </button>
            </div>
          </form>

          <div className="divider my-6">OR</div>

          <button
            onClick={handleGoogleSignIn}
            className={`btn btn-outline w-full flex justify-center items-center space-x-3 border-gray-300 hover:bg-gray-100 py-3 rounded-xl ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            <img src={googleImage} className="w-6 h-6" alt="Google logo" />
            <span>{isLoading ? "Processing..." : "Continue with Google"}</span>
          </button>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-bold hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
