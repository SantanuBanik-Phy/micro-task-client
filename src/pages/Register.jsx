import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";

const Register = () => {
  const { createUser, updateUser, setUser, fetchUserCoins } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;

    try {
      // Create user using Firebase
      const result = await createUser(email, password);
      const firebaseUser = result.user;

      console.log("User created in Firebase:", firebaseUser);

      await updateUser({ displayName: name, photoURL });

      // Save user to the database
      await axios.post("http://localhost:3000/api/users/register", {
        name,
        email,
        role,
        photoURL,
      });

      // Fetch coins and update AuthContext user state
      const coins = await fetchUserCoins(email);
      setUser({ ...firebaseUser, coins });

      toast.success("Registration successful!");
      navigate("/"); // Navigate to home or dashboard
      form.reset();
      setError('');
    } catch (error) {
      console.error("Error during registration:", error);
      setError(error.message);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <Toaster />
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" name="name" placeholder="name" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input type="text" name="photoURL" placeholder="photoURL" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" name="email" placeholder="email" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" name="password" placeholder="password" className="input input-bordered" required />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Select Role</span>
              </label>
              <select name="role" className="select select-bordered" defaultValue="buyer" required>
                <option value="buyer">Buyer</option>
                <option value="worker">Worker</option>
              </select>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
            <div>
              <p className="text-red-500">{error}</p>
            </div>
          </form>
          <div className="divider">OR</div>
          <div className="grid h-20 card rounded-box place-items-center">
            <Link to='/login' className="btn btn-outline btn-success">Already Have an account? Please Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
