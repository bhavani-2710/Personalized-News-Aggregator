import React, { useState } from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; 
const API_URL = import.meta.env.VITE_API_BACKEND_URL

const Register = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "fullName") {
      setFullName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  // Validate the form before submission
  const validateForm = () => {
    if (!fullName || !email || !password) {
      setError("All fields are required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    setError(""); // Reset any previous errors
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Prevent submission if validation fails

    try {
      setLoading(true);
      // Make API call to register user (replace URL with your API)
      const response = await axios.post(`${API_URL}/users/register`, {
        name: fullName,
        email,
        password,
      });
    console.log(response.data)
      setLoading(false);
      if (response.data.message === "User registered!") {
        // Redirect to login page or dashboard
        navigate("/login");
      } else {
        setError(response.data.message || "Something went wrong, please try again");
      }
    } catch (error) {
      setLoading(false);
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-yellow-950">
      <div className="bg-white p-10 rounded-lg shadow-2xl w-md">
        <h2 className="text-5xl font-bold text-yellow-600 text-center mb-6">Create an Account</h2>
        <p className="text-center text-gray-700 mb-6">Join the NewsHub today!</p>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-600"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-lg text-white text-lg font-bold transition duration-300 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-600 hover:bg-yellow-700"}`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="text-center text-gray-700 my-6">OR</div>

        <div className="flex justify-center space-x-4">
          <button className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300">
            <FaGoogle /> <span>Google</span>
          </button>
          <button className="flex items-center space-x-2 bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition duration-300">
            <FaFacebook /> <span>Facebook</span>
          </button>
        </div>

        <p className="text-center text-gray-700 mt-6">
          Already have an account? {" "}
          <Link to="/login" className="text-yellow-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;