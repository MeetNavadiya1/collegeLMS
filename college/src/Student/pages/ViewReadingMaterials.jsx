import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DocumentTextIcon } from '@heroicons/react/24/solid';
import StudentFooter from '../components/Footer';
import StudentNavbar from '../components/Navbar';

const ViewReadingMaterial = () => {
    const navigate = useNavigate();

    // Placeholder data
    const materialTitle = 'Introduction to Data Structures';
    const materialFileUrl = '/files/data-structures.pdf';
    const downloadFileName = 'data-structures.pdf';
    const importantQuestions = [
        'Define Data Structure and its types.',
        'Explain Stack operations with examples.',
        'Differentiate between linear and non-linear data structures.',
        'What is recursion? Give a use case.',
        'Explain different types of linked lists.',
    ];

    return (
        <>
        <StudentNavbar/>
            <div className="min-h-screen bg-gray-50 py-6 px-4">
                <div className="mx-auto">
                    {/* Back button */}
                    <Link
                        to='/student/subjectdetails/readingmaterials'
                        className="text-sm px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md shadow"
                    >
                        ← Back
                    </Link>

                    <div className="max-w-3xl mx-auto mt-6">
                        {/* Centered Title */}
                        <h1 className="text-2xl font-bold text-center text-gray-800 mb-10">
                            {materialTitle}
                        </h1>

                        {/* File Info + Download */}
                        <div className="text-center mb-5">
                            <div className="inline-flex items-center justify-center text-gray-800 text-sm font-medium mb-4">
                                <DocumentTextIcon className="h-5 w-5 mr-2 text-blue-600" />
                                <span>{downloadFileName}</span>
                            </div>
                            <br/>
                            <Link
                                href={materialFileUrl}
                                download={downloadFileName}
                                className="inline-block text-sm px-5 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
                            >
                                Download PDF
                            </Link>
                        </div>

                        {/* Important Questions Section */}
                        <div className="bg-white rounded-xl shadow-md border p-6 mb-8">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Important Questions</h2>
                            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                                {importantQuestions.map((q, index) => (
                                    <li key={index}>{q}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <StudentFooter/>
        </>
    );
};

export default ViewReadingMaterial;
