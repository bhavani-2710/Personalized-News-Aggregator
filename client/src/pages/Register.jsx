import React from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-yellow-950">
      <div className="bg-white p-10 rounded-lg shadow-2xl w-md">
        <h2 className="text-5xl font-bold text-yellow-600 text-center mb-6">Create an Account</h2>
        <p className="text-center text-gray-700 mb-6">Join the NewsHub today!</p>

        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-600"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg text-white text-lg font-bold transition duration-300 bg-yellow-600 hover:bg-yellow-700"
          >
            Register
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
