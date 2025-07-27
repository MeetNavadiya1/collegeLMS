import React from 'react';
import { Link } from 'react-router-dom';

import materialsImg from '../../Professor/pages/images/material.png';
import assignmentsImg from '../../Professor/pages/images/assignment.png';
import projectsImg from '../../Professor/pages/images/project.png';
import StudentNavbar from '../components/Navbar';
import StudentFooter from '../components/Footer';

const cardData = [
  {
    label: 'Reading Material',
    count: 12,
    image: materialsImg,
    link: '/student/subjectdetails/readingmaterials',
  },
  {
    label: 'Assignments',
    count: 4,
    image: assignmentsImg,
    link: '/student/subjectdetails/assignments',
  },
  {
    label: 'Projects',
    count: 2,
    image: projectsImg,
    link: '/student/subjectdetails/projects',
  },
];

const SubjectDetails = () => {
  return (
    <>
    <StudentNavbar/>
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <Link
          to='/student'
          className="text-sm px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md shadow"
        >
          ← Back
        </Link>
        <h1 className="mt-6 text-xl font-bold mb-8 text-gray-800">Subject Details</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border"
            >
              {/* Image fills top */}
              <img
                src={card.image}
                alt={card.label}
                className="w-45 object-cover"
              />

              {/* Content aligned below image */}
              <div className="flex justify-end flex-col pr-2 pl-2 py-3">
                <h2 className="text-md font-semibold text-gray-800 text-left">{card.label}</h2>
                <Link to={card.link} className='text-sm text-blue-500 mt-2 text-right hover:underline'>View {card.label}</Link>
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

export default SubjectDetails;
