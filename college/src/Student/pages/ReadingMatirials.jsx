import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StudentNavbar from '../components/Navbar';
import StudentFooter from '../components/Footer';

// Sample data
const readingMaterials = [
  { title: 'Introduction to Data Structures', date: '2025-06-01', link: '/student/subjectdetails/readingmaterials/viewreadingmaterials/:id' },
  { title: 'Stack & Queue Notes', date: '2025-06-05', link: '/student/subjectdetails/readingmaterials/viewreadingmaterials/:id' },
  { title: 'Trees & Graphs Overview', date: '2025-06-07', link: '/student/subjectdetails/readingmaterials/viewreadingmaterials/:id' },
  { title: 'Linked Lists Explained', date: '2025-06-10', link: '/student/subjectdetails/readingmaterials/viewreadingmaterials/:id' },
  { title: 'Sorting Algorithms', date: '2025-06-12', link: '/student/subjectdetails/readingmaterials/viewreadingmaterials/:id' },
  { title: 'Hash Tables Guide', date: '2025-06-13', link: '/student/subjectdetails/readingmaterials/viewreadingmaterials/:id' },
];

const ReadingMaterials = () => {

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
          
          <h1 className="mt-8 text-xl font-bold mb-6 text-gray-800">Reading Materials</h1>

          {/* Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {readingMaterials.map((material, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md border p-4 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-md font-semibold text-gray-800 mb-2">{material.title}</h2>
                  <p className="text-xs text-gray-500">Posted on: {material.date}</p>
                </div>
                <div className="mt-4">
                  <Link
                    to={material.link}
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

export default ReadingMaterials;
