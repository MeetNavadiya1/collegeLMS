import React, { useState } from 'react';
import axios from 'axios';
import { EnvelopeIcon, UserIcon, KeyIcon, IdentificationIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../Context/AppContext';

const StudentRegistration = () => {
  const navigate = useNavigate();
  const { backendURL, setStudent } = useContext(AppContext)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    enrollment: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(`${backendURL}/api/student/register`, {
        name: formData.name,
        email: formData.email,
        enrollment: formData.enrollment,
        password: formData.password
      });

      // Show message from API
      if (data.success) {
        toast.success(data.message || "Registration successful");

        // Store in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("batch", data.user.batch);
        localStorage.setItem("sem", data.user.sem);

        setStudent(true);
        // Navigate to student home
        navigate("/student");
      } else {
        toast.error(data.message || "Registration failed");
      }

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-2">MCAclg</h1>
        <p className="text-center text-gray-600 mb-6">Register to start your journey</p>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="relative">
            <UserIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="relative">
            <EnvelopeIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="relative">
            <IdentificationIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="enrollment"
              placeholder="Enrollment Number"
              value={formData.enrollment}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="relative">
            <KeyIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="relative">
            <KeyIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-800 text-white py-3 rounded hover:bg-blue-700 transition duration-200"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <div className="mt-4 text-center text-sm text-gray-700">
            Already have a student account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentRegistration;
