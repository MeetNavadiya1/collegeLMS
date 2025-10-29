import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StudentNavbar from '../components/Navbar';
import StudentFooter from '../components/Footer';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../Context/AppContext';
import { toast } from 'react-toastify';

// Sample card data
const cardData = [
  { subject: 'Data Structures', professor: 'Prof. Sharma', semester: 'Sem 2', link: '/student/materials/ds' },
  { subject: 'Operating Systems', professor: 'Prof. Mehta', semester: 'Sem 2', link: '/student/materials/os' },
  { subject: 'Database Systems', professor: 'Prof. Verma', semester: 'Sem 2', link: '/student/materials/dbms' },
  { subject: 'Computer Networks', professor: 'Prof. Gupta', semester: 'Sem 2', link: '/student/materials/cn' },
  { subject: 'Software Engineering', professor: 'Prof. Nair', semester: 'Sem 2', link: '/student/materials/se' },
  { subject: 'AI & ML', professor: 'Prof. Iyer', semester: 'Sem 2', link: '/student/materials/ai' },
  { subject: 'Web Technologies', professor: 'Prof. Sinha', semester: 'Sem 2', link: '/student/materials/web' },
  { subject: 'Cloud Computing', professor: 'Prof. Desai', semester: 'Sem 2', link: '/student/materials/cloud' },
];

// Sequential gradients
const gradients = [
  'from-purple-400 via-pink-500 to-red-500',
  'from-green-400 via-blue-500 to-purple-500',
  'from-yellow-400 via-red-500 to-pink-500',
  'from-blue-400 via-indigo-500 to-purple-500',
  'from-cyan-400 via-sky-500 to-indigo-500',
  'from-pink-400 via-rose-500 to-red-500',
  'from-teal-400 via-cyan-500 to-blue-500',
  'from-orange-400 via-pink-500 to-red-500',
];

const StudentHome = () => {
  const batchName = 'Batch: MCA 2023';

  const {student} = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Directly from context
    if (!student) {
      // navigate("/login")
    }
  }, [student]);


  return (
    <>
    <StudentNavbar/>
      <div className="min-h-screen bg-gray-100 py-6 px-4">
        <div className="mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-xl font-bold text-gray-800">Student Panel</h1>
            <span className="text-md font-medium text-gray-700">{batchName}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cardData.map((card, index) => {
              const gradient = gradients[index % gradients.length]; // Sequential assignment with wrap-around
              return (
                <div
                  key={index}
                  className={`rounded-xl shadow-md backdrop-blur-md bg-gradient-to-br ${gradient} text-white p-5 flex flex-col justify-between`}
                >
                  <div>
                    <h2 className="text-lg font-bold">{card.subject}</h2>
                    <p className="text-sm">Professor: {card.professor}</p>
                    <p className="text-sm">Semester: {card.semester}</p>
                  </div>
                  <div className="mt-4">
                    <Link
                      to='/student/subjectdetails'
                      className="inline-block mt-2 text-sm px-3 py-1 bg-white text-gray-800 rounded-md shadow hover:bg-gray-100 transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <StudentFooter/>
      </>
  );
};

export default StudentHome;
