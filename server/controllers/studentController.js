import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import studentModel from "../models/studentModel.js";

const registerStudent = async (req, res) => {
    try {
        const { name, email, enrollment, password } = req.body;

        // Check missing details
        if (!name || !email || !enrollment || !password) {
            return res.json({ success: false, message: 'Missing Details' });
        }

        // Check if email already exists
        const existingEmail = await studentModel.findOne({ email });
        if (existingEmail) {
            return res.json({ success: false, message: 'Email already registered' });
        }

        // Check if enrollment already exists
        const existingEnrollment = await studentModel.findOne({ enrollment });
        if (existingEnrollment) {
            return res.json({ success: false, message: 'Enrollment already registered' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Static batch & sem values
        const batch = "Batch A"; 
        const sem = "1"; 

        // Create new student
        const newStudent = new studentModel({
            name,
            email,
            enrollment,
            password: hashedPassword,
            batch,
            sem
        });

        const student = await newStudent.save();

        // Generate JWT token
        const token = jwt.sign(
            { id: student._id, role: "student" },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            success: true,
            token,
            user: { 
                name: student.name, 
                role: "student",
                batch: student.batch,
                sem: student.sem
            }
        });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};


export {registerStudent}