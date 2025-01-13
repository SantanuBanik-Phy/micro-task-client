import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider";

const Register = () => {
  const { createUser, updateUser } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;

    // Create user using Firebase or AuthContext
    createUser(email, password)
      .then(result => {
        const user = result.user;
        console.log('User created in Firebase:', user);
        updateUser({ displayName: name, photoURL })
          .then(() => {
            saveUser(name, email, role,password, photoURL);
            toast.success('Registration successful!');
            navigate('/'); // Navigate to dashboard or login page
          })
          .catch(error => console.error('Error updating Firebase user:', error));

        form.reset();
        setError('');
      })
      .catch(error => {
        console.error('Error during registration:', error);
        setError(error.message);
      });
  };

  const saveUser = async (name, email, password, role, photoURL) => {
    const user = { name, email,password, role, photoURL };
    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();

      if (response.ok) {
        console.log('User saved successfully:', data);
      } else {
        console.error('Failed to save user:', data.error);
        toast.error(data.error || 'Failed to register user');
      }
    } catch (error) {
      console.error('Error saving user:', error);
      toast.error('An error occurred while registering');
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
              <select name="role" className="select select-bordered">
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
