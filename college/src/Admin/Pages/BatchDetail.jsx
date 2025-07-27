import React, { useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const studentData = {
    all: [
        { name: "Raj Patel", enrollment: "23MCA001", email: "raj@example.com", password: "********" },
        { name: "Neha Singh", enrollment: "23MCA002", email: "neha@example.com", password: "********" },
    ],
    created: [{ name: "Raj Patel", enrollment: "23MCA001", email: "raj@example.com", password: "********" }],
    notCreated: [{ name: "Neha Singh", enrollment: "23MCA002", email: "neha@example.com", password: "********" }],
    deleted: [],
};

const BatchDetail = () => {
    const [activeTab, setActiveTab] = useState("all");
    const [newEnrollment, setNewEnrollment] = useState("");
    const [semester, setSemester] = useState("");

    const handleAddEnrollment = (e) => {
        e.preventDefault();
        if (newEnrollment.trim()) {
            setNewEnrollment("");
        }
    };

    return (
        <>
        <Navbar/>
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            {/* Back Button + Page Title */}
            <div className="flex items-center mb-6">
                <Link to="/admin/batches" className="flex items-center text-blue-600 hover:underline mr-4">
                    <ArrowLeftIcon className="h-5 w-5 mr-1" />
                    Back
                </Link>
                <h2 className="text-2xl font-bold text-gray-800">Batch Details</h2>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left: Add Enrollment Number */}
                    <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Add Enrollment Number</h4>
                        <form onSubmit={handleAddEnrollment} className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="text"
                                value={newEnrollment}
                                onChange={(e) => setNewEnrollment(e.target.value)}
                                placeholder="Enter enrollment number"
                                className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                            >
                                Submit
                            </button>
                        </form>
                    </div>

                    {/* Right: Change Semester with left border */}
                    <div className="flex-1 lg:border-l lg:border-gray-300 lg:pl-6">
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Change Semester</h4>
                        <div className="mb-1">
                            <p className="text-sm text-gray-600">
                                <span className="font-medium text-gray-800">Current Semester:</span> Semester {semester}
                            </p>
                        </div>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const confirmed = window.confirm(`Are you sure you want to update the semester to Semester ${semester}?`);
                                if (confirmed) {
                                    // Proceed with the update logic
                                    alert(`Semester updated to Semester ${semester}`);
                                    // Optionally call an API or function here
                                }
                            }}
                            className="flex flex-col sm:flex-row gap-4 items-start sm:items-end"
                        >
                            <select
                                value={semester}
                                onChange={(e) => setSemester(e.target.value)}
                                className="w-full sm:w-64 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="1">Semester 1</option>
                                <option value="2">Semester 2</option>
                                <option value="3">Semester 3</option>
                                <option value="4">Semester 4</option>
                            </select>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                            >
                                Update
                            </button>
                        </form>

                    </div>
                </div>
            </div>


            {/* Student Details Card */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Student Details</h3>

                {/* Tabs */}
                <div className="flex flex-wrap gap-4 mb-4 text-sm font-medium">
                    {["all", "created", "notCreated", "deleted"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-1 rounded ${activeTab === tab
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                }`}
                        >
                            {tab === "all"
                                ? "All Students"
                                : tab === "created"
                                    ? "Account Created"
                                    : tab === "notCreated"
                                        ? "Not Created"
                                        : "Deleted"}
                        </button>
                    ))}
                </div>

                {/* Scrollable Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="px-4 py-2 text-left">S.No</th>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Enrollment No</th>
                                <th className="px-4 py-2 text-left">Email</th>
                                <th className="px-4 py-2 text-left">Password</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {studentData[activeTab].map((student, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-4 py-2">{idx + 1}</td>
                                    <td className="px-4 py-2">{student.name}</td>
                                    <td className="px-4 py-2">{student.enrollment}</td>
                                    <td className="px-4 py-2">{student.email}</td>
                                    <td className="px-4 py-2">{student.password}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            className="text-red-600 hover:underline"
                                            onClick={() => {
                                                const confirmed = window.confirm("Are you sure you want to delete this student?");
                                                if (confirmed) {
                                                    // Replace this with your actual delete function
                                                    console.log(`Deleting student: ${student.name}`);
                                                }
                                            }}
                                        >
                                            Delete
                                        </button>

                                    </td>
                                </tr>
                            ))}
                            {studentData[activeTab].length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center px-4 py-4 text-gray-500">
                                        No data available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-10 flex justify-center">
                <button
                    onClick={() => {
                        const confirmed = window.confirm("Are you sure you want to delete this batch? This action cannot be undone.");
                        if (confirmed) {
                            // Replace this with your actual delete batch logic
                            alert("Batch deleted successfully.");
                        }
                    }}
                    className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors duration-200"
                >
                    Delete Batch
                </button>
            </div>

        </div>
        <Footer/>
        </>
    );
};

export default BatchDetail;
