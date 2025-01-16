import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";

const Register = () => {
  const { createUser, updateUser, setUser, fetchUserCoins } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const imageHostKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;

  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value; // Keep the photoURL field
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;
    const photo = form.image.files[0];

    // Input Validations
    if (!name) {
        toast.error("Name is required.");
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        toast.error("Please provide a valid email address.");
        return;
    }

    if (!photoURL && !photo) {
        toast.error("Please provide a photo URL or upload an image.");
        return;
    }

    const urlRegex = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;
    if (photoURL && !urlRegex.test(photoURL)) {
        toast.error("Please provide a valid photo URL starting with http:// or https://");
        return;
    }

    if (!/(?=.*[A-Z])/.test(password)) {
        toast.error("Password must contain at least one uppercase letter.");
        return;
    }

    if (!/(?=.*[a-z])/.test(password)) {
        toast.error("Password must contain at least one lowercase letter.");
        return;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters long.");
        return;
    }

    try {
        let imgResponse = null;
        if (photo) { // Only upload if an image file is selected
            const formData = new FormData();
            formData.append('image', photo);
            const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
            imgResponse = await axios.post(url, formData);
            console.log("Image upload response:", imgResponse);

            if (!imgResponse.data.success) {
                toast.error("Image upload failed. Please try again.");
                return;
            }
        }

        // Create user using Firebase
        const result = await createUser(email, password);
        const firebaseUser = result.user;

        console.log("User created in Firebase:", firebaseUser);

        await updateUser({
            displayName: name,
            photoURL: imgResponse ? imgResponse.data.data.url : photoURL 
        });

        // Save user to the database
        await axios.post("http://localhost:3000/api/users/register", {
            name,
            email,
            role,
            photoURL: imgResponse ? imgResponse.data.data.url : photoURL,
        });

        // Fetch coins and update AuthContext user state
        const coins = await fetchUserCoins(email);
        setUser({ ...firebaseUser, coins });

        toast.success("Registration successful!");
        navigate("/dashboard");
        form.reset();
        setError('');
    } catch (error) {
        console.error("Error during registration:", error);

        if (error.response && error.response.status === 409) {
            toast.error("This email is already in use.");
        } else if (error.code === "auth/invalid-email") {
            toast.error("Invalid email address.");
        } else {
            toast.error(`Registration failed: ${error.message}`);
        }
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
                            <input type="text" name="photoURL" placeholder="photoURL" className="input input-bordered" /> {/* Keep the photoURL field */}
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Profile Image</span>
                            </label>
                            <input type="file" name="image" className="file-input file-input-bordered w-full max-w-xs" />
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
