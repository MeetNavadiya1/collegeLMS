import React, { useEffect, useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AppContext } from '../../Context/AppContext';
import { useNavigate } from 'react-router-dom';

const StudentBatches = () => {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const {backendURL, admin} = useContext(AppContext);
  const navigate = useNavigate();

  const fetchBatches = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/admin/viewAllBatch`);
      setBatches(response.data.batches);
    } catch (error) {
      console.error("Error fetching batches:", error);
      toast.error(error.response?.data?.message || "Failed to fetch batches");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!admin){
      navigate('/login');
    }
    fetchBatches();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-center">Student Batches</h1>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left: Create New Batch Card */}
          <Link to="/admin/batches/create">
            <div className="w-full lg:w-60 flex-shrink-0">
              <div className="bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-lg flex flex-col items-center justify-center p-6 transition-colors duration-200">
                <div className="p-2 rounded-4xl bg-gray-400">
                  <PlusIcon className="h-10 w-10 text-gray-800" />
                </div>
                <span className="text-gray-500 font-semibold text-center">Create New Batch</span>
              </div>
            </div>
          </Link>

          {/* Right: Batches Grid */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <p className="text-center text-gray-600 col-span-full">Loading batches...</p>
            ) : batches.length === 0 ? (
              <p className="text-center text-gray-600 col-span-full">No batches found</p>
            ) : (
              batches.map((batch, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{batch.batchName}</h2>
                    <p className="text-xs text-gray-500">
                      Created at: {new Date(batch.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-6 text-sm text-gray-700">
                    <div className="flex flex-col justify-center space-y-1">
                      <p className="text-green-600">
                        <span className="font-bold">{batch.enrollmentNumbers.length}</span> Total Students
                      </p>
                      
                    </div>
                    <Link
                      to={`/admin/batches/${batch._id}`}
                      className="text-blue-600 hover:underline font-medium self-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StudentBatches;
