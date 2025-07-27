import React, { useState } from 'react';
import {
    UserCircleIcon,
    XMarkIcon,
    ArrowRightOnRectangleIcon,
    KeyIcon,
    Bars3BottomLeftIcon
} from '@heroicons/react/24/solid';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    return (
        <nav className="border-b border-gray-300 px-4 py-2 flex justify-between items-center relative bg-white z-50">
            {/* Left side: Logo and Links */}
            <div className="flex items-center space-x-4">
                {/* Mobile burger icon */}
                <div className="md:hidden">
                    {menuOpen ? (
                        <XMarkIcon className="h-6 w-6 cursor-pointer" onClick={toggleMenu} />
                    ) : (
                        <Bars3BottomLeftIcon className="h-6 w-6 cursor-pointer" onClick={toggleMenu} />
                    )}
                </div>

                {/* Logo */}
                <Link to='/admin/'><span className="font-bold text-xl">MCAclg</span></Link>

                {/* Desktop Links */}
                <ul className="hidden text-sm md:flex space-x-6 text-gray-800">
                    <li>
                        <NavLink
                            to="/admin/"
                            className={({ isActive }) =>
                                `hover:text-blue-600 ${isActive ? 'text-blue-700' : ''}`
                            }
                        >
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/admin/batches"
                            className={({ isActive }) =>
                                `hover:text-blue-600 ${isActive ? 'text-blue-700' : ''}`
                            }
                        >
                            Student Batches
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/admin/professors"
                            className={({ isActive }) =>
                                `hover:text-blue-600 ${isActive ? 'text-blue-700' : ''}`
                            }
                        >
                            Professors
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/admin/announcements"
                            className={({ isActive }) =>
                                `hover:text-blue-600 ${isActive ? 'text-blue-700' : ''}`
                            }
                        >
                            Announcement
                        </NavLink>
                    </li>
                </ul>

            </div>

            {/* Right side: User Icon and Dropdown */}
            <div className="relative">
                <UserCircleIcon className="h-8 w-8 text-gray-700 cursor-pointer" onClick={toggleDropdown} />

                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-44 bg-black rounded-md shadow-xl z-50">
                        <ul className="text-sm text-white">
                            <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-800 cursor-pointer rounded-t-md">
                                <KeyIcon className="h-5 w-5" />
                                <Link to="/admin/change-password">Change Password</Link>
                            </li>
                            <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-800 cursor-pointer rounded-b-md">
                                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                                <Link to="/admin/logout">Logout</Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Mobile Links */}
            {menuOpen && (
                <div className="absolute top-full left-0 mt-2 bg-black border w-full px-4 py-2 md:hidden z-40">
                    <ul className="flex flex-col space-y-2 text-white">
                        <li>
                            <NavLink
                                to="/admin/"
                                className={({ isActive }) =>
                                    `hover:text-blue-400 ${isActive ? 'text-blue-400' : ''}`
                                }
                            >
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/admin/batches/create"
                                className={({ isActive }) =>
                                    `hover:text-blue-400 ${isActive ? 'text-blue-400' : ''}`
                                }
                            >
                                Student Batches
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/admin/professors"
                                className={({ isActive }) =>
                                    `hover:text-blue-400 ${isActive ? 'text-blue-400' : ''}`
                                }
                            >
                                Professors
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/admin/announcements"
                                className={({ isActive }) =>
                                    `hover:text-blue-400 ${isActive ? 'text-blue-400' : ''}`
                                }
                            >
                                Announcement
                            </NavLink>
                        </li>
                    </ul>

                </div>
            )}
        </nav>
    );
};

export default Navbar;
