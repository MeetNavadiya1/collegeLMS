import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProfessorsPage = () => {
  const [professors, setProfessors] = useState([
    {
      name: 'John Doe',
      subject: 'Mathematics',
      batch: 'MCA 2024',
      semester: '1',
      email: 'john@example.com',
      password: '123456',
    },
    {
      name: 'Jane Smith',
      subject: 'Data Structures',
      batch: 'MCA 2025',
      semester: '2',
      email: 'jane@example.com',
      password: 'abcdef',
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    batch: '',
    semester: '',
    email: '',
    password: '',
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfessors([...professors, formData]);
    setFormData({
      name: '',
      subject: '',
      semester: '',
      email: '',
      password: '',
    });
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this professor?');
    if (confirmDelete) {
      const updated = [...professors];
      updated.splice(index, 1);
      setProfessors(updated);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Professors Management</h1>

      {/* Create Professor Card */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Create Professor Credentials</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            name="subject"
            type="text"
            placeholder="Subject Name"
            value={formData.subject}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <select
            name="batch"
            value={formData.batch}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Batch</option>
            <option value="1">MCA 2024</option>
            <option value="2">MCA 2025</option>
          </select>
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
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            name="password"
            type="text"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full md:w-auto"
          >
            Create Professor
          </button>
        </form>
      </div>

      {/* Professors Table Card */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Professors List</h2>
        <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
          <table className="min-w-full text-sm border border-gray-200 rounded overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-2 text-left">S.No</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Subject</th>
                <th className="px-4 py-2 text-left">Semester</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Password</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {professors.map((prof, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{prof.name}</td>
                  <td className="px-4 py-2">{prof.subject}</td>
                  <td className="px-4 py-2">{prof.semester}</td>
                  <td className="px-4 py-2">{prof.email}</td>
                  <td className="px-4 py-2">{prof.password}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button className="text-blue-600 hover:underline">Update</button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {professors.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center px-4 py-4 text-gray-500">
                    No professor records available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ProfessorsPage;
