import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useContext } from 'react';
import { AppContext } from '../../Context/AppContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBatches: 0,
    totalProfessors: 0,
    totalStudents: 0,
    totalAnnouncements: 0,
  });
  const { backendURL, admin } = useContext(AppContext);
  const navigate = useNavigate();
  const fetchStats = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/admin/dashboard`);
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };

  useEffect(() => {
    if (!admin){
      navigate('/login');
    }
    fetchStats();
  }, []);

  const cardData = [
    { title: 'Student Batches', value: stats.totalBatches },
    { title: 'Teachers', value: stats.totalProfessors },
    { title: 'Active Students', value: stats.totalStudents },
    { title: 'Announcements', value: stats.totalAnnouncements },
  ];

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-center">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardData.map((stat, index) => (
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
      <Footer />
    </>
  );
};

export default Dashboard;
