import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// admin pages
import Dashboard from './Admin/Pages/Dashboard'
import StudentBatches from './Admin/Pages/StudentBatches'
import CreateBatch from './Admin/Pages/CreateBatch'
import BatchDetail from './Admin/Pages/BatchDetail'
import ProfessorsPage from './Admin/Pages/Professor'
import AnnouncementPage from './Admin/Pages/Announcement'
import ChangePasswordPage from './Admin/Pages/ChangePassword'
import Logout from './Admin/Pages/Logout';

// common pages
import LoginPage from './CommonPages/Login'
import ForgotPasswordPage from './CommonPages/ForgotPassword'
import StudentRegistration from './CommonPages/Registration'

// professor pages
import HomePage from './Professor/pages/Home';
import TeacherReadingMaterial from './Professor/pages/Materials';
import MaterialDetails from './Professor/pages/MaterialDetail';
import AssignmentPage from './Professor/pages/Assignments';
import ProjectPage from './Professor/pages/Projects';
import AssignmentSubmissionPage from './Professor/pages/AssignmentSubmission';
import ProjectSubmissions from './Professor/pages/ProjectSubmission';
import ProfAnnouncementPage from './Professor/pages/ProfessorAnnouncement';
import ProfChangePasswordPage from './Professor/pages/ChangePassword';

// student routes
import StudentHome from './Student/pages/HomePage';
import SubjectDetails from './Student/pages/SubjectDetails';
import ReadingMaterials from './Student/pages/ReadingMatirials';
import ViewReadingMaterial from './Student/pages/ViewReadingMaterials';
import Assignments from './Student/pages/Assignments';
import ViewAssignmentDetails from './Student/pages/ViewAssignmant';
import ViewProjectDetails from './Student/pages/ViewProject';
import Projects from './Student/pages/Projects';
import Announcements from './Student/pages/Announcements';
import UpdateProfile from './Student/pages/UpdateProfile';
import StudentLogout from './Student/pages/Logout';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <div>
      <ToastContainer position='top-center' />
    
      <Routes>

            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<StudentRegistration />} />
            <Route path="/forgot_password" element={<ForgotPasswordPage />} />

            {/* admin routes */}
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/batches" element={<StudentBatches />} />
            <Route path="/admin/batches/create" element={<CreateBatch />} />
            <Route path="/admin/batches/:batchId" element={<BatchDetail />} />
            <Route path="/admin/professors" element={<ProfessorsPage />} />
            <Route path="/admin/announcements" element={<AnnouncementPage />} />
            <Route path="/admin/change-password" element={<ChangePasswordPage />} />
            <Route path="/admin/logout" element={<Logout />} />
          
            {/* professor routes */}
            <Route path="/professor" element={<HomePage />} />
            <Route path="/professor/materials" element={<TeacherReadingMaterial />} />
            <Route path="/professor/materials/details/:id" element={<MaterialDetails />} />
            <Route path="/professor/assignments" element={<AssignmentPage />} />
            <Route path="/professor/assignments/submissions/:id" element={<AssignmentSubmissionPage />} />
            <Route path="/professor/projects" element={<ProjectPage />} />
            <Route path="/professor/projects/submissions/:id" element={<ProjectSubmissions />} />
            <Route path="/professor/announcements" element={<ProfAnnouncementPage />} />
            <Route path="/professor/changepassword" element={<ProfChangePasswordPage />} />
            <Route path="/professor/logout" element={<Logout />} />

            {/* professor routes */}
            <Route path='/student' element={<StudentHome/>} />
            <Route path='/student/subjectdetails' element={<SubjectDetails/>} />
            <Route path='/student/subjectdetails/readingmaterials' element={<ReadingMaterials/>} />
            <Route path='/student/subjectdetails/readingmaterials/viewreadingmaterials/:id' element={<ViewReadingMaterial/>} />
            <Route path='/student/subjectdetails/assignments' element={<Assignments/>} />
            <Route path='/student/subjectdetails/assignments/viewassignmentdetails/:id' element={<ViewAssignmentDetails/>} />
            <Route path='/student/subjectdetails/projects' element={<Projects/>} />
            <Route path='/student/subjectdetails/projects/projectdetails/:id' element={<ViewProjectDetails/>} />
            <Route path='/student/announcements' element={<Announcements/>} />
            <Route path='/student/updateprofile' element={<UpdateProfile/>} />
            <Route path='/student/logout' element={<StudentLogout/>} />

        {/* Fallback - Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
   
    </div>
  );
}

export default App
