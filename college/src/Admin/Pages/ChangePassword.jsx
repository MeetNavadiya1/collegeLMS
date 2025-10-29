import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { toast } from 'react-toastify'; // Optional but better UX
import { useContext } from 'react';
import { AppContext } from '../../Context/AppContext';
import { useNavigate } from 'react-router-dom';

const ChangePasswordPage = () => {

  const {backendURL, admin} = useContext(AppContext);
  const [formData, setFormData] = useState({
    email: localStorage.getItem("adminEmail") || "admin1@gmail.com", // load from login data
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!admin){
      navigate('/login');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('New passwords do not match!');
      return;
    }

    try {
      const { data } = await axios.put(`${backendURL}/api/admin/change-password`, {
        email: formData.email,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      if (data.success) {
        toast.success("Password changed successfully!");
        setFormData({ ...formData, currentPassword: '', newPassword: '', confirmPassword: '' });
        navigate('/admin');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 mt-6 mb-10 bg-gray-50 flex items-center justify-center">
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8 w-full max-w-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Change Password</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                readOnly
                className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ChangePasswordPage;
