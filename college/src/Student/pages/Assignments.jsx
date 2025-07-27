import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StudentNavbar from '../components/Navbar';
import StudentFooter from '../components/Footer';

const Assignments = () => {
  const navigate = useNavigate();

  const assignments = [
    {
      title: 'Stack and Queue Assignment',
      postedDate: '2025-06-01',
      dueDate: '2025-06-10',
      link: '/student/subjectdetails/assignments/viewassignmentdetails/:id',
    },
    {
      title: 'Linked List Implementation',
      postedDate: '2025-06-03',
      dueDate: '2025-06-12',
      link: '/student/subjectdetails/assignments/viewassignmentdetails/:id',
    },
    {
      title: 'Binary Tree Practice',
      postedDate: '2025-06-05',
      dueDate: '2025-06-14',
      link: '/student/subjectdetails/assignments/viewassignmentdetails/:id',
    },
    {
      title: 'Sorting Algorithms',
      postedDate: '2025-06-07',
      dueDate: '2025-06-15',
      link: '/student/subjectdetails/assignments/viewassignmentdetails/:id',
    },
    {
      title: 'Graph Traversal',
      postedDate: '2025-06-09',
      dueDate: '2025-06-16',
      link: '/student/subjectdetails/assignments/viewassignmentdetails/:id',
    },
  ];

  return (
    <>
    <StudentNavbar/>
    
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <Link
          to='/student/subjectdetails'
          className="mb-6 text-sm px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md shadow"
        >
          ← Back
        </Link>

        {/* Title */}
        <h1 className="text-xl font-bold mb-8 text-gray-800 text-center">
          Assignments
        </h1>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {assignments.map((assignment, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md border p-4 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-md font-semibold text-gray-800 mb-2">
                  {assignment.title}
                </h2>
                <p className="text-xs text-gray-600">
                  Posted: {assignment.postedDate}
                </p>
                <p className="text-xs text-gray-600">
                  Due: {assignment.dueDate}
                </p>
              </div>

              <div className="mt-4">
                <Link
                  to={assignment.link}
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

export default Assignments;
