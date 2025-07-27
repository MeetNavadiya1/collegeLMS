import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfessorNavbar from '../components/Navbar';
import ProfessorFooter from '../components/Footer';

const AssignmentPage = () => {

  const [assignments, setAssignments] = useState([
    {
      title: 'DBMS Assignment 1',
      createdAt: '2025-06-05',
      dueDate: '2025-06-15',
      description: 'Write ER diagrams and normalize them.',
    },
    {
      title: 'OOP Concepts',
      createdAt: '2025-06-06',
      dueDate: '2025-06-16',
      description: 'Implement classes and inheritance in Java.',
    },
    {
      title: 'Computer Networks',
      createdAt: '2025-06-07',
      dueDate: '2025-06-17',
      description: 'Explain OSI model and create socket programs.',
    },
    {
      title: 'Data Structures',
      createdAt: '2025-06-08',
      dueDate: '2025-06-18',
      description: 'Analyze complexity of sorting algorithms.',
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

    const newAssignment = {
      title: form.title,
      dueDate: form.dueDate,
      createdAt: new Date().toISOString().split('T')[0],
      description: form.description,
    };

    setAssignments((prev) => [...prev, newAssignment]);
    setForm({ title: '', dueDate: '', description: '', file: null });
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this assignment?');
    if (!confirmDelete) return;

    const updated = [...assignments];
    updated.splice(index, 1);
    setAssignments(updated);
  };

  const handleUpdate = (index) => {
    const assignment = assignments[index];
    setForm({
      title: assignment.title,
      dueDate: assignment.dueDate,
      description: assignment.description,
      file: null,
    });

    const updated = [...assignments];
    updated.splice(index, 1); // Temporarily remove the item to be re-added on update
    setAssignments(updated);
  };

  return (
    <>
    <ProfessorNavbar/>
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      {/* Back Button */}
      <Link
        to='/professor/'
        className="text-sm text-blue-600 hover:underline"
      >
        ← Back
      </Link>

      {/* Create Assignment Form */}
      <div className="mt-5 max-w-4xl mx-auto bg-white border rounded-lg shadow p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Create New Assignment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title & Due Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assignment Title
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
              placeholder="Enter assignment description"
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
            Create Assignment
          </button>
        </form>
      </div>

      {/* Assignment List */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Assignments</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {assignments.map((ass, idx) => (
            <div
              key={idx}
              className="bg-white border rounded-lg shadow-sm p-4 flex flex-col"
            >
              <h3 className="text-sm font-semibold text-gray-800 mb-1">{ass.title}</h3>
              <p className="text-xs text-gray-500">Created: {ass.createdAt}</p>
              <p className="text-xs text-gray-500 mb-2">Due: {ass.dueDate}</p>
              <p className="text-xs text-gray-700 mb-2">{ass.description}</p>

              {/* Action Buttons */}
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
                  to='/professor/assignments/submissions/:id'
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
    <ProfessorFooter/>
    </>
  );
};

export default AssignmentPage;
