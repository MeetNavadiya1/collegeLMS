import batchModel from "../models/batchModel.js";
import studentModel from "../models/studentModel.js";
import professorModel from "../models/professorModel.js"
import adminModel from "../models/adminModel.js";
import bcrypt from "bcrypt";
import path from "path";
import fs from "fs";
import announcementModel from "../models/announcementModel.js";

export const createBatch = async (req, res) => {
  try {
    const { batchName, semester, enrollmentNumbers } = req.body;

    // Validate required fields
    if (!batchName || !semester || !enrollmentNumbers || enrollmentNumbers.length === 0) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check for duplicate batch
    const existingBatch = await batchModel.findOne({ batchName });
    if (existingBatch) {
      return res.status(409).json({ success: false, message: "Batch with this name already exists" });
    }

    // Create new batch
    const newBatch = await batchModel.create({
      batchName,
      semester,
      enrollmentNumbers
    });

    res.status(201).json({
      success: true,
      message: `${batchName} created successfully`,
      batch: newBatch
    });

  } catch (error) {
    console.error("Error creating batch:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating batch",
      error: error.message
    });
  }
};

export const getAllBatches = async (req, res) => {
  try {
    const batches = await batchModel.find().sort({ createdAt: -1 }); // newest first

    res.status(200).json({
      success: true,
      total: batches.length,
      batches,
    });
  } catch (error) {
    console.error("Error fetching batches:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch batches",
      error: error.message,
    });
  }
};


