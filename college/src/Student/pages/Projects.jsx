import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StudentNavbar from '../components/Navbar';
import StudentFooter from '../components/Footer';

const Projects = () => {
  const navigate = useNavigate();

  const projects = [
    {
      title: 'Library Management System',
      postedDate: '2025-06-01',
      dueDate: '2025-06-25',
      link: '/student/subjectdetails/projects/projectdetails/:id',
    },
    {
      title: 'Online Food Ordering System',
      postedDate: '2025-06-03',
      dueDate: '2025-06-26',
      link: '/student/subjectdetails/projects/projectdetails/:id',
    },
    {
      title: 'Student Attendance Tracker',
      postedDate: '2025-06-05',
      dueDate: '2025-06-27',
      link: '/student/subjectdetails/projects/projectdetails/:id',
    },
    {
      title: 'Chat Application',
      postedDate: '2025-06-07',
      dueDate: '2025-06-28',
      link: '/student/subjectdetails/projects/projectdetails/:id',
    },
    {
      title: 'Online Voting System',
      postedDate: '2025-06-09',
      dueDate: '2025-06-29',
      link: '/student/subjectdetails/projects/projectdetails/:id',
    },
  ];

  return (
    <>
    <StudentNavbar/>
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="mx-auto">
        {/* Back button */}
        <Link
          to='/student/subjectdetails'
          className="text-sm px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md shadow"
        >
          ← Back
        </Link>

        {/* Title */}
        <h1 className="text-xl font-bold mb-6 mt-8 text-gray-800">
          Projects
        </h1>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md border p-4 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-md font-semibold text-gray-800 mb-2">
                  {project.title}
                </h2>
                <p className="text-xs text-gray-600">
                  Posted: {project.postedDate}
                </p>
                <p className="text-xs text-gray-600">
                  Due: {project.dueDate}
                </p>
              </div>

              <div className="mt-4">
                <Link
                  to={project.link}
                  className="inline-block text-sm px-3 py-1 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <StudentFooter/>
    </>
  );
};

export default Projects;
