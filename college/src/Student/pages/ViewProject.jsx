import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DocumentTextIcon } from '@heroicons/react/24/solid';
import StudentNavbar from '../components/Navbar';
import StudentFooter from '../components/Footer';

const ViewProjectDetails = () => {
  const navigate = useNavigate();

  // Placeholder project data
  const projectTitle = 'Library Management System';
  const dueDate = '2025-06-20';
  const infoFile = {
    name: 'project-guidelines.pdf',
    url: '/files/project-guidelines.pdf',
  };
  const description =
    'Design and develop a Library Management System with features such as book catalog, user login, issue tracking, and search functionality. You must submit the full source code and documentation.';

  const [feedback, setFeedback] = useState('Well done. Try to improve the UI and modularize your backend.');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle project upload here
    alert('Project submitted successfully!');
  };

  return (
    <>
    <StudentNavbar/>
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          to='/student/subjectdetails/projects'
          className="text-sm px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md shadow"
        >
          ← Back
        </Link>

        {/* Two-column Layout */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Project Details */}
          <div className="bg-white rounded-xl shadow-md border p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{projectTitle}</h2>
            <p className="text-sm text-gray-600 mb-4">Due Date: {dueDate}</p>

            {/* Info File */}
            <div className="flex items-center mb-4 text-sm text-gray-800">
              <DocumentTextIcon className="h-5 w-5 text-blue-600 mr-2" />
              <span>{infoFile.name}</span>
            </div>

            <a
              href={infoFile.url}
              download={infoFile.name}
              className="inline-block mb-6 text-sm px-5 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
            >
              Download File
            </a>

            {/* Description */}
            <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
          </div>

          {/* Right Column - Submit Project */}
          <div className="bg-white rounded-xl shadow-md border p-6 h-fit">
            <h2 className="text-md font-semibold text-gray-800 mb-4">Submit Project</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="file"
                onChange={handleFileChange}
                required
                className="mb-4 block w-full text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <button
                type="submit"
                className="w-full text-sm px-5 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Professor Feedback</h2>
          {feedback ? (
            <div className="bg-white rounded-xl shadow-md border p-6 text-sm text-gray-700">
              {feedback}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md border p-6 text-sm text-gray-500 italic">
              No feedback yet.
            </div>
          )}
        </div>
      </div>
    </div>
    <StudentFooter/>
    </>
  );
};

export default ViewProjectDetails;
