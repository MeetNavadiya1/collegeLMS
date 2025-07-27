import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfessorNavbar from '../components/Navbar';
import ProfessorFooter from '../components/Footer';

const ProfChangePasswordPage = () => {
  const navigate = useNavigate();

  // Simulated professor data (these would normally come from context or API)
  const professor = {
    name: 'Prof. John Doe',
    email: 'john.doe@college.edu',
    batch: '2020-2024',
    currentSem: '6',
  };

  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    // Simulate password change process
    console.log("Password Changed:", form);
    alert("Password changed successfully.");
    setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <>
    <ProfessorNavbar/>
    
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center items-start">
      <div className="w-full max-w-xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-sm text-blue-600 hover:underline"
        >
          ← Back
        </button>

        {/* Card */}
        <div className="bg-white border rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 text-center">
            Change Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={professor.name}
                disabled
                className="border rounded px-4 py-2 w-full bg-gray-100 text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={professor.email}
                disabled
                className="border rounded px-4 py-2 w-full bg-gray-100 text-sm"
              />
            </div>

            {/* Batch & Semester */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Batch</label>
                <input
                  type="text"
                  value={professor.batch}
                  disabled
                  className="border rounded px-4 py-2 w-full bg-gray-100 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Semester</label>
                <input
                  type="text"
                  value={professor.currentSem}
                  disabled
                  className="border rounded px-4 py-2 w-full bg-gray-100 text-sm"
                />
              </div>
            </div>

            {/* Current Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={form.currentPassword}
                onChange={handleChange}
                className="border rounded px-4 py-2 w-full text-sm"
                required
              />
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                className="border rounded px-4 py-2 w-full text-sm"
                required
              />
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="border rounded px-4 py-2 w-full text-sm"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
    <ProfessorFooter/>
    </>
  );
};

export default ProfChangePasswordPage;
