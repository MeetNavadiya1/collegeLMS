import React, { useState, useContext } from 'react';
import { EnvelopeIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../Context/AppContext';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { backendURL } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const res = await axios.post(`${backendURL}/api/common/forgot_password`, { email });

      // Show toast with API message
      toast[res.data.success ? 'success' : 'error'](res.data.message);

    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="text-center text-3xl font-bold text-blue-800 mb-4">MCAclg</div>
        <p className="text-center text-gray-600 mb-6">
          Enter your registered email. We will send a new password to your email.
        </p>

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
                disabled={loading} // disable input while loading
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded transition duration-200 ${loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-800 hover:bg-blue-700 text-white'
              }`}
          >
            {loading ? 'Sending...' : 'Send New Password'}
          </button>

          <div className="mt-4 text-center text-sm text-gray-700">
              Already have a password?{' '}
              <Link to="/login" className="text-blue-600 hover:underline font-medium">
                Login here
              </Link>
            </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