export const getBatchDetails = async (req, res) => {
  try {
    const { batchId } = req.params;

    // Find batch by ID
    const batch = await batchModel.findById(batchId);
    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    // Get all enrollment numbers from batch
    const enrollmentNumbers = batch.enrollmentNumbers;

    // Find all student accounts linked to this batch
    const students = await studentModel.find({ batch: batch.batchName });

    // Separate students by status
    const activeStudents = students.filter((s) => s.active === true);
    const deletedStudents = students.filter((s) => s.active === false);

    // Enrollment numbers that already have *active* accounts
    const activeEnrollmentNumbers = activeStudents.map((s) => s.enrollment);

    //  Students whose accounts are *not created* yet
    const notCreated = enrollmentNumbers
      .filter((en) => !activeEnrollmentNumbers.includes(en))
      .map((en) => ({
        enrollment: en,
        name: "-",
        email: "-",
        sem: "-",
        batch: batch.batchName,
        active: "-",
      }));

    // Combine all active students + not created ones
    const allStudents = [
      ...activeStudents.map((s) => ({
        enrollment: s.enrollment,
        name: s.name,
        email: s.email,
        sem: s.sem,
        batch: s.batch,
        active: s.active,
      })),
      ...notCreated,
    ];

    // Send structured response
    res.status(200).json({
      batchName: batch.batchName,
      semester: batch.semester,
      allStudents,        // only active + not created
      createdAccounts: activeStudents,
      notCreated,
      deletedAccounts: deletedStudents,
    });
  } catch (error) {
    console.error("Error fetching batch details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const addEnrollmentToBatch = async (req, res) => {
  try {
    const { batchId } = req.params;
    const { enrollment } = req.body;

    if (!enrollment) {
      return res.status(400).json({ message: "Enrollment number is required" });
    }

    const batch = await batchModel.findById(batchId);
    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    // Check for duplicate enrollment
    if (batch.enrollmentNumbers.includes(enrollment)) {
      return res
        .status(400)
        .json({ message: "Enrollment number already exists in this batch" });
    }

    batch.enrollmentNumbers.push(enrollment);
    await batch.save();

    res.status(200).json({
      message: "Enrollment added successfully",
      enrollmentNumbers: batch.enrollmentNumbers,
    });
  } catch (error) {
    console.error("Error adding enrollment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const updateBatchSemester = async (req, res) => {
  try {
    const { batchId } = req.params;
    const { semester } = req.body;

    if (!semester) {
      return res.status(400).json({ message: "Semester value is required" });
    }

    // 1️⃣ Find the batch by ID
    const batch = await batchModel.findById(batchId);
    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    // 2️⃣ Update batch semester
    batch.semester = semester;
    await batch.save();

    // 3️⃣ Update semester for all students in this batch
    await studentModel.updateMany(
      { batch: batch.batchName },
      { $set: { sem: semester } }
    );

    res.status(200).json({
      message: `Semester updated to ${semester} successfully for batch "${batch.batchName}" and all its students`,
      updatedBatch: batch,
    });
  } catch (error) {
    console.error("Error updating semester:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const deleteEnrollmentFromBatch = async (req, res) => {
  try {
    const { batchId } = req.params;
    const { enrollment } = req.body;

    if (!enrollment) {
      return res.status(400).json({ message: "Enrollment number is required" });
    }

    // Find the batch
    const batch = await batchModel.findById(batchId);
    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    // Check if enrollment exists in batch
    if (!batch.enrollmentNumbers.includes(enrollment)) {
      return res.status(404).json({ message: "Enrollment number not found in batch" });
    }

    // 1️⃣ Remove enrollment from batch
    batch.enrollmentNumbers = batch.enrollmentNumbers.filter((en) => en !== enrollment);
    await batch.save();

    // 2️⃣ Set student as inactive if exists
    const student = await studentModel.findOne({ enrollment });
    if (student) {
      student.active = false;
      await student.save();
    }

    res.status(200).json({
      message: `Enrollment ${enrollment} removed successfully and student marked inactive.`,
      updatedBatch: batch,
    });
  } catch (error) {
    console.error("Error deleting enrollment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const deleteBatchAndStudents = async (req, res) => {
  try {
    const { batchId } = req.params;

    // Find batch
    const batch = await batchModel.findById(batchId);
    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    // Delete all students linked to this batch
    await studentModel.deleteMany({ batch: batch.batchName });

    // Delete batch itself
    await batchModel.findByIdAndDelete(batchId);

    res.status(200).json({ message: "Batch and all related students deleted successfully" });
  } catch (error) {
    console.error("Error deleting batch:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const createProfessor = async (req, res) => {
  try {
    const { name, subject, batch, semester, email, password } = req.body;
    // save full path starting with /public/uploads/...
    const image = req.file ? `/uploads/professors/${req.file.filename}` : "";

    if (!name || !subject || !batch || !semester || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await professorModel.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newProfessor = await professorModel.create({
      name,
      subject,
      batch,
      semester,
      email,
      password,
      image,
    });

    res.status(201).json({
      message: "Professor created successfully",
      professor: newProfessor,
    });
  } catch (error) {
    console.error("Error creating professor:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getAllProfessors = async (req, res) => {
  try {
    // fetch all batches first so we can attach semester info where needed
    const batches = await batchModel.find().select("batchName semester -_id").sort({ batchName: 1 });
    const batchDetails = batches.map((b) => ({ batchName: b.batchName, semester: b.semester }));
    const batchMap = {};
    batches.forEach((b) => {
      batchMap[b.batchName] = b.semester;
    });
    const batchNames = batches.map((b) => b.batchName); // backward compatible array

    const professors = await professorModel.find();

    // Build request base url
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    // Images stored as '/public/uploads/professors/...' — just prefix with baseUrl
    const professorsWithImages = professors.map((p) => {
      const obj = p.toObject();

      // ensure semester is present; fallback to batch map
      if (!obj.semester || obj.semester === "") {
        obj.semester = batchMap[obj.batch] || "";
      }

      if (obj.image && !obj.image.startsWith("http")) {
        obj.image = `${baseUrl}${obj.image}`;
      }

      return obj;
    });

    res.status(200).json({
      success: true,
      professors: professorsWithImages,
      batchNames,
      batchDetails,
    });
  } catch (error) {
    console.error("Error fetching professors:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const deleteProfessor = async (req, res) => {
  try {
    const { id } = req.params;

    const prof = await professorModel.findById(id);
    if (!prof) return res.status(404).json({ message: "Professor not found" });

    // delete image if exists
    if (prof.image) {
      let imgPath = prof.image;

      // if it's a full URL, extract pathname
      try {
        if (/^https?:\/\//i.test(imgPath)) {
          const parsed = new URL(imgPath);
          imgPath = parsed.pathname;
        }
      } catch (e) {
        // ignore parsing errors and continue with original imgPath
      }

      // Normalize to relative path under public/
      if (imgPath.startsWith("/public/")) {
        imgPath = imgPath.replace(/^\/public\//, ""); // remove leading /public/
      } else if (imgPath.startsWith("/")) {
        imgPath = imgPath.replace(/^\//, ""); // remove leading slash
      }

      const imagePath = path.join(process.cwd(), "public", imgPath);
      if (fs.existsSync(imagePath)) {
        try {
          fs.unlinkSync(imagePath);
        } catch (err) {
          console.error("Failed to delete professor image file:", err);
        }
      }
    }

    await prof.deleteOne();

    res.status(200).json({ message: "Professor deleted successfully" });
  } catch (error) {
    console.error("Error deleting professor:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfessor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, subject } = req.body;

    // Find existing professor
    const professor = await professorModel.findById(id);
    if (!professor) {
      return res.status(404).json({ message: "Professor not found" });
    }

    // Handle new image upload
    let imagePath = professor.image;
    if (req.file) {
      // Delete old image if exists
      if (professor.image) {
        const oldImagePath = path.join(process.cwd(), "public", professor.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Save new image path
      imagePath = `/uploads/professors/${req.file.filename}`;
    }

    // Update professor info
    professor.name = name || professor.name;
    professor.email = email || professor.email;
    professor.subject = subject || professor.subject;
    professor.image = imagePath;

    const updatedProfessor = await professor.save();
    res.status(200).json({
      success: true,
      message: "Professor updated successfully",
      data: updatedProfessor,
    });
  } catch (error) {
    console.error("Error updating professor:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const createAnnouncement = async (req, res) => {
  try {
    const { title, description, batch, createdBy } = req.body;
    const image = req.file ? `/uploads/announcements/${req.file.filename}` : "";

    if (!title || !description || !batch || !createdBy) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newAnnouncement = new announcementModel({
      title,
      description,
      image,
      batch,
      createdBy,
    });

    await newAnnouncement.save();
    res.status(201).json({
      message: "Announcement created successfully",
      announcement: newAnnouncement,
    });
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 🟡 Get All Announcements
export const getAllAnnouncements = async (req, res) => {
  try {
    // Fetch all announcements (sorted by latest first)
    const announcements = await announcementModel.find().sort({ createdAt: -1 });

    // Fetch all batches (only names to keep response light)
    const batches = await batchModel.find({}, "batchName");

    // Send both in one response
    res.status(200).json({
      success: true,
      announcements,
      batches: batches.map(batch => batch.batchName),
    });
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 🔴 Delete Announcement
export const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await announcementModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (error) {
    console.error("Error deleting announcement:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getDashboardStats = async (req, res) => {
  try {
    const totalBatches = await batchModel.countDocuments();
    const totalProfessors = await professorModel.countDocuments();
    const totalStudents = await studentModel.countDocuments({ status: "active" });
    const totalAnnouncements = await announcementModel.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        totalBatches,
        totalProfessors,
        totalStudents,
        totalAnnouncements,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


export const changeAdminPassword = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    // Find admin by email
    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.json({ success: false, message: "Admin not found" });
    }

    // Compare current password
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Current password is incorrect" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    admin.password = hashedPassword;
    await admin.save();

    res.status(200).json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};