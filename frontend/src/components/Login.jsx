import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetUsername, setResetUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", formData);
      alert("Login Success!");
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      alert("Login Failed: " + err.response?.data?.message || err.message);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users/reset-password", {
        username: resetUsername,
        newPassword,
      });
      alert("Password reset successful!");
      setShowForgotPassword(false);
    } catch (err) {
      alert("Reset Failed: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-[url('/background.jpg')]">
      <div className="bg-white bg-opacity-30 backdrop-blur-lg p-8 rounded-xl shadow-md w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded focus:outline-none"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded focus:outline-none"
              required
            />
            <span
              className="absolute right-3 top-3 text-gray-600 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <div className="text-sm mt-4 flex justify-between items-center">
          <button
            onClick={() => setShowForgotPassword(true)}
            className="text-blue-600 hover:underline"
          >
            Forgot Password?
          </button>
          <p>
            No account?{' '}
            <a href="/register" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>

        {/* Forgot Password Form */}
        {showForgotPassword && (
          <div className="mt-6 bg-white bg-opacity-70 p-4 rounded">
            <h3 className="text-md font-semibold mb-3">Reset Password</h3>
            <form onSubmit={handlePasswordReset}>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full p-2 mb-3 border rounded"
                value={resetUsername}
                onChange={(e) => setResetUsername(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="New Password"
                className="w-full p-2 mb-3 border rounded"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Reset Password
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
