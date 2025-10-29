import mongoose from "mongoose";

const batchSchema = new mongoose.Schema({
    batchName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    semester: {
        type: Number,
        required: true,
    },
    enrollmentNumbers: {
        type: [String],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const batchModel = mongoose.models.batches || mongoose.model("batchs", batchSchema)

export default batchModel