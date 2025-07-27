import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AnnouncementPage = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: null,
        semester: '',
        batch: '',
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData({ ...formData, image: URL.createObjectURL(files[0]) });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newAnnouncement = {
            ...formData,
            createdAt: new Date().toLocaleDateString(),
        };
        setAnnouncements([...announcements, newAnnouncement]);
        setFormData({ title: '', description: '', image: null, semester: '', batch: '' });
    };

    const handleDelete = (index) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this announcement?');
        if (confirmDelete) {
            const updated = [...announcements];
            updated.splice(index, 1);
            setAnnouncements(updated);
        }
    };

    const getFirstTwoLines = (text) => {
        const lines = text.split('\n');
        return lines.slice(0, 2).join(' ');
    };

    return (
        <>
            <Navbar />
            <div className="p-6 bg-gray-50 min-h-screen">
                <h1 className="text-2xl font-bold mb-6">Announcements</h1>

                {/* Create Announcement Card */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Create Announcement</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={formData.title}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-2"
                            required
                        />
                        <textarea
                            name="description"
                            placeholder="Description (multiline)"
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                            className="md:col-span-2 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <select
                            name="semester"
                            value={formData.semester}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Semester</option>
                            <option value="1">Semester 1</option>
                            <option value="2">Semester 2</option>
                            <option value="3">Semester 3</option>
                            <option value="4">Semester 4</option>
                        </select>
                        <select
                            name="batch"
                            value={formData.batch}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Batch</option>
                            <option value="MCA 2023">MCA 2023</option>
                            <option value="MCA 2022">MCA 2022</option>
                            <option value="MCA 2021">MCA 2021</option>
                        </select>

                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full md:w-auto"
                            >
                                Create Announcement
                            </button>
                        </div>
                    </form>
                </div>

                {/* Announcements Table */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Announcement List</h2>
                    <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                        <table className="min-w-full text-sm border border-gray-200 rounded overflow-hidden">
                            <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                                <tr>
                                    <th className="px-4 py-2 text-left">S.No</th>
                                    <th className="px-4 py-2 text-left">Title</th>
                                    <th className="px-4 py-2 text-left">Image</th>
                                    <th className="px-4 py-2 text-left">Description</th>
                                    <th className="px-4 py-2 text-left">Date</th>
                                    <th className="px-4 py-2 text-left">Semester</th>
                                    <th className="px-4 py-2 text-left">Batch</th>
                                    <th className="px-4 py-2 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {announcements.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-2">{index + 1}</td>
                                        <td className="px-4 py-2">{item.title}</td>
                                        <td className="px-4 py-2">
                                            <img src={item.image} alt="Preview" className="h-10 w-10 object-cover rounded" />
                                        </td>
                                        <td className="px-4 py-2">{getFirstTwoLines(item.description)}</td>
                                        <td className="px-4 py-2">{item.createdAt}</td>
                                        <td className="px-4 py-2">{item.semester}</td>
                                        <td className="px-4 py-2">{item.batch}</td>
                                        <td className="px-4 py-2 space-x-2">
                                            <button className="text-blue-600 hover:underline">Update</button>
                                            <button
                                                className="text-red-600 hover:underline"
                                                onClick={() => handleDelete(index)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {announcements.length === 0 && (
                                    <tr>
                                        <td colSpan="8" className="text-center px-4 py-4 text-gray-500">
                                            No announcements available.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AnnouncementPage;
