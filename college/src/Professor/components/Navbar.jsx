import React, { useState } from 'react';
import {
    UserCircleIcon,
    ArrowRightOnRectangleIcon,
    PencilSquareIcon
} from '@heroicons/react/24/solid';
import { NavLink, Link } from 'react-router-dom';

const ProfessorNavbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const professorName = "Prof. Sharma";

    return (
        <nav className="border-b border-gray-300 px-4 py-2 flex justify-between items-center relative bg-white z-50">
            {/* Left side: Logo */}
            <div className="flex items-center space-x-4">

                {/* Logo */}
                <Link to='/professor/'><span className="font-bold text-xl">MCAclg</span></Link>
            </div>

            {/* Right side: Profile Icon + Name + Dropdown */}
            <div className="relative">
                <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={toggleDropdown}
                >
                    <UserCircleIcon className="h-8 w-8 text-gray-700" />
                    <span className="text-sm font-medium text-gray-800 md:inline">{professorName}</span>
                </div>

                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-black rounded-md shadow-xl z-50">
                        <ul className="text-sm text-white">
                            <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-800 cursor-pointer rounded-t-md">
                                <PencilSquareIcon className="h-5 w-5" />
                                <NavLink to="/professor/changepassword">Change Password</NavLink>
                            </li>
                            <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-800 cursor-pointer rounded-b-md">
                                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                                <NavLink to="/professor/logout">Logout</NavLink>
                            </li>
                        </ul>
                    </div>
                )}
            </div>

        </nav>
    );
};

export default ProfessorNavbar;
