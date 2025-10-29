import React from 'react';
import { Link } from 'react-router-dom';
import materialsImg from './images/material.png';
import assignmentsImg from './images/assignment.png';
import projectsImg from './images/project.png';
import announcementsImg from './images/announcement.png';
import ProfessorNavbar from '../components/Navbar';
import ProfessorFooter from '../components/Footer';

const cardData = [
  {
    label: 'Reading Material',
    count: 10,
    image: materialsImg,
    link: '/professor/materials',
  },
  {
    label: 'Assignments',
    count: 5,
    image: assignmentsImg,
    link: '/professor/assignments',
  },
  {
    label: 'Projects',
    count: 3,
    image: projectsImg,
    link: '/professor/projects',
  },
  {
    label: 'Announcements',
    count: 8,
    image: announcementsImg,
    link: '/professor/announcements',
  },
];

const ProfessorHome = () => {
  return (
    <>
    <ProfessorNavbar/>
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="mx-auto">
        <h1 className="text-xl font-bold mb-8 text-gray-800">Professor Panel</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {cardData.map((card, index) => (
            <Link
              to={card.link}
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border"
            >
              {/* Image fills top */}
              <img
                src={card.image}
                alt={card.label}
                className="w-45 object-cover"
              />

              {/* Content aligned to right side below image */}
              <div
                className="flex justify-end items-start flex-col pr-2 pl-4 py-3 text-right"
              >
                <h2 className="text-md font-semibold text-gray-800">{card.label}</h2>
                <p className="text-xs text-gray-600">Total: {card.count}</p>
              </div>

            </Link>
          ))}
        </div>
      </div>
    </div>
    <ProfessorFooter/>
    </>
  );
};

export default ProfessorHome;
