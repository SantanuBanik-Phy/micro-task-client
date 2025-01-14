import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";
import { Toaster, toast } from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";

const Login = () => {
    const { signIn, googleSignIn, setUser, fetchUserCoins } = useContext(AuthContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const googleProvider = new GoogleAuthProvider();

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);

                // Fetch coins and update user state
                fetchUserCoins(user.email).then(coins => {
                    setUser({ ...user, coins });
                    toast.success('Login successful!');
                    navigate(from, { replace: true });
                });
            })
            .catch(error => {
                console.error(error);
                setError(error.message);
            });
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await googleSignIn(googleProvider);
            const user = result.user;

            // Check if user exists in the database
            const response = await axios.get(`http://localhost:3000/api/users?email=${user.email}`);
            if (response.data.exists) {
                console.log("User already exists in database.");
            } else {
                console.log("New user, saving to database...");
                // Save the new user to the database
                await axios.post("http://localhost:3000/api/users/register", {
                    name: user.displayName,
                    email: user.email,
                    role: "worker", // Default role for Google Sign-In users
                    photoURL: user.photoURL,
                });
            }

            // Fetch coins and update user state
            const coins = await fetchUserCoins(user.email);
            setUser({ ...user, coins });

            toast.success('Login successful!');
            navigate(from, { replace: true });
        } catch (error) {
            console.error("Error during Google Sign-In:", error);
            setError(error.message);
        }
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <Toaster></Toaster>
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
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
                            <label className="label">
                                <Link to="/register" className="label-text-alt link link-hover">New to this website? Please Register</Link>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <div>
                            <p className="text-red-500">{error}</p>
                        </div>
                    </form>
                    <div className="divider">OR</div>
                    <div className="grid h-20 card rounded-box place-items-center">
                        <button onClick={handleGoogleSignIn} className="btn btn-outline btn-success">CONTINUE WITH GOOGLE</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
