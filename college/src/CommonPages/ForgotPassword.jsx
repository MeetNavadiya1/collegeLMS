import React, { useState } from 'react';
import { EnvelopeIcon } from '@heroicons/react/24/solid';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to send reset password email
    alert(`Password reset link sent to ${email}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        {/* Logo */}
        <div className="text-center text-3xl font-bold text-blue-800 mb-4">MCAclg</div>

        {/* Description */}
        <p className="text-center text-gray-600 mb-6">
          Enter your registered email. We will send a new password to your email.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <EnvelopeIcon className="h-5 w-5" />
              </span>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-3 rounded hover:bg-blue-700 transition duration-200"
          >
            Send New Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
