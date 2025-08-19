import React, { useState, useContext } from 'react';
import axios from 'axios';
import { EnvelopeIcon, KeyIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const { backendURL, setStudent, setProfessor, setAdmin } = useContext(AppContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const { data } = await axios.post(`${backendURL}/api/common/login`, {
                email: formData.email,
                password: formData.password
            });

            if (data.success) {
                toast.success(data.message || "Login successful");

                // Store credentials in localStorage
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.user.role);
                if (data.user.batch) localStorage.setItem("batch", data.user.batch);
                if (data.user.sem) localStorage.setItem("sem", data.user.sem);

                if (data.user.role === "student") {
                    setStudent(true);
                    navigate("/student");
                } else if (data.user.role === "professor") {
                    setProfessor(true)
                    navigate("/professor");
                } else if (data.user.role === "admin") {
                    setAdmin(true);
                    navigate("/admin");
                }
            } else {
                toast.error(data.message || "Login failed");
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
                <div className="text-center text-3xl font-bold text-black mb-8">MCAclg</div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm text-gray-700 mb-1">Email</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                <EnvelopeIcon className="h-5 w-5" />
                            </span>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                <KeyIcon className="h-5 w-5" />
                            </span>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400"
                            >
                                {showPassword ? (
                                    <EyeSlashIcon className="h-5 w-5" />
                                ) : (
                                    <EyeIcon className="h-5 w-5" />
                                )}
                            </span>
                        </div>
                    </div>

                    <div className="text-right text-sm">
                        <Link to='/forgot_password' className="text-blue-600 hover:underline">Forgot Password?</Link>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-800 text-white py-3 rounded hover:bg-blue-700 transition duration-200"
                    >
                        {loading ? "Logging in..." : "Log in"}
                    </button>

                    <div className="mt-4 text-center text-sm text-gray-700">
                        Don’t have a student account?{' '}
                        <Link to="/registration" className="text-blue-600 hover:underline font-medium">
                            Create here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
