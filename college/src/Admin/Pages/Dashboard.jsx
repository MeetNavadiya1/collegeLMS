import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
  const stats = [
    { title: 'Student Batches', value: 12 },
    { title: 'Teachers', value: 18 },
    { title: 'Active Students', value: 240 },
    { title: 'Announcements', value: 8 },
  ];

  return (
    <>
    <Navbar/>
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <h2 className="text-gray-600 text-sm font-medium">{stat.title}</h2>
            <p className="text-3xl font-semibold mt-2 text-blue-600">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Dashboard;
