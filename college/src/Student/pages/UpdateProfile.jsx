import React, { useState } from 'react';
import StudentNavbar from '../components/Navbar';
import StudentFooter from '../components/Footer';

const UpdateProfile = () => {
    const [profile, setProfile] = useState({
        name: 'Meet Navadiya',
        email: 'meet@example.com',
        enrollment: 'MCA2025001',
        batch: 'MCA 2023-25',
        semester: 'Sem 2',
    });

    const [mode, setMode] = useState(''); // '', 'edit-profile', 'change-password'

    const [editForm, setEditForm] = useState({
        name: profile.name,
        email: profile.email,
    });

    const [passwordForm, setPasswordForm] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        setProfile({ ...profile, ...editForm });
        setMode('');
        alert('Profile updated successfully!');
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
            alert("New passwords don't match!");
            return;
        }
        setPasswordForm({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
        setMode('');
        alert('Password changed successfully!');
    };

    return (
        <>
        <StudentNavbar/>
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md border">
                <h1 className="text-xl font-bold text-center text-gray-800 mb-6">
                    Update Profile
                </h1>


                {/* Edit Profile Form */}
                {mode === 'edit-profile' ? (
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                        <div>
                            <label className="text-sm text-gray-600">Name</label>
                            <input
                                type="text"
                                value={editForm.name}
                                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                required
                                className="w-full border rounded-md px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">Email</label>
                            <input
                                type="email"
                                value={editForm.email}
                                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                required
                                className="w-full border rounded-md px-3 py-2 text-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full text-sm px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
                        >
                            Submit Profile Update
                        </button>
                    </form>
                ) : mode === 'change-password' ? (
                    // Change Password Form
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                        <div>
                            <label className="text-sm text-gray-600">Old Password</label>
                            <input
                                type="password"
                                value={passwordForm.oldPassword}
                                onChange={(e) =>
                                    setPasswordForm({ ...passwordForm, oldPassword: e.target.value })
                                }
                                required
                                className="w-full border rounded-md px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">New Password</label>
                            <input
                                type="password"
                                value={passwordForm.newPassword}
                                onChange={(e) =>
                                    setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                                }
                                required
                                className="w-full border rounded-md px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">Confirm New Password</label>
                            <input
                                type="password"
                                value={passwordForm.confirmNewPassword}
                                onChange={(e) =>
                                    setPasswordForm({ ...passwordForm, confirmNewPassword: e.target.value })
                                }
                                required
                                className="w-full border rounded-md px-3 py-2 text-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full text-sm px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700"
                        >
                            Submit Password Change
                        </button>
                    </form>
                ) : (
                    // Read-only Profile Info
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm text-gray-600">Name</label>
                            <input
                                type="text"
                                value={profile.name}
                                readOnly
                                className="w-full border bg-gray-100 rounded-md px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">Email</label>
                            <input
                                type="email"
                                value={profile.email}
                                readOnly
                                className="w-full border bg-gray-100 rounded-md px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">Enrollment No.</label>
                            <input
                                type="text"
                                value={profile.enrollment}
                                readOnly
                                className="w-full border bg-gray-100 rounded-md px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">Batch Name</label>
                            <input
                                type="text"
                                value={profile.batch}
                                readOnly
                                className="w-full border bg-gray-100 rounded-md px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">Current Semester</label>
                            <input
                                type="text"
                                value={profile.semester}
                                readOnly
                                className="w-full border bg-gray-100 rounded-md px-3 py-2 text-sm mb-4"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => setMode(mode === 'edit-profile' ? '' : 'edit-profile')}
                                className={`text-sm px-4 py-2 rounded-md shadow ${mode === 'edit-profile'
                                        ? 'bg-blue-700 text-white'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                            >
                                Update Profile
                            </button>
                            <button
                                onClick={() => setMode(mode === 'change-password' ? '' : 'change-password')}
                                className={`text-sm px-4 py-2 rounded-md shadow ${mode === 'change-password'
                                        ? 'bg-green-700 text-white'
                                        : 'bg-green-600 text-white hover:bg-green-700'
                                    }`}
                            >
                                Change Password
                            </button>
                        </div>
                    </div>

                )}
            </div>
        </div>
        <StudentFooter/>
        </>
    );
};

export default UpdateProfile;
