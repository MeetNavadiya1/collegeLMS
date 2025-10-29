import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProfessorNavbar from '../components/Navbar';
import ProfessorFooter from '../components/Footer';

const MaterialDetails = () => {
  const navigate = useNavigate();

  // Static data for example (you can pass this via props or API later)
  const material = {
    title: "Operating Systems - Unit 1",
    createdAt: "2025-06-10",
    fileUrl: "/files/os-unit1.pdf", // relative path to file
    fileName: "os-unit1.pdf",
    questions: [
      "Explain different types of operating systems with examples.",
      "What is the purpose of process scheduling?",
      "Describe the difference between multiprogramming and multitasking.",
      "What are the key responsibilities of an OS kernel?",
      "Write short notes on time-sharing systems."
    ]
  };

  return (
    <>
      <ProfessorNavbar />
      <div className="min-h-screen bg-gray-50 py-6 px-4">
        {/* Back Button */}
        
        <Link
          to='/professor/materials'
          className="text-sm px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md shadow"
        >
          ← Back
        </Link>

        {/* Main Card */}
        <div className="max-w-3xl mx-auto bg-white border rounded-lg shadow-md p-6 mt-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{material.title}</h1>

          <div className="text-sm text-gray-600 mb-4">
            <p><strong>Material Name:</strong> {material.fileName}</p>
            <p><strong>Created At:</strong> {material.createdAt}</p>
          </div>

          {/* Download Button */}
          <a
            href={material.fileUrl}
            download
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm px-4 py-2 rounded shadow hover:opacity-90 transition mb-6"
          >
            Download Material
          </a>

          {/* Generated Questions */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">AI Generated Questions</h2>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              {material.questions.map((q, index) => (
                <li key={index}>{q}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <ProfessorFooter />
    </>
  );
};

export default MaterialDetails;
