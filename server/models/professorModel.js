import mongoose from "mongoose";

const professorSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    subject: {type: String, required: true},
    batch: {type: String, required: true},
    sem: {type: String, required: true},
})

const professorModel = mongoose.models.professor || mongoose.model("professor", professorSchema)

export default professorModel