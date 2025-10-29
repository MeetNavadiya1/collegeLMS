import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfessorNavbar from '../components/Navbar';
import ProfessorFooter from '../components/Footer';

const staticMaterials = [
    {
        title: 'Operating Systems Notes',
        date: '2024-06-01',
        fileName: 'os_notes.pdf',
    },
    {
        title: 'DBMS Concepts',
        date: '2024-06-03',
        fileName: 'dbms.pdf',
    },
    {
        title: 'Computer Networks',
        date: '2024-06-05',
        fileName: 'networks.pdf',
    },
    {
        title: 'Data Structures',
        date: '2024-06-06',
        fileName: 'ds.pdf',
    },
    {
        title: 'AI Introduction',
        date: '2024-06-07',
        fileName: 'ai.pdf',
    },
];

const TeacherReadingMaterial = () => {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [notes, setNotes] = useState('');
    const [generatedContent, setGeneratedContent] = useState('');

    const handleGenerateQuestions = () => {
        if (notes.trim()) {
            setGeneratedContent(`✅ Sample questions:\n1. What is ${notes.split(' ')[0]}?\n2. Why is it important?`);
        } else {
            setGeneratedContent(`⚠️ Please enter some notes or upload a file to generate questions.`);
        }
    };

    return (
        <>
            <ProfessorNavbar />
            <div className="min-h-screen bg-gray-50 py-6 px-4">
                {/* Back Button */}
                
                <Link
                    to='/professor'
                    className="text-sm px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md shadow"
                >
                    ← Back
                </Link>

                <div className="max-w-6xl mx-auto space-y-10 mt-5">

                    {/* Add Reading Material Form */}
                    <div className="bg-white shadow-md rounded-lg p-6 border">
                        <h2 className="text-xl font-semibold mb-6 text-gray-800">Add Reading Material</h2>

                        <form className="space-y-4">
                            {/* Title + File input in one line on desktop */}
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="w-full">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full border rounded-md px-3 py-2 text-sm"
                                        placeholder="Enter material title"
                                    />
                                </div>

                                <div className="w-full">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload File</label>
                                    <input
                                        type="file"
                                        onChange={(e) => setFile(e.target.files[0])}
                                        className="w-full border rounded-md px-3 py-2 text-sm"
                                    />
                                </div>
                            </div>

                            {/* Notes */}
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Material Notes</label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    rows={5}
                                    className="w-full border rounded-md px-3 py-2 text-sm pr-32"
                                    placeholder="Paste or write content..."
                                />
                                <button
                                    type="button"
                                    onClick={handleGenerateQuestions}
                                    className="absolute bottom-2 right-2 px-3 py-1 text-xs font-semibold text-white rounded bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:opacity-90"
                                >
                                    Generate Questions With AI
                                </button>
                            </div>

                            {generatedContent && (
                                <div className="text-sm bg-gray-100 rounded-md p-3 border whitespace-pre-wrap">
                                    {generatedContent}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                            >
                                Submit
                            </button>
                        </form>
                    </div>

                    {/* Review Materials - Static Data */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Review Materials</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {staticMaterials.map((mat, idx) => (
                                <div key={idx} className="bg-white border rounded-lg shadow-sm p-4 space-y-2">
                                    <h3 className="text-base font-semibold text-gray-800">{mat.title}</h3>
                                    <p className="text-xs text-gray-500">Created at: {mat.date}</p>
                                    <Link to='/professor/materials/details/:id'
                                        className="text-blue-600 hover:underline text-sm font-medium"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
            <ProfessorFooter />
        </>
    );
};

export default TeacherReadingMaterial;
