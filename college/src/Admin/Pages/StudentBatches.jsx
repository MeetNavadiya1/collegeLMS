import React from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const StudentBatches = () => {
    const batches = [
        {
            name: 'Batch MCA 2023',
            createdAt: '2023-08-01',
            totalStudents: 60,
            accountsCreated: 48,
        },
        {
            name: 'Batch MCA 2022',
            createdAt: '2022-08-01',
            totalStudents: 55,
            accountsCreated: 52,
        },
        {
            name: 'Batch MCA 2021',
            createdAt: '2021-08-01',
            totalStudents: 50,
            accountsCreated: 49,
        },
        {
            name: 'Batch MCA 2020',
            createdAt: '2020-08-01',
            totalStudents: 45,
            accountsCreated: 40,
        },
    ];

    return (
        <>
        <Navbar/>
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Student Batches</h1>

            {/* Two-column layout */}
            <div className="flex flex-col lg:flex-row gap-6 items-start">
                {/* Left: Create New Batch Card */}
                <Link to="/admin/batches/create">
                <div className="w-full lg:w-60 flex-shrink-0">
                    <div className="bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-lg flex flex-col items-center justify-center p-6 transition-colors duration-200">
                        <div className='p-2 rounded-4xl bg-gray-400'>
                            <PlusIcon className="h-10 w-10 text-gray-8  00" />
                        </div>
                        <span className="text-gray-500 font-semibold text-center">Create New Batch</span>
                    </div>
                </div>
                </Link>

                {/* Right: Batches Grid */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {batches.map((batch, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">{batch.name}</h2>
                                <p className="text-xs text-gray-500">Created at: {batch.createdAt}</p>
                            </div>
                            <div className="flex justify-between items-center mt-6 text-sm text-gray-700">
                                <div className="flex flex-col justify-center space-y-1">
                                    <p className="text-blue-800">
                                        <span className="font-bold">{batch.totalStudents}</span> Total Students
                                    </p>
                                    <p className="text-green-600">
                                        <span className="font-bold">{batch.accountsCreated}</span> Accounts Created
                                    </p>
                                </div>
                                <Link to='/admin/batches/:batchId' className="text-blue-600 hover:underline font-medium self-center">
                                    View Details
                                </Link>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default StudentBatches;
