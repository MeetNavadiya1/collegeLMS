import express from 'express'
import { addEnrollmentToBatch, changeAdminPassword, createAnnouncement, createBatch, createProfessor, deleteAnnouncement, deleteBatchAndStudents, deleteEnrollmentFromBatch, deleteProfessor, getAllAnnouncements, getAllBatches, getAllProfessors, getBatchDetails, getDashboardStats, updateBatchSemester, updateProfessor } from '../controllers/adminControllers.js'
import multer from "multer"

const adminRouter = express.Router()

const professorStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/professors');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const uploadProfessor = multer({ storage: professorStorage });

// ===== Multer Storage Setup for Announcements =====
const announcementStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/announcements');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const uploadAnnouncement = multer({ storage: announcementStorage });

adminRouter.post('/createBatch', createBatch)
adminRouter.get('/viewAllBatch', getAllBatches)

// for student batch pages
adminRouter.get("/batch/:batchId", getBatchDetails)
adminRouter.post('/batch/:batchId/enrollment', addEnrollmentToBatch)
adminRouter.put('/batch/:batchId/semester', updateBatchSemester)
adminRouter.put("/batch/:batchId/delete-enrollment", deleteEnrollmentFromBatch);
adminRouter.delete("/batch/:batchId", deleteBatchAndStudents)

//  for professor pages
adminRouter.post("/professor/add", uploadProfessor.single("image"), createProfessor)
adminRouter.get("/professor/all", getAllProfessors)
adminRouter.delete("/professor/:id", deleteProfessor)
adminRouter.put("/professor/:id", uploadAnnouncement.single("image"), updateProfessor);

// for announcement pages
adminRouter.post('/announcement/create', uploadAnnouncement.single('image'), createAnnouncement);
adminRouter.get('/announcement/all', getAllAnnouncements);
adminRouter.delete('/announcement/:id', deleteAnnouncement);

adminRouter.get('/dashboard', getDashboardStats);

adminRouter.put("/change-password", changeAdminPassword);

export default adminRouter;