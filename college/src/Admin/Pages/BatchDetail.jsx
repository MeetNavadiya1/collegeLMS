import React, { useEffect, useState, useContext } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../../Context/AppContext";

const BatchDetails = () => {
  const { batchId } = useParams();
  const { backendURL, admin } = useContext(AppContext);
  const [batchDetails, setBatchDetails] = useState(null);
  const [newEnrollment, setNewEnrollment] = useState('');
  const [semester, setSemester] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // ✅ default tab

  useEffect(() => {
    if (!admin){
      navigate('/login');
    }
    const fetchBatchDetails = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/admin/batch/${batchId}`);
        setBatchDetails(res.data);
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to load batch details");
      }
    };
    fetchBatchDetails();
  }, [batchId, backendURL]);

  const handleAddEnrollment = async (e) => {
    e.preventDefault();
    if (!newEnrollment.trim()) return toast.error("Enter enrollment number");

    try {
      const res = await axios.post(
        `${backendURL}/api/admin/batch/${batchId}/enrollment`,
        { enrollment: newEnrollment }
      );

      toast.success(res.data.message || "Enrollment added successfully");

      // Refresh batch details
      const updated = await axios.get(`${backendURL}/api/admin/batch/${batchId}`);
      setBatchDetails(updated.data);

      setNewEnrollment(""); // clear input
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add enrollment");
    }
  };

  // ✅ Prepare student data for current active tab
  const studentData = batchDetails
    ? activeTab === "all"
      ? batchDetails.allStudents
      : activeTab === "created"
        ? batchDetails.createdAccounts
        : activeTab === "notCreated"
          ? batchDetails.notCreated
          : batchDetails.deletedAccounts
    : [];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
        {/* Back Button + Page Title */}
        <div className="flex items-center mb-6">
          <Link
            to="/admin/batches"
            className="text-sm px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md shadow"
          >
            ← Back
          </Link>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Batch Details of "{batchDetails?.batchName}"
        </h2>

        {/* Add Enrollment + Change Semester */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Add Enrollment */}
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                Add Enrollment Number
              </h4>
              <form
                onSubmit={handleAddEnrollment}
                className="flex flex-col sm:flex-row gap-4"
              >
                <input
                  type="text"
                  value={newEnrollment}
                  onChange={(e) => setNewEnrollment(e.target.value)}
                  placeholder="Enter enrollment number"
                  className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              </form>
            </div>

            {/* Change Semester */}
            <div className="flex-1 lg:border-l lg:border-gray-300 lg:pl-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                Change Semester
              </h4>
              <div className="mb-1">
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-800">Current Semester:</span>{" "}
                  Semester {batchDetails?.semester || "-"}
                </p>
              </div>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!semester) return toast.error("Please select a semester");

                  const confirmed = window.confirm(
                    `Are you sure you want to update the semester to Semester ${semester}?`
                  );
                  if (!confirmed) return;

                  try {
                    const res = await axios.put(
                      `${backendURL}/api/admin/batch/${batchId}/semester`,
                      { semester }
                    );
                    toast.success(res.data.message || "Semester updated successfully");

                    // Refresh batch details
                    const updated = await axios.get(`${backendURL}/api/admin/batch/${batchId}`);
                    setBatchDetails(updated.data);

                    setSemester("");
                  } catch (error) {
                    console.error(error);
                    toast.error(error.response?.data?.message || "Failed to update semester");
                  }
                }}
                className="flex flex-col sm:flex-row gap-4 items-start sm:items-end"
              >
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full sm:w-64 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Semester</option>
                  <option value="1">Semester 1</option>
                  <option value="2">Semester 2</option>
                  <option value="3">Semester 3</option>
                  <option value="4">Semester 4</option>
                </select>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Student Details Card */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Student Details</h3>

          {/* Tabs */}
          <div className="flex flex-wrap gap-4 mb-4 text-sm font-medium">
            {["all", "created", "notCreated", "deleted"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1 rounded ${activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
              >
                {tab === "all"
                  ? "All Students"
                  : tab === "created"
                    ? "Created Accounts"
                    : tab === "notCreated"
                      ? "Not Created"
                      : "Deleted Accounts"}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">S.No</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Enrollment No</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Password</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {studentData && studentData.length > 0 ? (
                  studentData.map((student, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-2">{idx + 1}</td>
                      <td className="px-4 py-2">{student.name || "-"}</td>
                      <td className="px-4 py-2">{student.enrollment || "-"}</td>
                      <td className="px-4 py-2">{student.email || "-"}</td>
                      <td className="px-4 py-2">{student.password || "-"}</td>
                      <td className="px-4 py-2">
                        <button
                          className="text-red-600 hover:underline"
                          onClick={async () => {
                            const confirmed = window.confirm(`Are you sure you want to remove ${student.enrollment}?`);
                            if (confirmed) {
                              try {
                                await axios.put(`${backendURL}/api/admin/batch/${batchId}/delete-enrollment`, {
                                  enrollment: student.enrollment,
                                });
                                toast.success(`Enrollment ${student.enrollment} removed successfully`);
                                setBatchDetails((prev) => ({
                                  ...prev,
                                  allStudents: prev.allStudents.filter(
                                    (s) => s.enrollment !== student.enrollment
                                  ),
                                }));
                              } catch (error) {
                                toast.error(error.response?.data?.message || "Failed to remove enrollment");
                              }
                            }
                          }}
                        >
                          Delete
                        </button>

                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center px-4 py-4 text-gray-500"
                    >
                      No data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Delete Batch Button */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={async () => {
              const confirmed = window.confirm(
                "Are you sure you want to delete this batch? This will also delete all related students!"
              );
              if (confirmed) {
                try {
                  await axios.delete(`${backendURL}/api/admin/batch/${batchId}`);
                  toast.success("Batch and all students deleted successfully");
                  window.location.href = "/admin/batches";
                } catch (error) {
                  toast.error(error.response?.data?.message || "Failed to delete batch");
                }
              }
            }}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors duration-200"
          >
            Delete Batch
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BatchDetails;
