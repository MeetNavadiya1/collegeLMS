import React, { useState } from 'react';
import {
    UserCircleIcon,
    ArrowRightOnRectangleIcon,
    PencilSquareIcon,
    BellIcon
} from '@heroicons/react/24/solid';
import { NavLink, Link } from 'react-router-dom';

const StudentNavbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const studentName = "John Doe";

    return (
        <nav className="border-b border-gray-300 px-4 py-2 flex justify-between items-center relative bg-white z-50">
            {/* Left Side: Logo and Batch */}
            <div className="flex items-center space-x-4">
                <Link to='/student' className="font-bold text-xl">MCAclg</Link>
                {/* <span className="text-sm font-medium text-gray-700">{batchName}</span> */}
            </div>

            {/* Right Side: Notification and Profile */}
            <div className="flex items-center space-x-4 relative">
                {/* Notification Icon */}
                <Link to='/student/announcements'><BellIcon className="h-6 w-6 text-gray-700 cursor-pointer" /></Link>

                {/* Profile + Name */}
                <div className="flex items-center space-x-2 mr-1 cursor-pointer" onClick={toggleDropdown}>
                    <UserCircleIcon className="h-8 w-8 text-gray-700" />
                    <span className="text-sm font-medium text-gray-800 md:inline">{studentName}</span>
                </div>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                    <div className="absolute right-0 top-12 w-48 bg-black rounded-md shadow-xl z-50">
                        <ul className="text-sm text-white">
                            <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-800 cursor-pointer rounded-t-md">
                                <PencilSquareIcon className="h-5 w-5" />
                                <NavLink to="/student/updateprofile">Update Profile</NavLink>
                            </li>
                            <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-800 cursor-pointer rounded-b-md">
                                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                                <NavLink to="/student/logout">Logout</NavLink>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default StudentNavbar;
