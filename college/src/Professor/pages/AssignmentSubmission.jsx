import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfessorNavbar from '../components/Navbar';
import ProfessorFooter from '../components/Footer';

const mockSubmissions = [
  {
    id: 1,
    name: 'Amit Patel',
    enrollment: '2023MCA001',
    submittedAt: '2025-06-10',
    fileUrl: '/files/submission1.pdf',
    feedback: 'Well structured solution.',
  },
  {
    id: 2,
    name: 'Riya Sharma',
    enrollment: '2023MCA002',
    submittedAt: '2025-06-11',
    fileUrl: '/files/submission2.pdf',
    feedback: 'Needs better explanation in Q3.',
  },
];

const AssignmentSubmissions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState({});
  const [feedbacks, setFeedbacks] = useState(
    mockSubmissions.reduce((acc, sub) => ({ ...acc, [sub.id]: sub.feedback }), {})
  );

  const filteredSubmissions = mockSubmissions.filter(
    (sub) =>
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.enrollment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateClick = (id) => {
    setEditMode((prev) => ({ ...prev, [id]: true }));
  };

  const handleSubmitClick = (id) => {
    setEditMode((prev) => ({ ...prev, [id]: false }));
    console.log(`Submitted feedback for ID ${id}:`, feedbacks[id]);
  };

  const handleAIButton = (id) => {
    setFeedbacks((prev) => ({
      ...prev,
      [id]: prev[id] + ' [AI Generated Suggestions]',
    }));
  };

  return (
    <>
    <ProfessorNavbar/>
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Back Button */}
      <Link to='/professor/assignments' className="text-blue-600 hover:underline">&larr; Back</Link>

      {/* Search Input */}
      <div className="mb-4 mt-5">
        <input
          type="text"
          placeholder="Search by name or enrollment number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full max-w-md"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white border rounded-lg p-4">
        <table className="min-w-[1100px] w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-2 w-32">Name</th>
              <th className="px-2 py-2 w-25">Enrollment</th>
              <th className="px-2 py-2 w-25">Submitted At</th>
              <th className="px-2 py-2 w-40">Submited Assignment</th>
              <th className="px-2 py-2 w-[350px]">Feedback</th>
              <th className="px-2 py-2 w-36 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubmissions.map((sub) => {
              const isEditing = editMode[sub.id];
              return (
                <tr key={sub.id} className="border-t align-top">
                  <td className="px-2 py-2">{sub.name}</td>
                  <td className="px-2 py-2">{sub.enrollment}</td>
                  <td className="px-2 py-2">{sub.submittedAt}</td>
                  <td className="px-2 py-2">
                    <button
                      className={`text-xs px-3 py-2 rounded ${
                        isEditing
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                      }`}
                      disabled={!isEditing}
                      onClick={() => {
                        if (isEditing) window.open(sub.fileUrl, '_blank');
                      }}
                    >
                      Download File
                    </button>
                  </td>
                  <td className="px-2 py-2">
                    <div className="relative">
                      <textarea
                        className={`w-full min-h-[120px] border rounded p-2 pr-24 resize-none ${
                          isEditing
                            ? 'bg-white text-gray-800'
                            : 'bg-gray-100 text-gray-500 cursor-not-allowed'
                        }`}
                        value={feedbacks[sub.id]}
                        onChange={(e) =>
                          setFeedbacks((prev) => ({
                            ...prev,
                            [sub.id]: e.target.value,
                          }))
                        }
                        disabled={!isEditing}
                      />
                      <button
                        className={`absolute bottom-2 right-2 text-xs px-3 py-1 rounded text-white ${
                          isEditing
                            ? 'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500'
                            : 'bg-gray-300 cursor-not-allowed'
                        }`}
                        disabled={!isEditing}
                        onClick={() => handleAIButton(sub.id)}
                      >
                        Generate AI Feedback
                      </button>
                    </div>
                  </td>
                  <td className="px-2 py-2 text-center space-y-2">
                    {!isEditing ? (
                      <button
                        onClick={() => handleUpdateClick(sub.id)}
                        className="bg-yellow-400 text-white px-3 py-1 rounded"
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSubmitClick(sub.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Submit
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
    <ProfessorFooter/>
    </>
  );
};

export default AssignmentSubmissions;
