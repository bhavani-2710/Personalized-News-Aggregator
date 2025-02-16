import React, { useState } from "react";
import axios from "axios";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in ALL the fields!");
      console.log(error)
      return;
    }

    setError("");
    setLoading(true)

    try {
      let API_BASE_URL = "http://localhost:5000";

      const response = await axios.post(`${API_BASE_URL}/users/login`, {
        email,
        password,
      });
      console.log(response.data);

      if(response.data.message === 'Login Successfull'){
        localStorage.setItem('token', response.data.token)
        navigate('/home')
      }
    } catch (error) {
      setError(error)
      console.log(error)
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back!
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Login to your News Aggregator account
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            {error && <div className="flex justify-center text-red-400">{error.response.data.error}</div>}
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 cursor-pointer" />
              <span className="text-gray-600">Remember Me</span>
            </label>
            <a href="#" className="text-blue-500 text-sm hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full  text-white py-2 rounded-lg cursor-pointer transition duration-300 ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-600">OR</div>

        <div className="flex justify-center space-x-4 mt-4">
          <button className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300">
            <FaGoogle /> <span>Google</span>
          </button>
          <button className="flex items-center space-x-2 bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition duration-300">
            <FaFacebook /> <span>Facebook</span>
          </button>
        </div>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
