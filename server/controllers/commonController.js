
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import studentModel from "../models/studentModel.js";
import professorModel from "../models/professorModel.js";
import adminModel from "../models/adminModel.js";
import transporter from "../config/mailConfig.js";

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: "Missing email or password" });
        }

        let user = null;
        let role = "";
        
        // Check Student
        user = await studentModel.findOne({ email });
        if (user) role = "student";

        // If not found, check Professor
        if (!user) {
            user = await professorModel.findOne({ email });
            if (user) role = "professor";
        }

        // If not found, check Admin (optional)
        if (!user) {
            user = await adminModel.findOne({ email });
            if (user) role = "admin";
        }

        // If user not found
        if (!user) {
            return res.json({ success: false, message: "Invalid email or password" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid email or password" });
        }

        // Generate token
        const token = jwt.sign(
            { id: user._id, role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Prepare response data
        let userData = {
            name: user.name,
            role
        };

        if (role === "student" || role === "professor") {
            userData.batch = user.batch;
            userData.sem = user.sem;
        }

        res.json({
            success: true,
            token,
            user: userData
        });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

const forgotPassword = async(req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.json({ success: false, message: 'Email is required' });
        }

        // Check if user exists in student or professor collection
        let user = await studentModel.findOne({ email });
        let role = "student";
        if (!user) {
            user = await professorModel.findOne({ email });
            role = "professor";
        }

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        // Generate a new password
        const newPassword = Math.random().toString(36).slice(-8); // 8-char random password

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update user password
        user.password = hashedPassword;
        await user.save();

        const mailOptions = {
            from: `"MCAclg" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Your New Password',
            text: `Hello ${user.name},\n\nYour new password is: ${newPassword}\n\nPlease change it after logging in.`,
        };

        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: 'New password sent to your email' });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

export {loginUser, forgotPassword}