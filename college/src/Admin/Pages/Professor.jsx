import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

const ProfessorsPage = () => {
  const { backendURL, admin } = useContext(AppContext);
  const [professors, setProfessors] = useState([]);
  const [batchNames, setBatchNames] = useState([]);
  const [batchDetails, setBatchDetails] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    batch: "",
    semester: "",
    email: "",
    password: "",
    image: null,
  });

  const [editingId, setEditingId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // helper to normalize image url (backend may return full URL or path like /public/uploads/...)
  const getFullImageUrl = (img) => {
    if (!img) return "";
    if (/^https?:\/\//i.test(img)) return img;
    // ensure leading slash
    const p = img.startsWith("/") ? img : `/${img}`;
    return `${backendURL}${p}`;
  };

  // fetch function reused after create/update/delete so UI refreshes automatically
  const fetchProfessors = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/admin/professor/all`);
      setProfessors(res.data.professors || []);
      const details = res.data.batchDetails || [];
      setBatchDetails(details);
      setBatchNames(details.map((b) => b.batchName));
    } catch (error) {
      console.error(error);
      toast.error("Failed to load professors");
    }
  };

  // initial load
  useEffect(() => {
    if (!admin){
      navigate('/login');
    }
    fetchProfessors();
  }, [backendURL]);

  // Handle input changes
  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      if (file) {
        setPreviewImage(URL.createObjectURL(file));
      } else {
        setPreviewImage(null);
      }
    } else if (e.target.name === "batch") {
      const selectedBatch = e.target.value;
      // find semester for selected batch from batchDetails
      const batchInfo = batchDetails.find((b) => b.batchName === selectedBatch);
      const semesterForBatch = batchInfo ? batchInfo.semester : "";
      setFormData({ ...formData, batch: selectedBatch, semester: semesterForBatch });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Put form into "edit" mode with professor data
  const handleEdit = (prof) => {
    setEditingId(prof._id);
    // try to derive semester from batchDetails; fallback to prof.semester
    const batchInfo = batchDetails.find((b) => b.batchName === prof.batch);
    const semesterFromBatch = batchInfo ? batchInfo.semester : prof.semester || "";
    setFormData({
      name: prof.name || "",
      subject: prof.subject || "",
      batch: prof.batch || "",
      semester: semesterFromBatch,
      email: prof.email || "",
      // do not prefill password for security; allow admin to set a new one if needed
      password: "",
      image: null, // keep null so backend can retain existing image if no new file is provided
    });
    setPreviewImage(getFullImageUrl(prof.image) || null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearForm = () => {
    setEditingId(null);
    setFormData({
      name: "",
      subject: "",
      batch: "",
      semester: "",
      email: "",
      password: "",
      image: null,
    });
    setPreviewImage(null);
  };

  // Handle submit (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    // append only fields that have value (image is appended only if File)
    if (formData.name) data.append("name", formData.name);
    if (formData.subject) data.append("subject", formData.subject);
    if (formData.batch) data.append("batch", formData.batch);
    if (formData.semester) data.append("semester", formData.semester);
    if (formData.email) data.append("email", formData.email);
    if (formData.password) data.append("password", formData.password);
    if (formData.image instanceof File) data.append("image", formData.image);

    try {
      if (editingId) {
        // update
        await axios.put(`${backendURL}/api/admin/professor/${editingId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Professor updated successfully");
        clearForm();
        await fetchProfessors(); // refresh list automatically
      } else {
        // create
        await axios.post(`${backendURL}/api/admin/professor/add`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Professor created successfully");
        clearForm();
        await fetchProfessors(); // refresh list automatically
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to save professor");
    }
  };

  // Handle delete (call admin endpoint)
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this professor?")) {
      try {
        await axios.delete(`${backendURL}/api/admin/professor/${id}`);
        toast.success("Professor deleted");
        await fetchProfessors(); // refresh list automatically
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete professor");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Professors Management
        </h1>

        {/* Create / Update Professor Card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {editingId ? "Update Professor" : "Create Professor Credentials"}
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            encType="multipart/form-data"
          >
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="border rounded px-4 py-2" required />
            <input name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" className="border rounded px-4 py-2" required />

            {/* batch select - show semester in brackets with batch name */}
            <select
              name="batch"
              value={formData.batch}
              onChange={handleChange}
              className="border rounded px-4 py-2"
              required
            >
              <option value="">Select Batch</option>
              {batchDetails.length === 0 ? (
                <option value="" disabled>No batches available</option>
              ) : (
                batchDetails.map((b) => (
                  <option key={b.batchName} value={b.batchName}>
                    {`${b.batchName}${b.semester ? ` (Sem ${b.semester})` : ""}`}
                  </option>
                ))
              )}
            </select>

            {/* removed semester dropdown (semester is set automatically based on selected batch) */}
            <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" type="email" className="border rounded px-4 py-2" required />
            <input name="password" value={formData.password} onChange={handleChange} placeholder={editingId ? "Leave blank to keep current password" : "Password"} type="text" className="border rounded px-4 py-2" />
            {/* Image input & preview */}
            <div className="md:col-span-2 flex items-center gap-4">
              <input name="image" type="file" accept="image/*" onChange={handleChange} className="border rounded px-4 py-2" />
              {previewImage ? (
                <img src={previewImage} alt="preview" className="w-16 h-16 rounded-full object-cover" />
              ) : null}
            </div>

            <div className="md:col-span-2 flex gap-3">
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full md:w-auto">
                {editingId ? "Update Professor" : "Create Professor"}
              </button>
              {editingId && (
                <button type="button" onClick={clearForm} className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Professors Table */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Professors List
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full w-full table-auto divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Image</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Subject</th>
                  <th className="px-4 py-3 text-left">Batch (Semester)</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {professors.map((p, i) => (
                  <tr key={p._id || i} className="hover:bg-gray-50">
                    <td className="px-4 py-3 align-middle">{i + 1}</td>
                    <td className="px-4 py-3 align-middle">
                      {p.image ? (
                        <img
                          src={getFullImageUrl(p.image)}
                          alt={p.name}
                          className="w-10 h-10 rounded-full object-cover"
                          onError={(e) => { e.currentTarget.src = ""; }}
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xs text-gray-400">N/A</div>
                      )}
                    </td>
                    <td className="px-4 py-3 align-middle">{p.name}</td>
                    <td className="px-4 py-3 align-middle">{p.subject}</td>
                    <td className="px-4 py-3 align-middle">{p.batch}{p.semester ? ` (Sem ${p.semester})` : ""}</td>
                    <td className="px-4 py-3 align-middle">{p.email}</td>
                    <td className="px-4 py-3 align-middle flex gap-3 mt-2">
                      <button onClick={() => handleEdit(p)} className="text-blue-600 hover:underline">Edit</button>
                      <button onClick={() => handleDelete(p._id)} className="text-red-600 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfessorsPage;
