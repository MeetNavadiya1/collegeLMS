import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StudentNavbar from '../components/Navbar';
import StudentFooter from '../components/Footer';

const Announcements = () => {
    const navigate = useNavigate();

    const announcements = [
        {
            title: 'Mid-Term Exam Schedule',
            date: '2025-06-10',
            professor: 'Prof. Sharma',
            description:
                'The mid-term exams will begin from June 20. Please check the detailed schedule on the notice board.',
        },
        {
            title: 'Extra Class Notice',
            date: '2025-06-08',
            professor: 'Prof. Iyer',
            description:
                'An extra class on Data Structures is scheduled for June 12 at 10 AM in Room 204.',
        },
        {
            title: 'Project Submission Deadline Extended',
            date: '2025-06-05',
            professor: 'Prof. Nair',
            description:
                'The deadline for project submission has been extended to June 29. Submit before midnight.',
        },
        {
            title: 'Seminar on AI',
            date: '2025-06-04',
            professor: 'Prof. Mehta',
            description:
                'A seminar on Artificial Intelligence will be conducted on June 15. Attendance is compulsory.',
        },
        
    ];

    return (
        <>
        <StudentNavbar/>
        <div className="min-h-screen bg-gray-50 py-6 px-4">
            <div className="mx-auto">
                {/* Back Button */}
                <Link
                    to='/student'
                    className="text-sm px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md shadow"
                >
                    ← Back
                </Link>

                <div className="max-w-5xl mx-auto mt-6">

                    {/* Title */}
                    <h1 className="text-xl font-bold mb-6 text-center text-gray-800">
                        Announcements
                    </h1>

                    {/* Scrollable Area */}
                    <div className="max-h-[70vh] overflow-y-auto space-y-4 px-1">
                        {announcements.map((announcement, index) => (
                            <div
                                key={index}
                                className="bg-white border rounded-xl shadow-md p-5"
                            >
                                <h2 className="text-md font-semibold text-gray-800 mb-1">
                                    {announcement.title}
                                </h2>
                                <div className="text-xs text-gray-500 mb-2">
                                    Posted on: {announcement.date} | By: {announcement.professor}
                                </div>
                                <p className="text-sm text-gray-700">{announcement.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <StudentFooter/>
        </>
    );
};

export default Announcements;
