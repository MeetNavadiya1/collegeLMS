import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../Context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const CreateBatch = () => {
  const [batchName, setBatchName] = useState('');
  const [semester, setSemester] = useState('');
  const [enrollmentNumbers, setEnrollmentNumbers] = useState([]);
  const { backendURL, admin } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!admin){
      navigate('/login');
    }
  }, []);

  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

      const numbers = rows.flat().filter(cell => typeof cell === 'string' || typeof cell === 'number');
      setEnrollmentNumbers(numbers);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ batchName, semester, enrollmentNumbers });
    // TODO: Send to backend
    try {
      const response = await axios.post(`${backendURL}/api/admin/createBatch`, {
        batchName,
        semester,
        enrollmentNumbers
      });

      toast.success(response.data.message);
      setBatchName("");
      setSemester("");
      setEnrollmentNumbers([]);
      navigate('/admin/batches');
    } catch (error) {
      console.error("Create Batch Error:", error);
      toast.error(error.response?.data?.message || "Failed to create batch");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
        {/* Back Button */}
        <Link
          to='/admin/batches'
          className="text-sm px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md shadow"
        >
          ← Back
        </Link>

        {/* Card Container */}
        <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-xl shadow-sm p-6 sm:p-8 mt-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2 text-center">Create New Batch</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Batch Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Batch Name</label>
              <input
                type="text"
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={batchName}
                onChange={(e) => setBatchName(e.target.value)}
                required
              />
            </div>

            {/* Semester Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Semester</label>
              <select
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                required
              >
                <option value="">Select semester</option>
                <option value="1">1st Semester</option>
                <option value="2">2nd Semester</option>
                <option value="3">3rd Semester</option>
                <option value="4">4th Semester</option>
              </select>
            </div>

            {/* Excel Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Upload Enrollment Numbers (Excel)</label>
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleExcelUpload}
                className="mt-1 w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload an Excel file with enrollment numbers listed in a column.
              </p>
            </div>

            {/* Preview */}
            <div className="bg-gray-100 rounded-md p-3 text-sm text-gray-700">
              <strong>{enrollmentNumbers.length}</strong> enrollment numbers loaded
            </div>

            {/* Submit Button */}
            <div className="pt-4 text-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition-colors"
              >
                Create Batch
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateBatch;
