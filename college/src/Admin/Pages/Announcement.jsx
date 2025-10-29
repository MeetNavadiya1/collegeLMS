import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

const AnnouncementPage = () => {
  const { backendURL, admin } = useContext(AppContext);
  const [announcements, setAnnouncements] = useState([]);
  const [batches, setBatches] = useState([]); // 🟢 Store batch names
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageFile: null,
    batch: "",
  });

  // 🟡 Fetch Announcements + Batches from API
  useEffect(() => {
    if (!admin){
      navigate('/login');
    }
    const fetchAnnouncements = async () => {
      try {
        const { data } = await axios.get(`${backendURL}/api/admin/announcement/all`);

        // Expecting { success, announcements, batches }
        if (data.success) {
          setAnnouncements(data.announcements);
          setBatches(data.batches || []);
        } else {
          toast.error("Unexpected API response format");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch announcements");
      }
    };
    fetchAnnouncements();
  }, [backendURL]);

  // 🟢 Handle Input Change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, imageFile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // 🟢 Create Announcement
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("batch", formData.batch);
    formDataToSend.append("createdBy", "Admin"); // or "Professor"
    if (formData.imageFile) formDataToSend.append("image", formData.imageFile);

    try {
      const { data } = await axios.post(
        `${backendURL}/api/admin/announcement/create`,
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Announcement created successfully!");
      setAnnouncements([data.announcement, ...announcements]);
      setFormData({ title: "", description: "", imageFile: null, batch: "" });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to create announcement");
    }
  };

  // 🔴 Delete Announcement
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this announcement?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${backendURL}/api/admin/announcement/${id}`);
      toast.success("Announcement deleted successfully!");
      setAnnouncements((prev) => prev.filter((a) => a._id !== id));
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete announcement");
    }
  };

  const getFirstTwoLines = (text) => text.split("\n").slice(0, 2).join(" ");

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-center">Announcements</h1>

        {/* Create Announcement Card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Create Announcement</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="border border-gray-300 rounded px-4 py-2"
              required
            />

            <textarea
              name="description"
              placeholder="Description (multiline)"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="md:col-span-2 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {/* 🟢 Dynamic Batch Dropdown */}
            <select
              name="batch"
              value={formData.batch}
              onChange={handleChange}
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Batch</option>
              {batches.map((batch, idx) => (
                <option key={idx} value={batch}>
                  {batch}
                </option>
              ))}
            </select>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full md:w-auto"
              >
                Create Announcement
              </button>
            </div>
          </form>
        </div>

        {/* Announcements Table */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Announcement List</h2>
          <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
            <table className="min-w-full text-sm border border-gray-200 rounded overflow-hidden">
              <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-2 text-left">S.No</th>
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Image</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Batch</th>
                  <th className="px-4 py-2 text-left">Created By</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {announcements.map((item, index) => (
                  <tr key={item._id || index} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{item.title}</td>
                    <td className="px-4 py-2">
                      {item.image && (
                        <img
                          src={`${backendURL}${item.image}`}
                          alt="Announcement"
                          className="h-10 w-10 object-cover rounded"
                        />
                      )}
                    </td>
                    <td className="px-4 py-2">{getFirstTwoLines(item.description)}</td>
                    <td className="px-4 py-2">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">{item.batch}</td>
                    <td className="px-4 py-2">{item.createdBy}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {announcements.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center px-4 py-4 text-gray-500">
                      No announcements available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AnnouncementPage;
