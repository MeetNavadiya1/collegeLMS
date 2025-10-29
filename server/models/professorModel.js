import mongoose from "mongoose";

const professorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    batch: {
        type: String,
        required: true,
    },
    semester: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String, // URL to the uploaded image (e.g., /uploads/professors/xyz.jpg)
        default: "",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const professorModel = mongoose.models.professor || mongoose.model("professor", professorSchema)

export default professorModel