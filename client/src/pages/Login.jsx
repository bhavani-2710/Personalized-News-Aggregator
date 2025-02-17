import React, { useState } from "react";
import axios from "axios";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in ALL the fields!");
      return;
    }

    setError("");
    setLoading(true);

    try {
      let API_BASE_URL = "http://localhost:5000";
      const response = await axios.post(`${API_BASE_URL}/users/login`, { email, password });
      
      if (response.data.message === "Login Successfull") {
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      }
    } catch (error) {
      setError(error.response?.data?.error || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-yellow-950">
      <div className="bg-white p-10 rounded-lg shadow-2xl w-md">
        <h2 className="text-5xl font-bold text-yellow-600 text-center mb-6">Welcome Back!</h2>
        <p className="text-center text-gray-700 mb-6">Login to your NewsHub account</p>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-600"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-600"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white text-lg font-bold transition duration-300 ${loading ? "bg-yellow-400 cursor-not-allowed" : "bg-yellow-600 hover:bg-yellow-700"}`}
          >
            {loading ? "Logging in..." : "Login"}
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
          Don't have an account? {" "}
          <Link to="/register" className="text-yellow-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;