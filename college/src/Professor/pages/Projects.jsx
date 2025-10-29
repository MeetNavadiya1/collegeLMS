import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfessorNavbar from '../components/Navbar';
import ProfessorFooter from '../components/Footer';

const ProjectPage = () => {

    const [projects, setProjects] = useState([
        {
            title: 'AI Chatbot',
            createdAt: '2025-06-05',
            dueDate: '2025-06-25',
            description: 'Develop a conversational AI chatbot using NLP and machine learning.',
        },
        {
            title: 'E-commerce System',
            createdAt: '2025-06-06',
            dueDate: '2025-06-28',
            description: 'Create a complete online shopping platform with admin and user roles.',
        },
        {
            title: 'Smart Attendance',
            createdAt: '2025-06-07',
            dueDate: '2025-06-30',
            description: 'Implement face recognition for automating student attendance.',
        },
        {
            title: 'Library Management',
            createdAt: '2025-06-08',
            dueDate: '2025-07-01',
            description: 'Build a system to manage library book issuance, returns, and users.',
        },
    ]);

    const [form, setForm] = useState({
        title: '',
        dueDate: '',
        description: '',
        file: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setForm((prev) => ({ ...prev, file: e.target.files[0] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newProject = {
            title: form.title,
            dueDate: form.dueDate,
            createdAt: new Date().toISOString().split('T')[0],
            description: form.description,
        };

        setProjects((prev) => [...prev, newProject]);
        setForm({ title: '', dueDate: '', description: '', file: null });
    };

    const handleDelete = (index) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this project?");
        if (!confirmDelete) return;

        const updated = [...projects];
        updated.splice(index, 1);
        setProjects(updated);
    };


    const handleUpdate = (index) => {
        const proj = projects[index];
        setForm({
            title: proj.title,
            dueDate: proj.dueDate,
            description: proj.description,
            file: null,
        });

        // Optional: remove the project temporarily for editing and re-submit
        const updated = [...projects];
        updated.splice(index, 1);
        setProjects(updated);
    };

    return (
        <>
            <ProfessorNavbar />
            <div className="min-h-screen bg-gray-50 py-6 px-4">
                {/* Back Button */}
                
                <Link
                    to='/professor'
                    className="text-sm px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md shadow"
                >
                    ← Back
                </Link>

                {/* Create Project Card */}
                <div className="mt-5 max-w-4xl mx-auto bg-white border rounded-lg shadow p-6 mb-10">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Create New Project</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Title & Due Date */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Project Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    className="border rounded px-4 py-2 w-full text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Due Date
                                </label>
                                <input
                                    type="date"
                                    name="dueDate"
                                    value={form.dueDate}
                                    onChange={handleChange}
                                    className="border rounded px-4 py-2 w-full text-sm"
                                    required
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                name="description"
                                rows="4"
                                value={form.description}
                                onChange={handleChange}
                                className="border rounded px-4 py-2 w-full text-sm"
                                placeholder="Enter project description"
                                required
                            />
                        </div>

                        {/* File Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Upload File
                            </label>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="border rounded px-4 py-2 w-full text-sm"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded shadow hover:opacity-90 text-sm"
                        >
                            Create Project
                        </button>
                    </form>
                </div>

                {/* Projects Display */}
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Projects</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {projects.map((proj, idx) => (
                            <div
                                key={idx}
                                className="bg-white border rounded-lg shadow-sm p-4 flex flex-col"
                            >
                                <h3 className="text-sm font-semibold text-gray-800 mb-1">{proj.title}</h3>
                                <p className="text-xs text-gray-500">Created: {proj.createdAt}</p>
                                <p className="text-xs text-gray-500 mb-2">Due: {proj.dueDate}</p>
                                <p className="text-xs text-gray-700 mb-2">{proj.description}</p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    <button
                                        onClick={() => handleUpdate(idx)}
                                        className="text-xs text-yellow-600 hover:underline"
                                    >
                                        ✏️ Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(idx)}
                                        className="text-xs text-red-600 hover:underline"
                                    >
                                        🗑️ Delete
                                    </button>
                                    <Link
                                        to='/professor/projects/submissions/:id'
                                        className="text-xs text-blue-600 hover:underline ml-auto"
                                    >
                                        View Submissions
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ProfessorFooter />
        </>
    );
};

export default ProjectPage;
